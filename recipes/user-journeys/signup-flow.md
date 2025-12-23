# Signup Flow

> Registration → Email Verification → Onboarding

## About This Recipe

The signup flow is critical for conversion. This recipe explores the complete journey from initial registration through onboarding.

---

## Interactive Journey

```jsx live


const stages = [
  {
    id: 'register',
    title: 'Create Account',
    icon: '📝',
    fields: ['Email', 'Password'],
  },
  {
    id: 'verify',
    title: 'Verify Email',
    icon: '📧',
    message: 'Check your inbox for a verification link',
  },
  {
    id: 'profile',
    title: 'Complete Profile',
    icon: '👤',
    fields: ['Name', 'Company', 'Role'],
  },
  {
    id: 'welcome',
    title: 'Welcome!',
    icon: '🎉',
    message: 'Your account is ready',
  },
];

export default function SignupFlow() {
  const [stage, setStage] = React.useState(0);
  
  const current = stages[stage];
  const isComplete = stage >= stages.length;
  
  return (
    <div className="max-w-md mx-auto">
      {/* Progress */}
      <div className="flex mb-8">
        {stages.map((s, i) => (
          <div key={s.id} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                i <= stage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i < stage ? '✓' : s.icon}
            </div>
            {i < stages.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 ${
                  i < stage ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Stage Content */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        {!isComplete ? (
          <>
            <div className="text-4xl text-center mb-4">{current.icon}</div>
            <h2 className="text-xl font-bold text-center mb-4">{current.title}</h2>
            
            {current.fields ? (
              <div className="space-y-3 mb-6">
                {current.fields.map((field) => (
                  <input
                    key={field}
                    placeholder={field}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center mb-6">{current.message}</p>
            )}
            
            <button
              onClick={() => setStage(stage + 1)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Continue
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-xl font-bold mb-2">All Set!</h2>
            <p className="text-gray-600 mb-4">You're ready to get started.</p>
            <button
              onClick={() => setStage(0)}
              className="px-6 py-2 text-blue-600 hover:underline"
            >
              Restart Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
