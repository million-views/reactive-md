# Settings Pages Wireframes

> Forms, toggles, and preference management patterns.

## About This Recipe

Settings pages often have complex state management. These wireframes explore toggle patterns, form layouts, and save behaviors.

---

## Settings Panel

```jsx
import { useState } from 'react';

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    twoFactor: false,
  });
  
  const [saved, setSaved] = useState(false);
  
  const toggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
    setSaved(false);
  };
  
  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  
  const settingsList = [
    { key: 'notifications', label: 'Push Notifications', desc: 'Receive alerts about important updates' },
    { key: 'darkMode', label: 'Dark Mode', desc: 'Use dark theme across the app' },
    { key: 'autoSave', label: 'Auto-save', desc: 'Automatically save your work' },
    { key: 'twoFactor', label: 'Two-Factor Auth', desc: 'Extra security for your account' },
  ];
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Settings</h2>
      </div>
      
      <div className="divide-y">
        {settingsList.map((item) => (
          <div key={item.key} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{item.label}</div>
              <div className="text-sm text-gray-500">{item.desc}</div>
            </div>
            <button
              onClick={() => toggle(item.key)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings[item.key] ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50">
        <button
          onClick={save}
          className={`w-full py-2 rounded-lg font-medium transition-colors ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
```

---

*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
