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

Your server needs an SSH-accessible deploy user and nginx ≥ 1.29 serving files from
`remoteBaseDir`. This is a one-time setup. Every step below is prescriptive — follow
them in order.

### 1. Install nginx from the Official Mainline Repository

Debian's packaged nginx is too old for the built-in ACME module (Debian 12 ships 1.22).
Install from nginx's own mainline repo:

```sh
curl -fsSL https://nginx.org/keys/nginx_signing.key \
  | sudo gpg --dearmor -o /usr/share/keyrings/nginx-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
  https://nginx.org/packages/mainline/debian $(lsb_release -cs) nginx" \
  | sudo tee /etc/apt/sources.list.d/nginx.list

sudo apt update && sudo apt install nginx
```

Verify the version:

```sh
nginx -v   # must be 1.29.0 or later
```

### 2. Create a Locked-Down Deploy User

```sh
sudo useradd --system --shell /usr/sbin/nologin --create-home deploy
sudo passwd -l deploy   # disable password login
```

### 3. Generate a Dedicated Deploy Key

Run this on your **local machine** — not the server. Use a dedicated key separate
from your personal SSH key:

```sh
ssh-keygen -t ed25519 -f ~/.ssh/id-deploy -C "deploy" -N ""
```

The empty passphrase (`-N ""`) allows unattended deploys from VS Code.

Copy the public key to your clipboard:

```sh
cat ~/.ssh/id-deploy.pub
```

### 4. Authorize the Deploy Key on the Server

On the server, add the public key with the `restrict` keyword. `restrict` disables
PTY allocation, X11 forwarding, agent forwarding, and port forwarding — rsync works
fine, interactive shell access does not:

```sh
sudo mkdir -p /home/deploy/.ssh
sudo tee /home/deploy/.ssh/authorized_keys <<'EOF'
restrict ssh-ed25519 AAAA...paste-your-public-key-here... reactive-md deploy
EOF
sudo chmod 700 /home/deploy/.ssh
sudo chmod 600 /home/deploy/.ssh/authorized_keys
sudo chown -R deploy:deploy /home/deploy/.ssh
```

Verify the connection from your local machine:

```sh
ssh -i ~/.ssh/id-deploy deploy@yourserver.com echo "ok"
```

You should see `ok` with no shell prompt.

Set `keyPath` in your `reactive-md.publish.json` to match:

```jsonc
"keyPath": "~/.ssh/id-deploy"
```

### 5. Create the Web Root

```sh
sudo mkdir -p /var/www/sites
sudo chown deploy:deploy /var/www/sites
sudo chmod 755 /var/www/sites
```

### 6. Configure nginx

nginx 1.29 includes `ngx_http_acme_module` — a native Let's Encrypt client that
provisions and renews certificates automatically. No Certbot, no cron jobs.

Replace the contents of `/etc/nginx/nginx.conf`:

```nginx
events {}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile      on;
    server_tokens off;

    acme_client default https://acme-v02.api.letsencrypt.org/directory;

    # Redirect all HTTP traffic to HTTPS
    server {
        listen 80;
        server_name yourserver.com;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl;
        http2  on;
        server_name yourserver.com;

        acme                 default;
        ssl_certificate      $acme_cert_default;
        ssl_certificate_key  $acme_cert_key_default;

        ssl_protocols        TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers off;

        add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
        add_header X-Content-Type-Options    "nosniff"                                      always;
        add_header X-Frame-Options           "SAMEORIGIN"                                   always;
        add_header Referrer-Policy           "strict-origin-when-cross-origin"              always;

        root  /var/www/sites;
        index index.html;

        location / {
            try_files $uri $uri/ $uri/index.html =404;
        }
    }
}
```

Replace `yourserver.com` with your actual domain. On first start nginx obtains the
TLS certificate automatically via ACME; subsequent starts renew it if needed.

Test and apply:

```sh
sudo nginx -t && sudo systemctl enable --now nginx
```

> **That's all the nginx config you need.** Reactive MD uses path-based routing for
> both public (`/{slug}/`) and protected (`/{token}/{slug}/`) projects. The passphrase
> gate runs entirely in the browser — no server-side logic required.

### 7. Verify rsync

```sh
rsync --version   # run on the server
```

rsync ships by default on most Linux distributions. If it is missing:

**Debian / Ubuntu:** `sudo apt install rsync`

**Fedora / RHEL:** `sudo dnf install rsync`

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
