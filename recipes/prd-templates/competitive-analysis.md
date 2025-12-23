# Competitive Analysis Template

> A template for side-by-side comparisons with interactive examples.

## About This Template

Use this template to compare different solutions, competitors, or approaches with **interactive examples** that stakeholders can experience.

---

## Analysis: [Topic]

### Executive Summary

*Brief overview of what's being compared and key findings.*

### Comparison Matrix

```jsx live
const competitors = [
  { name: 'Our Solution', score: 85, color: 'bg-blue-600' },
  { name: 'Competitor A', score: 70, color: 'bg-gray-400' },
  { name: 'Competitor B', score: 65, color: 'bg-gray-400' },
  { name: 'Competitor C', score: 55, color: 'bg-gray-400' },
];

export default function ComparisonChart() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="font-bold mb-4">Overall Score Comparison</h3>
      <div className="space-y-3">
        {competitors.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="w-28 text-sm font-medium">{c.name}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full ${c.color} rounded-full transition-all duration-500`}
                style={{ width: `${c.score}%` }}
              />
            </div>
            <span className="w-12 text-right text-sm font-bold">{c.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Feature Comparison

```jsx live


const features = [
  { name: 'Feature A', ours: true, compA: true, compB: false, compC: false },
  { name: 'Feature B', ours: true, compA: false, compB: true, compC: true },
  { name: 'Feature C', ours: true, compA: true, compB: true, compC: false },
  { name: 'Feature D', ours: true, compA: false, compB: false, compC: false },
];

export default function FeatureMatrix() {
  const [highlight, setHighlight] = React.useState(null);
  
  const Check = () => <span className="text-green-600 text-lg">✓</span>;
  const Cross = () => <span className="text-red-400 text-lg">✗</span>;
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2">
            <th className="py-2 text-left">Feature</th>
            <th className="py-2 text-center bg-blue-50">Us</th>
            <th className="py-2 text-center">Comp A</th>
            <th className="py-2 text-center">Comp B</th>
            <th className="py-2 text-center">Comp C</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr
              key={f.name}
              className={`border-b ${highlight === i ? 'bg-yellow-50' : ''}`}
              onMouseEnter={() => setHighlight(i)}
              onMouseLeave={() => setHighlight(null)}
            >
              <td className="py-2 font-medium">{f.name}</td>
              <td className="py-2 text-center bg-blue-50">{f.ours ? <Check /> : <Cross />}</td>
              <td className="py-2 text-center">{f.compA ? <Check /> : <Cross />}</td>
              <td className="py-2 text-center">{f.compB ? <Check /> : <Cross />}</td>
              <td className="py-2 text-center">{f.compC ? <Check /> : <Cross />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Side-by-Side Experience

```jsx live


export default function SideBySide() {
  const [activeTab, setActiveTab] = React.useState('ours');
  
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="flex border-b">
        {['ours', 'competitor'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tab === 'ours' ? 'Our Approach' : 'Competitor Approach'}
          </button>
        ))}
      </div>
      <div className="p-6 min-h-[200px]">
        {activeTab === 'ours' ? (
          <div className="text-center">
            <div className="text-4xl mb-2">🚀</div>
            <p className="text-gray-600">Our solution experience here</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-2">📦</div>
            <p className="text-gray-600">Competitor experience here</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Key Insights

1. **Insight 1**: Analysis...
2. **Insight 2**: Analysis...
3. **Insight 3**: Analysis...

### Recommendations

- Recommendation 1
- Recommendation 2
- Recommendation 3

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
