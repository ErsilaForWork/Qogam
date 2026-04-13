export function CategoryCard({ name, problems, onSelectProblem, selected }) {
  return (
    <div className="mb-6 bg-white rounded-lg border-2 border-accent p-6 shadow-soft transition-all hover:shadow-gentle">
      <h3 className="font-semibold text-dark text-lg mb-4">{name}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {problems.map((problem) => (
          <button
            key={problem.id}
            onClick={() => onSelectProblem(problem.id)}
            className={`
              p-4 rounded-lg text-left transition-all
              border-2 font-medium
              ${
                selected === problem.id
                  ? 'border-primary bg-blue-50 text-dark'
                  : 'border-light bg-white text-dark hover:border-accent'
              }
            `}
          >
            {problem.name}
          </button>
        ))}
      </div>
    </div>
  );
}
