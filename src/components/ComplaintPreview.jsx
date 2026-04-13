export function ComplaintPreview({ complaint }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <label className="block text-lg font-bold text-dark border-l-4 border-accent pl-3">
          Сіздің шағымыңыз
        </label>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
          {complaint ? `${complaint.split(' ').length} сөз` : '0 сөз'}
        </span>
      </div>
      
      <div className="relative">
        {/* Декоративті фон элементі */}
        <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-xl blur-sm opacity-50"></div>
        
        {/* Негізгі контент */}
        <div className="relative bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {/* Қағаз эффектісі - жоғарғы жолақ */}
          <div className="h-2 bg-gradient-to-r from-accent to-secondary"></div>
          
          {/* Мәтін аймағы */}
          <div className="p-6 max-h-96 overflow-y-auto custom-scrollbar">
            {complaint ? (
              <div className="space-y-4">
                {/* Шағым мәтіні - қағаз стилінде */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap font-serif">
                    {complaint}
                  </p>
                </div>
                
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-400 text-lg font-light">Шағым мәтіні әзірленбеді</p>
                <p className="text-gray-300 text-sm mt-1">Жоғарыдағы форманы толтырыңыз</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}