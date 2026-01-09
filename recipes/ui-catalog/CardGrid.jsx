import projects from './projects.json';

export default function CardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="text-3xl">{card.icon}</div>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                card.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : card.status === 'Review'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {card.status}
            </span>
          </div>
          <h3 className="text-lg font-bold mt-4">{card.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{card.desc}</p>
          <div className="flex gap-2 mt-4">
            <button className="text-blue-600 text-sm hover:underline">View</button>
            <button className="text-gray-600 text-sm hover:underline">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}