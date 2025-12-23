# SaaS Dashboard PRD

> A complete mini-PRD for a SaaS analytics dashboard.

## About This Case Study

This is a complete product requirements document for a SaaS dashboard, demonstrating how Reactive MD can be used for comprehensive product specifications with interactive prototypes.

---

## Executive Summary

### Product Vision

A modern analytics dashboard that provides real-time insights for SaaS businesses, enabling data-driven decision making.

### Target Users

- **Product Managers**: Need to track feature adoption and user behavior
- **Growth Teams**: Need to monitor key metrics and identify opportunities
- **Executives**: Need high-level overview of business health

---

## Interactive Prototype

```jsx live


export default function DashboardPRD() {
  const [view, setView] = React.useState('overview');
  const [period, setPeriod] = React.useState('7d');
  
  const metrics = [
    { label: 'Monthly Revenue', value: '$52,400', change: '+12%', up: true },
    { label: 'Active Users', value: '3,241', change: '+8%', up: true },
    { label: 'Churn Rate', value: '2.1%', change: '-0.5%', up: false },
    { label: 'NPS Score', value: '72', change: '+4', up: true },
  ];
  
  return (
    <div className="bg-gray-100 rounded-xl p-4 min-h-[500px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-lg text-sm ${
                period === p ? 'bg-blue-600 text-white' : 'bg-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-sm text-gray-500">{m.label}</div>
            <div className="text-2xl font-bold mt-1">{m.value}</div>
            <div className={`text-sm mt-1 ${m.up ? 'text-green-600' : 'text-red-600'}`}>
              {m.change}
            </div>
          </div>
        ))}
      </div>
      
      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        {['overview', 'users', 'revenue', 'features'].map((tab) => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={`px-4 py-2 rounded-t-lg capitalize ${
              view === tab ? 'bg-white' : 'bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-b-xl rounded-tr-xl p-6 min-h-[200px]">
        <h3 className="font-bold mb-4 capitalize">{view} View</h3>
        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          {view} chart/content placeholder
        </div>
      </div>
    </div>
  );
}
```

---

## User Stories

| Priority | As a... | I want to... | So that... |
|----------|---------|--------------|------------|
| P0 | PM | see real-time metrics | I can react quickly to changes |
| P0 | Executive | view revenue trends | I can report to stakeholders |
| P1 | Growth | segment users | I can identify power users |
| P1 | PM | track feature adoption | I can prioritize roadmap |
| P2 | Team Lead | export reports | I can share with team |

## Success Metrics

- **Engagement**: Dashboard viewed 3+ times per week per user
- **Adoption**: 80% of teams using within 30 days
- **Satisfaction**: NPS > 40 for dashboard specifically

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
