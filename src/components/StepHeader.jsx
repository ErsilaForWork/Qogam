export function StepHeader({ step, totalSteps, title }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold text-dark">{title}</h1>
        <div className="text-sm text-accent font-medium">
          {step} / {totalSteps}
        </div>
      </div>
      
      {/* Step indicator */}
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
              i < step
                ? 'bg-gradient-to-r from-primary to-secondary'
                : i === step - 1
                ? 'bg-primary'
                : 'bg-light'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
