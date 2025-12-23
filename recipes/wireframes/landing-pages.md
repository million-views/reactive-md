# Landing Page Wireframes

Quick visual concepts for common landing page sections.

---

## Hero Section

```jsx live
export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 rounded-lg">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm mb-6">
          🎉 Now available for teams
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Build products faster with AI
        </h1>
        <p className="text-xl opacity-90 mb-8">
          The modern platform for product teams. Design, prototype, 
          and ship — all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100">
            Get Started Free
          </button>
          <button className="px-6 py-3 border border-white/50 rounded-lg hover:bg-white/10">
            Watch Demo
          </button>
        </div>
        <p className="text-sm opacity-75 mt-4">
          No credit card required · Free for individuals
        </p>
      </div>
    </div>
  );
}
```

---

## Social Proof Bar

```jsx live
export default function SocialProof() {
  const logos = ['Acme Inc', 'TechCorp', 'StartupXYZ', 'Enterprise Co', 'ScaleUp'];
  
  return (
    <div className="py-8 bg-gray-50 rounded-lg">
      <p className="text-center text-sm text-gray-500 mb-6">
        Trusted by 10,000+ teams at companies like
      </p>
      <div className="flex justify-center gap-8 flex-wrap">
        {logos.map(logo => (
          <div key={logo} className="px-4 py-2 text-gray-400 font-medium">
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Feature Grid

```jsx live
export default function FeatureGrid() {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Built for speed. See changes in milliseconds.' },
    { icon: '🔒', title: 'Secure by Default', desc: 'Enterprise-grade security out of the box.' },
    { icon: '🎨', title: 'Beautiful Design', desc: 'Stunning templates to get started quickly.' },
    { icon: '🔄', title: 'Real-time Sync', desc: 'Collaborate with your team in real-time.' },
    { icon: '📊', title: 'Analytics Built-in', desc: 'Track performance without extra tools.' },
    { icon: '🌐', title: 'Global CDN', desc: 'Deploy to 300+ edge locations worldwide.' },
  ];
  
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-4">Everything you need</h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        All the features you need to build, launch, and grow your product.
      </p>
      <div className="grid grid-cols-3 gap-8">
        {features.map(f => (
          <div key={f.title} className="text-center p-6">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="font-bold mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Pricing Cards

```jsx live
export default function PricingCards() {
  const [annual, setAnnual] = React.useState(true);
  
  const plans = [
    { name: 'Starter', price: annual ? 9 : 12, features: ['5 projects', '1 user', 'Basic analytics'] },
    { name: 'Pro', price: annual ? 29 : 39, features: ['Unlimited projects', '5 users', 'Advanced analytics', 'Priority support'], popular: true },
    { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'Unlimited users', 'SSO', 'Dedicated support'] },
  ];
  
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-4">Simple, transparent pricing</h2>
      
      {/* Toggle */}
      <div className="flex justify-center gap-4 mb-12">
        <span className={annual ? 'font-medium' : 'text-gray-500'}>Annual</span>
        <button 
          onClick={() => setAnnual(!annual)}
          className={`w-12 h-6 rounded-full relative ${annual ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
            annual ? 'translate-x-0.5' : 'translate-x-6'
          }`}></div>
        </button>
        <span className={!annual ? 'font-medium' : 'text-gray-500'}>Monthly</span>
        {annual && <span className="text-green-600 text-sm">Save 20%</span>}
      </div>
      
      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        {plans.map(plan => (
          <div 
            key={plan.name}
            className={`p-6 rounded-lg border-2 ${
              plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="text-blue-500 text-sm font-medium mb-2">Most Popular</div>
            )}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <div className="mt-4 mb-6">
              {typeof plan.price === 'number' ? (
                <>
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">/mo</span>
                </>
              ) : (
                <span className="text-2xl font-bold">{plan.price}</span>
              )}
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2 rounded-lg font-medium ${
              plan.popular 
                ? 'bg-blue-500 text-white' 
                : 'border border-gray-300 hover:bg-gray-50'
            }`}>
              {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## CTA Section

```jsx live
export default function CTASection() {
  return (
    <div className="bg-gray-900 text-white p-12 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto">
        Join thousands of teams already using our platform to build better products.
      </p>
      <div className="flex gap-4 justify-center">
        <input 
          type="email" 
          placeholder="Enter your email"
          className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 w-64 text-white placeholder-gray-400"
        />
        <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600">
          Start Free Trial
        </button>
      </div>
    </div>
  );
}
```

---

## Footer

```jsx live
export default function Footer() {
  const sections = [
    { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Resources', links: ['Documentation', 'API Reference', 'Guides', 'Community'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
  ];
  
  return (
    <div className="border-t py-12">
      <div className="grid grid-cols-5 gap-8">
        <div>
          <div className="font-bold text-xl mb-4">🚀 ProductCo</div>
          <p className="text-gray-500 text-sm">Building the future of product development.</p>
        </div>
        {sections.map(section => (
          <div key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t mt-12 pt-8 flex justify-between text-sm text-gray-500">
        <span>© 2024 ProductCo. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#">Twitter</a>
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
```

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
