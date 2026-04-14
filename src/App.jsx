import { useState, useEffect } from 'react';
import { StepHeader } from './components/StepHeader';
import { PrimaryButton } from './components/PrimaryButton';
import { InputField } from './components/InputField';
import { CategoryCard } from './components/CategoryCard';
import { ComplaintPreview } from './components/ComplaintPreview';
import { complaintTemplates, problemCategories } from './templates';
import { replaceTemplatePlaceholders, copyToClipboard, formatDate, validateForm, buildFullAddress } from './utils';

export default function App() {
  // Step flow: 1 = home, 2 = select problem, 3 = enter details + preview
  const [step, setStep] = useState(1);
  
  // Form data
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('complaintFormData');
    return saved ? JSON.parse(saved) : {
      fullName: '',
      oblys: '',
      audan: '',
      qala: '',
      koshe: '',
      yy: '',
      date: new Date().toISOString().split('T')[0],
      customDescription: ''
    };
  });
  
  // Selected problem
  const [selectedProblem, setSelectedProblem] = useState(() => {
    return localStorage.getItem('selectedProblem') || '';
  });
  
  // Generated complaint
  const [complaint, setComplaint] = useState('');
  
  // UI states
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem('complaintFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('selectedProblem', selectedProblem);
  }, [selectedProblem]);

  // Clear errors when form changes
  useEffect(() => {
    setErrors({});
  }, [formData, selectedProblem]);

  // Step 1: Home / Welcome - Landing Page
  function renderHome() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16">
          <div className="w-full max-w-4xl">
            {/* Animated Logo */}
            <div className="animate-slideInDown flex justify-center mb-8">
              <div className="inline-block bg-gradient-to-br from-primary to-secondary rounded-full p-8 shadow-gentle animate-pulse-glow">
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Main Title */}
            <div className="text-center mb-6 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-6xl font-bold text-dark mb-4 leading-tight">
                Әртүрлі әлеуметтік мәселелерге қатысты<br/><span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">шағым құру</span>
              </h1>
              <p className="text-2xl text-accent mb-3">Мәселеңізді ресми түрде білдіріңіз</p>
              <p className="text-lg text-accent">Оңай, тез және шығынсыз</p>
            </div>

            {/* Subheading */}
            <div className="text-center mb-12 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
              <p className="text-base text-dark max-w-2xl mx-auto leading-relaxed">
                Ыңғайсыздық тудыратын мәселелерге қатысты ресми шағымды бірнеше минутта құрыңыз. 
          
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mb-16 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
              <PrimaryButton
                onClick={() => setStep(2)}
                size="lg"
                className="font-bold text-lg px-8 py-4 shadow-gentle hover:shadow-gentle"
              >
                🚀 Шағым құруды бастау
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-dark mb-4">Біздің платформаның артықшылықтары</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-light shadow-soft hover:shadow-gentle hover:border-primary transition-all hover:-translate-y-2 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-dark mb-3">5 минутта шағым құрыңыз</h3>
                <p className="text-accent leading-relaxed">
                  Біздің платформа әр адам еш қиындықсыз шағым құра алатындай етіп оңай және интуитивті түрде жасалған. Сізден тек қажетті деректерді жазу ғана қажет, қалғанын біз өзіміз жасаймыз.                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 border-2 border-light shadow-soft hover:shadow-gentle hover:border-secondary transition-all hover:-translate-y-2 animate-slideInUp" style={{ animationDelay: '0.5s' }}>
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-dark mb-3">Толықтай құпиялы</h3>
                <p className="text-accent leading-relaxed">
                  Сіздің мәліметтеріңіз қорғалған және тек өзіңізге ғана қолжетімді. Біз ешқашан үшінші тарапқа мәліметтерді жібермейміз. Қауіпсіздік пен құпиялылық біздің басты басымдықтарымыздың бірі.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 border-2 border-light shadow-soft hover:shadow-gentle hover:border-primary transition-all hover:-translate-y-2 animate-slideInUp" style={{ animationDelay: '0.6s' }}>
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-dark mb-3">Ресми құрылым</h3>
                <p className="text-accent leading-relaxed">
                  Шағым барлық нормативтік талаптарға сай және бекітілген стандарттарға толық сәйкес әзірленеді.  Сонымен қатар, барлық деректер тиісті талаптарға сай тексеріліп, бекітілген тәртіпке сәйкес жүйеленеді.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Problems Section */}
        <div className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-dark mb-4">Шағым қандай өзекті мәселелерді қамти алады?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Problem Categories */}
              <div className="space-y-4 animate-slide-in-left">
                <div className="bg-white rounded-lg p-6 border-l-4 border-primary shadow-soft hover:shadow-gentle transition-all">
                  <h4 className="font-bold text-dark mb-2">🏗️ Қалалық инфрақұрылым</h4>
                  <p className="text-sm text-accent">Қоқыс жинау, шу, жол мәселесі, жарықтандыру, аула жағдайы</p>
                </div>
                <div className="bg-white rounded-lg p-6 border-l-4 border-secondary shadow-soft hover:shadow-gentle transition-all">
                  <h4 className="font-bold text-dark mb-2">🏠 Коммуналдық қызметтер</h4>
                  <p className="text-sm text-accent">Су, жылу, электр, лифт, подъезд тазалығы</p>
                </div>
              </div>

              <div className="space-y-4 animate-slide-in-right">
                <div className="bg-white rounded-lg p-6 border-l-4 border-primary shadow-soft hover:shadow-gentle transition-all">
                  <h4 className="font-bold text-dark mb-2">🌆 Қоғамдық орта</h4>
                  <p className="text-sm text-accent">Қоғамдық көлік, заңсыз құрылыс, рұқсатсыз сауда</p>
                </div>
                <div className="bg-white rounded-lg p-6 border-l-4 border-secondary shadow-soft hover:shadow-gentle transition-all">
                  <h4 className="font-bold text-dark mb-2">⚖️ Мемлекеттік қызметтер</h4>
                  <p className="text-sm text-accent">Сыбайлас жемқорлық, қызмет сапасы мәселелері</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
       {/* Benefits Section */}
<div className="py-20 px-4 bg-white">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-4xl font-bold text-center text-dark mb-12">
      Біздің платформаны не үшін таңдауыңыз қажет?
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      
      <div className="flex gap-4 animate-slideInUp" style={{ animationDelay: '0.7s' }}>
        <div className="flex-shrink-0">
          <div className="text-3xl">📋</div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-dark mb-2">Уақыт үнемдеу</h3>
          <p className="text-accent">
            Сіз тек шағым мәтінін енгізесіз, ал қалған рәсімдеу жұмыстарын платформа автоматты түрде орындайды.
          </p>
        </div>
      </div>

      <div className="flex gap-4 animate-slideInUp" style={{ animationDelay: '0.8s' }}>
        <div className="flex-shrink-0">
          <div className="text-3xl">🎯</div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-dark mb-2">Ресми стандарттарға сәйкестік</h3>
          <p className="text-accent">
            Барлық құжаттар мемлекеттік органдардың талаптарына сәйкес дұрыс құрылымда автоматты түрде қалыптастырылады.
          </p>
        </div>
      </div>

      <div className="flex gap-4 animate-slideInUp" style={{ animationDelay: '0.9s' }}>
        <div className="flex-shrink-0">
          <div className="text-3xl">💾</div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-dark mb-2">Деректердің қауіпсіздігі</h3>
          <p className="text-accent">
            Сіздің барлық мәліметтеріңіз қауіпсіз түрде сақталады және жоғалып кету қаупі болмайды.
          </p>
        </div>
      </div>

      <div className="flex gap-4 animate-slideInUp" style={{ animationDelay: '1.0s' }}>
        <div className="flex-shrink-0">
          <div className="text-3xl">🔄</div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-dark mb-2">Жылдам өңдеу</h3>
          <p className="text-accent">
            Платформа шағымыңызды қысқа уақыт ішінде өңдеп, дайын мәтін ретінде ұсынады.
          </p>
        </div>
      </div>

    </div>
  </div>
</div>

        {/* Final CTA Section */}
        <div className="py-20 px-4 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10">
          <div className="max-w-2xl mx-auto text-center animate-slideInUp" style={{ animationDelay: '1.1s' }}>
            <h2 className="text-4xl font-bold text-dark mb-6">Шағымыңызды жасауды дәл қазір бастаңыз👇</h2>
            <PrimaryButton
              onClick={() => setStep(2)}
              size="lg"
              className="font-bold text-lg px-8 py-4 shadow-gentle hover:shadow-gentle animate-bounce-slow"
            >
              Шағым құруды бастау
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Select problem
  function renderSelectProblem() {
    return (
      <>
        <StepHeader step={1} totalSteps={2} title="Мәселені таңдау" />
        
      <p className="text-dark text-sm mb-6 leading-relaxed">
  <span className="font-semibold text-secondary">📋 Кеңес: </span> 
  Берілген мәселелердің ішінен дайын шағымдарды таңдай аласыз немесе 
  <span className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 bg-blue-100 rounded-md text-blue-700 font-medium text-xs">
    "Басқа мәселе"
  </span> 
  батырмасын басып, өзіңіз қалаған шағымды жаза аласыз.
</p>
        
        <div className="mb-8">
          {problemCategories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              problems={category.problems}
              selected={selectedProblem}
              onSelectProblem={setSelectedProblem}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <PrimaryButton
            onClick={() => setStep(1)}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Артқа
          </PrimaryButton>
          <PrimaryButton
            onClick={() => setStep(3)}
            size="lg"
            className="flex-1"
            disabled={!selectedProblem}
          >
            Далее →
          </PrimaryButton>
        </div>
      </>
    );
  }

  // Step 3: Enter details + preview
  function renderEnterDetails() {
    const allFieldsFilled = 
      formData.fullName?.trim() && 
      formData.oblys?.trim() && 
      formData.audan?.trim() && 
      formData.qala?.trim() && 
      formData.koshe?.trim() && 
      formData.yy?.trim() && 
      formData.date && 
      (selectedProblem !== 'basqa' || formData.customDescription?.trim());

    const renderForm = () => (
      <>
        <StepHeader step={2} totalSteps={2} title={complaint ? "Сіздің шағымыңыз дайын" : "Қажетті деректер"} />
        
        {!complaint && (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Full Name */}
            <InputField
              label="Толық аты-жөні"
              value={formData.fullName}
              onChange={(value) => setFormData({ ...formData, fullName: value })}
              placeholder="Айдар Оңайбай"
              error={errors.fullName}
            />
            
            {/* Address Fields */}
            <div className="bg-light rounded-lg p-4 border-2 border-accent mb-6">
              <p className="text-sm font-semibold text-dark mb-4">Мәселе болған мекенжай / Жеке мекенжайыңыз</p>
              
              <InputField
                label="Облыс"
                value={formData.oblys}
                onChange={(value) => setFormData({ ...formData, oblys: value })}
                placeholder="Түркістан"
                error={errors.oblys}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <InputField
                  label="Аудан"
                  value={formData.audan}
                  onChange={(value) => setFormData({ ...formData, audan: value })}
                  placeholder="Түлкібас"
                  error={errors.audan}
                />
                
                <InputField
                  label="Қала / Ауыл"
                  value={formData.qala}
                  onChange={(value) => setFormData({ ...formData, qala: value })}
                  placeholder="Түлкібас"
                  error={errors.qala}
                />
              </div>

              <InputField
                label="Көше аты"
                value={formData.koshe}
                onChange={(value) => setFormData({ ...formData, koshe: value })}
                placeholder="Абылай хан"
                error={errors.koshe}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <InputField
                  label="Үй нөмірі"
                  value={formData.yy}
                  onChange={(value) => setFormData({ ...formData, yy: value })}
                  placeholder="10/2"
                  error={errors.yy}
                />
              </div>
            </div>

            {/* Date */}
            <InputField
              label="Шағымның күні"
              type="date"
              value={formData.date}
              onChange={(value) => setFormData({ ...formData, date: value })}
              error={errors.date}
            />

            {/* Custom Description for "Other" */}
            {selectedProblem === 'basqa' && (
              <InputField
                label="Мәселенің нақты сипаттамасы"
                value={formData.customDescription}
                onChange={(value) => setFormData({ ...formData, customDescription: value })}
                placeholder="Мысалы: құбырдың жарылуы немесе пәтерде ауырлықтар..."
                textarea={true}
                error={errors.customDescription}
              />
            )}
          </form>
        )}
      </>
    );

    const renderButtons = () => {
      if (!complaint) {
        return (
          <div className="flex gap-4 mt-8">
            <PrimaryButton
              onClick={() => setStep(2)}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              Артқа
            </PrimaryButton>
            <PrimaryButton
              onClick={() => {
                const validation = validateForm(formData, selectedProblem);
                if (validation.isValid) {
                  const fullAddress = buildFullAddress(
                    formData.oblys,
                    formData.audan,
                    formData.qala,
                    formData.koshe,
                    formData.yy
                  );
                  const template = complaintTemplates[selectedProblem];
                  const generated = replaceTemplatePlaceholders(template, {
                    ...formData,
                    fullAddress
                  });
                  setComplaint(generated);
                } else {
                  setErrors(validation.errors);
                }
              }}
              size="lg"
              className="flex-1"
              disabled={!allFieldsFilled}
            >
              Дайын болды →
            </PrimaryButton>
          </div>
        );
      } else {
        return (
          <>
            <div className="flex flex-col gap-3 mt-8">
              <PrimaryButton
                onClick={async () => {
                  try {
                    await copyToClipboard(complaint);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch (err) {
                    console.error('Copy failed:', err);
                  }
                }}
                variant="primary"
                size="lg"
                className="w-full font-semibold"
              >
                📋 Көшіру
              </PrimaryButton>
              
              <PrimaryButton
                onClick={() => {
                  window.open('https://eotinish.kz/kk', '_blank');
                }}
                variant="secondary"
                size="lg"
                className="w-full font-semibold"
              >
                🌐 eOtinish сайты
              </PrimaryButton>

              <PrimaryButton
                onClick={() => {
                  window.open('https://www.youtube.com/watch?v=OMTGh4ITtHA', '_blank');
                }}
                variant="outline"
                size="lg"
                className="w-full font-semibold"
              >
                📹 Шағымды жіберуді үйрену
              </PrimaryButton>

              <PrimaryButton
                onClick={() => {
                  setStep(1);
                  setComplaint('');
                  setSelectedProblem('');
                  setFormData({
                    fullName: '',
                    oblys: '',
                    audan: '',
                    qala: '',
                    koshe: '',
                    yy: '',
                    date: new Date().toISOString().split('T')[0],
                    customDescription: ''
                  });
                  setErrors({});
                  setCopied(false);
                }}
                variant="outline"
                size="lg"
                className="w-full font-semibold"
              >
                ➕ Жаңа шағым құру
              </PrimaryButton>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-dark mb-3">Қадамдар:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Жоғарыдағы "eOtinish" батырмасын басу арқылы eOtinish сайтына өтіңіз.</li>
                <li>Төмендегі бейне сабақты қарап, шағымды қалай жіберу керектігін үйреніңіз.</li>
                <li>Сіздің дайын шағым мәтінін пайдаланып, шағымыңызды жіберіңіз.</li>
              </ol>
            </div>
          </>
        );
      }
    };

    return (
      <>
        {renderForm()}
        
        {complaint && (
          <>
            <div className="bg-green-50 border-l-4 border-secondary rounded-r-lg p-6 mb-8 shadow-soft mt-8">
              <div className="flex items-start gap-3">
                <div className="text-3xl">✓</div>
                <div>
                  <h2 className="font-semibold text-dark mb-1">Сәтті!</h2>
                  <p className="text-sm text-dark text-opacity-75">
                    Төмендегі мәтінді көшіріп, мемлекеттік органдарына жібере аласыз.
                  </p>
                </div>
              </div>
            </div>

            <ComplaintPreview 
              complaint={complaint} 
              copied={copied}
            />
          </>
        )}

        {renderButtons()}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {step === 1 && renderHome()}
      {step !== 1 && (
        <div className="py-8 px-4">
          <div className="w-full max-w-2xl mx-auto">
            {step === 2 && renderSelectProblem()}
            {step === 3 && renderEnterDetails()}
          </div>
        </div>
      )}
    </div>
  );
}
