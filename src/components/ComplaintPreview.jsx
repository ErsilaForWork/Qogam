export function ComplaintPreview({ complaint, onCopy, copied }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-dark mb-2">
        Өндіктеген шағми
      </label>
      
      <div className="bg-white border-2 border-accent rounded-lg p-6 shadow-soft min-h-96 overflow-y-auto">
        <pre className="text-dark text-sm leading-relaxed font-sans whitespace-pre-wrap break-words">
          {complaint}
        </pre>
      </div>
      
      {copied && (
        <div className="mt-2 text-sm text-secondary font-medium animate-fadeIn">
          ✓ Мәтін көшірілді
        </div>
      )}
    </div>
  );
}
