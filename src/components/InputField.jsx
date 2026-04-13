export function InputField({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder = '',
  error = '',
  required = true,
  textarea = false
}) {
  const Component = textarea ? 'textarea' : 'input';
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-dark mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <Component
        type={textarea ? undefined : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-lg border-2 transition-all
          focus:outline-none focus:bg-light
          ${error 
            ? 'border-red-400 bg-red-50' 
            : 'border-accent bg-white'
          }
          ${textarea ? 'font-family: monospace; min-h-32' : ''}
        `}
      />
      
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}
