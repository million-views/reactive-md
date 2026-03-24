# Reactive MD — Deploy Guide

`reactiveMd.publish` builds a self-contained static site from your reactive-md project
and deploys it directly to your own server. No CDN, no build server, no extra tooling
— just rsync over SSH.

Static websites (hand-crafted HTML/CSS/JS) deploy the same way, without a build step.

---

## Commands

- **`Reactive MD: Publish`** — builds (reactive-md only) and deploys via rsync. A setup
  wizard runs on first use; every subsequent publish is one-click re-publish.
- **`Reactive MD: Preview Published Output`** — builds locally and opens a local preview
  server. Use this to verify output before deploying.

Both commands are available from:
- The editor title bar when a `.md`, `.html`, `.css`, or `reactive-md.publish.json` file
  is open.
- Right-click on any project folder in the Explorer.

---

## Workspace Config (`reactive-md.publish.json`)

All deploy configuration lives in a single `reactive-md.publish.json` at your VS Code
workspace root (or nearest `.git` root). It is shared across every project in that
folder tree and is automatically added to `.gitignore` on first creation to prevent
accidental credential leaks.

The file has two sections: **targets** (SSH credentials + server) and **projects**
(what to deploy and where).

```jsonc
{
  "version": 1,
  "targets": {
    "production": {
      "type": "ssh",
      "host": "aeon.local",         // SSH connection address
      "publicUrl": "https://m5nv.com", // optional — shown in "Open in Browser"
      "user": "sysadm",
      "keyPath": "~/.ssh/id-sysadm",
      "remoteBaseDir": "/var/www/sites" // parent dir; each project gets a named subfolder
    }
  },
  "projects": [
    {
      "name": "m5nv.com",
      "type": "static",
      "source": "public",           // local folder to deploy (relative to this file)
      "target": "production"
      // deploys to: /var/www/sites/m5nv.com/
    },
    {
      "name": "Checkout Flow",
      "type": "reactive-md",
      "source": "pocs/checkout",
      "target": "production",
      "site": "m5nv.com",           // nests under the static site's folder
      "entry": "main.md",
      "protected": false
      // deploys to: /var/www/sites/m5nv.com/checkout-flow/
    }
  ]
}
```

The wizard creates and maintains this file for you. See
`docs/reference/publish-config.md` for the full schema reference.

---

## Deploy Destinations

Every project deploys into a named subfolder under `remoteBaseDir`:

| Project type | Destination |
| :--- | :--- |
| `static` | `{remoteBaseDir}/{name}/` — dots preserved (`m5nv.com` → `m5nv.com/`) |
| `reactive-md`, public | `{remoteBaseDir}/{slug}/` |
| `reactive-md`, protected | `{remoteBaseDir}/{token}/{slug}/` |
| `reactive-md` with `site` | `{remoteBaseDir}/{site-folder}/{slug}/` |

`slug` is derived from `name`: lowercase, spaces/underscores/dots → hyphens.

All deploys use `rsync --delete`. Because each project has its own isolated subfolder,
`--delete` only removes stale files within that project's directory — sibling projects
are never affected.

---

## Project Types

### Reactive MD

A markdown document with interactive React islands. The extension runs a full build
pipeline: fence extraction → island bundling → HTML generation → CSS → asset copy.

The `entry` field names the `.md` file to build. If absent it is auto-detected:
`main.md` → `index.md` → the sole `.md` file in the folder → error if multiple exist.

The published output is a fully static site with no server-side logic:
- Prose renders as standard HTML.
- `jsx live` fences become interactive React islands loaded lazily as they scroll into view.
- Device emulation (e.g. `device=mobile`) is honoured — the viewport frame matches what
  your client sees in Interactive Preview.
- `css live` fences and Tailwind utilities apply document-wide.
- Referenced local assets (images, JSON data files) are copied automatically.

Build output is staged to `{source}/.publish/` before upload (gitignore this folder).

### Static Website

A hand-crafted HTML/CSS/JS folder. The source folder is deployed as-is — no build step.
Use this for your main website when you also want to publish reactive-md POCs as
sub-sections of it (see **Nested topology** below).

---

## Access Control

**Public** — the POC is accessible at `https://yourserver.com/{slug}/`. Anyone with the
link can view it.

**Protected** — the POC is deployed to `https://yourserver.com/{token}/{slug}/` where
`{token}` is an 8-character unguessable path segment. A passphrase gate prompts your
client before revealing the content. The gate runs entirely in the browser; the token
path blocks casual URL guessing.

> The protection model is appropriate for sharing early-stage work with external
> stakeholders. It is not a substitute for authentication for sensitive data.

Protection is only available for `reactive-md` projects (it requires injecting a gate
script into the generated HTML).

---

## Nested Topology: POCs Inside a Static Site

Use the `site` field to deploy a reactive-md POC as a subfolder of a static site —
both projects can share the same target:

```jsonc
"projects": [
  { "name": "m5nv.com",      "type": "static",     "source": "public",       "target": "aeon" },
  { "name": "Checkout Flow", "type": "reactive-md", "source": "pocs/checkout","target": "aeon",
    "site": "m5nv.com", "entry": "main.md" }
]
```

```
remoteBaseDir /var/www/sites
  └── m5nv.com/             ← static site (m5nv.com/)
      ├── index.html
      └── checkout-flow/    ← reactive-md POC (m5nv.com/checkout-flow/)
```

No nginx changes needed — `try_files $uri $uri/ $uri/index.html =404` serves any
subfolder with an `index.html` automatically.

---

## VPS Setup Guide

The publish command copies files over SSH using `rsync` (or `scp` as a fallback).
Your server needs an SSH-accessible deploy user and a static file server pointed at
`remoteBaseDir`. This is a one-time setup.

### 1. Create a Deploy User

```sh
sudo useradd --system --shell /usr/sbin/nologin --create-home deploy
```

### 2. Add Your SSH Public Key

On your local machine:

```sh
cat ~/.ssh/id_rsa.pub   # or id_ed25519.pub — whichever key you set in keyPath
```

On the server:

```sh
sudo mkdir -p /home/deploy/.ssh
sudo nano /home/deploy/.ssh/authorized_keys   # paste the public key here
sudo chmod 700 /home/deploy/.ssh
sudo chmod 600 /home/deploy/.ssh/authorized_keys
sudo chown -R deploy:deploy /home/deploy/.ssh
```

Verify the connection before proceeding:

```sh
ssh -i ~/.ssh/id_rsa deploy@yourserver.com echo "ok"
```

### 3. Create the Base Directory

```sh
sudo mkdir -p /var/www/sites
sudo chown deploy:deploy /var/www/sites
sudo chmod 755 /var/www/sites
```

### 4. Configure nginx

nginx 1.29+ includes a native ACME client (`ngx_http_acme_module`) that provisions
and renews Let's Encrypt certificates automatically — no Certbot required.

```nginx
http {
    acme_client default https://acme-v02.api.letsencrypt.org/directory;

    server {
        listen 80;
        listen 443 ssl;
        server_name yourserver.com;

        acme                 default;
        ssl_certificate      $acme_cert_default;
        ssl_certificate_key  $acme_cert_key_default;

        root  /var/www/sites;
        index index.html;

        location / {
            try_files $uri $uri/ $uri/index.html =404;
        }
    }
}
```

On first start nginx obtains the certificate automatically; subsequent starts renew it
if needed. No cron jobs required.

```sh
sudo nginx -t && sudo systemctl reload nginx
```

> **That's all the nginx config you need.** Reactive MD uses path-based routing for
> both public (`/{slug}/`) and protected (`/{token}/{slug}/`) projects. The passphrase
> gate runs entirely in the browser — no server-side logic required.

### 5. Verify rsync

```sh
rsync --version   # run on the server
```

rsync ships by default on most Linux distributions. If missing:
`sudo apt install rsync` (Debian/Ubuntu) or `sudo dnf install rsync` (Fedora/RHEL).
On Windows clients, `scp` is used as a fallback automatically.

---

## Multiple Targets (Staging + Production)

Add a second target entry to deploy the same project to different servers:

```jsonc
"targets": {
  "production": { "host": "aeon.local", "publicUrl": "https://m5nv.com", … },
  "staging":    { "host": "staging.internal", … }
},
"projects": [
  { "name": "Auth Demo", "type": "reactive-md", "target": "staging", … }
]
```

The wizard prompts for which target to use when more than one exists. Each project
references exactly one target by name.
