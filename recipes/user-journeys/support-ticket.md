# Support Ticket

> Issue → Resolution

## About This Recipe

A well-designed support ticket flow reduces frustration and helps users get help quickly. This recipe explores the journey from problem to resolution.

---

## Interactive Support Flow

```jsx live


const categories = [
  { id: 'billing', label: 'Billing Issue', icon: '💳' },
  { id: 'technical', label: 'Technical Problem', icon: '🔧' },
  { id: 'account', label: 'Account Help', icon: '👤' },
  { id: 'other', label: 'Other', icon: '❓' },
];

export default function SupportTicketFlow() {
  const [step, setStep] = React.useState('category');
  const [category, setCategory] = React.useState(null);
  const [priority, setPriority] = React.useState(null);
  
  if (step === 'submitted') {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-green-600">Ticket Submitted!</h2>
        <p className="text-gray-600 mt-2">Ticket #38291 - We'll respond within 24 hours</p>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
          <div className="text-sm text-gray-500">Category</div>
          <div className="font-medium">{category.icon} {category.label}</div>
        </div>
        <button
          onClick={() => { setStep('category'); setCategory(null); setPriority(null); }}
          className="mt-6 text-blue-600 hover:underline"
        >
          Submit Another Ticket
        </button>
      </div>
    );
  }
  
  if (step === 'details') {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <button onClick={() => setStep('category')} className="text-blue-600 hover:underline mb-4">
          ← Back
        </button>
        <h2 className="text-xl font-bold mb-4">Describe Your Issue</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              placeholder="Brief summary of your issue"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows={4}
              placeholder="Please describe your issue in detail..."
              className="w-full px-4 py-2 border rounded-lg resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <div className="flex gap-2">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-lg border transition-colors ${
                    priority === p
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setStep('submitted')}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Submit Ticket
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">How can we help?</h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setCategory(cat); setStep('details'); }}
            className="p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="text-2xl mb-2">{cat.icon}</div>
            <div className="font-medium">{cat.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
