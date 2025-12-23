# Onboarding Flow Wireframes

> Step-by-step wizard patterns for user onboarding.

## About This Recipe

Great onboarding flows guide users through complex setup processes while keeping them engaged. These wireframes explore common patterns.

---

## Multi-Step Wizard

```jsx live


const steps = [
  { id: 1, title: 'Welcome', description: 'Let\'s get you started' },
  { id: 2, title: 'Profile', description: 'Tell us about yourself' },
  { id: 3, title: 'Preferences', description: 'Customize your experience' },
  { id: 4, title: 'Complete', description: 'You\'re all set!' },
];

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = React.useState(1);
  
  const step = steps.find(s => s.id === currentStep);
  
  return (
    <div className="max-w-lg mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                s.id <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s.id < currentStep ? '✓' : s.id}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-12 h-1 mx-2 transition-colors ${
                  s.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Step Content */}
      <div className="bg-white rounded-xl p-8 shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
        <p className="text-gray-600 mb-6">{step.description}</p>
        
        {currentStep < steps.length ? (
          <div className="space-y-4">
            <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              Step {currentStep} content here
            </div>
            <div className="flex gap-3 justify-center">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl">🎉</div>
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Get Started
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
