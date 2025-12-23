# Checkout Flow

> Cart → Payment → Confirmation

## About This Recipe

E-commerce checkout is where conversions happen or abandon. This recipe explores the multi-step checkout journey with interactive examples.

---

## Interactive Checkout

```jsx live


const steps = [
  { id: 'cart', title: 'Cart', icon: '🛒' },
  { id: 'shipping', title: 'Shipping', icon: '📦' },
  { id: 'payment', title: 'Payment', icon: '💳' },
  { id: 'confirm', title: 'Confirm', icon: '✅' },
];

export default function CheckoutFlow() {
  const [step, setStep] = React.useState(0);
  
  const CartStep = () => (
    <div className="space-y-4">
      {['Product A - $29.99', 'Product B - $49.99'].map((item) => (
        <div key={item} className="flex justify-between p-3 bg-gray-50 rounded">
          <span>{item}</span>
          <button className="text-red-500 text-sm">Remove</button>
        </div>
      ))}
      <div className="pt-4 border-t flex justify-between font-bold">
        <span>Total</span>
        <span>$79.98</span>
      </div>
    </div>
  );
  
  const ShippingStep = () => (
    <div className="space-y-3">
      {['Standard (5-7 days) - Free', 'Express (2-3 days) - $9.99', 'Overnight - $24.99'].map((opt) => (
        <label key={opt} className="flex items-center gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
          <input type="radio" name="shipping" className="w-4 h-4" />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
  
  const PaymentStep = () => (
    <div className="space-y-3">
      <input placeholder="Card Number" className="w-full px-4 py-2 border rounded" />
      <div className="flex gap-3">
        <input placeholder="MM/YY" className="flex-1 px-4 py-2 border rounded" />
        <input placeholder="CVC" className="w-20 px-4 py-2 border rounded" />
      </div>
    </div>
  );
  
  const ConfirmStep = () => (
    <div className="text-center py-4">
      <div className="text-6xl mb-4">🎉</div>
      <h3 className="text-xl font-bold text-green-600">Order Confirmed!</h3>
      <p className="text-gray-600 mt-2">Order #12345 - Check your email</p>
    </div>
  );
  
  const renderStep = () => {
    switch (step) {
      case 0: return <CartStep />;
      case 1: return <ShippingStep />;
      case 2: return <PaymentStep />;
      case 3: return <ConfirmStep />;
      default: return null;
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      {/* Progress */}
      <div className="flex justify-between mb-6">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {s.icon}
            </div>
            <span className={`text-xs ${i <= step ? 'text-blue-600' : 'text-gray-400'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{steps[step].title}</h2>
        {renderStep()}
        
        {step < 3 && (
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {step === 2 ? 'Place Order' : 'Continue'}
            </button>
          </div>
        )}
        {step === 3 && (
          <button
            onClick={() => setStep(0)}
            className="w-full mt-4 py-2 text-blue-600 hover:underline"
          >
            Restart Demo
          </button>
        )}
      </div>
    </div>
  );
}
```

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
