
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { AppStep, UserSelections, SelectionOption } from './types';
import { 
  ONBOARDING_SLIDES, 
  CLOTHING_OPTIONS, 
  BACKGROUND_OPTIONS, 
  PHOTOSHOOT_OPTIONS, 
  EXPRESSION_OPTIONS 
} from './constants';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('onboarding');
  const [onboardingIndex, setOnboardingIndex] = useState(0);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showBefore, setShowBefore] = useState(false);

  const [selections, setSelections] = useState<UserSelections>({
    clothing: null,
    background: null,
    photoshoot: null,
    expression: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const b64 = reader.result as string;
      setUserImage(b64);
      setStep('scanning');
      setIsProcessing(true);
      setErrorMsg(null);

      try {
        const isValid = await geminiService.validateFace(b64);
        if (isValid) {
          setStep('clothing');
        } else {
          setErrorMsg("Please make sure your face is clearly visible.");
          setStep('upload');
        }
      } catch (err: any) {
        // Fallback in case of API error, allow user to try and customize
        setStep('clothing'); 
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFinalGenerate = async () => {
    if (!userImage) return;
    setStep('generating');
    setIsProcessing(true);
    try {
      const res = await geminiService.transformImage(userImage, selections);
      setResultImage(res);
      setStep('result');
    } catch (err: any) {
      alert("Studio Error: Identity-preserving generation failed. Please try again with a clearer photo.");
      setStep('expression');
    } finally {
      setIsProcessing(false);
    }
  };

  const goBack = () => {
    switch (step) {
      case 'onboarding':
        if (onboardingIndex > 0) setOnboardingIndex(onboardingIndex - 1);
        break;
      case 'upload':
        setStep('onboarding');
        setOnboardingIndex(ONBOARDING_SLIDES.length - 1);
        break;
      case 'scanning':
        setStep('upload');
        break;
      case 'clothing':
        setStep('upload');
        break;
      case 'background':
        setStep('clothing');
        break;
      case 'photoshoot':
        setStep('background');
        break;
      case 'expression':
        setStep('photoshoot');
        break;
      case 'result':
        setStep('expression');
        break;
      default:
        break;
    }
  };

  const renderSelectionGrid = (
    options: SelectionOption[], 
    onSelect: (opt: SelectionOption) => void, 
    currentId: string | undefined, 
    title: string, 
    subtitle: string,
    key: string
  ) => (
    <div key={key} className="flex-1 flex flex-col h-full">
      <header className="mb-6">
        <h2 className="text-3xl font-bold tracking-tighter mb-1">{title}</h2>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </header>
      <div className="flex-1 grid grid-cols-2 gap-4 pb-20 overflow-y-auto no-scrollbar">
        {options.map((opt) => (
          <motion.div
            key={opt.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(opt)}
            className={`relative aspect-[3/4] rounded-[32px] overflow-hidden cursor-pointer border-2 transition-all ${
              currentId === opt.id ? 'border-white' : 'border-white/10'
            }`}
          >
            <img src={opt.image} className="w-full h-full object-cover" alt={opt.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            {opt.badge && (
              <div className="absolute top-3 left-3 px-3 py-1 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white">{opt.badge}</span>
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-sm font-bold text-white leading-tight">{opt.name}</p>
            </div>
            {currentId === opt.id && (
              <div className="absolute top-3 right-3 bg-white text-black h-6 w-6 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-8 left-0 right-0 px-6 z-40">
        <button
          disabled={!currentId}
          onClick={() => {
            if (step === 'clothing') setStep('background');
            else if (step === 'background') setStep('photoshoot');
            else if (step === 'photoshoot') setStep('expression');
            else if (step === 'expression') handleFinalGenerate();
          }}
          className={`w-full py-5 rounded-[24px] font-bold text-lg transition-all ${
            currentId ? 'bg-white text-black shadow-[0_10px_40px_rgba(255,255,255,0.2)]' : 'bg-white/5 text-gray-500'
          }`}
        >
          {step === 'expression' ? 'Synthesize Identity' : 'Continue'}
        </button>
      </div>
    </div>
  );

  const stepTitle = useMemo(() => {
    switch(step) {
      case 'clothing': return 'Step 1: Wardrobe';
      case 'background': return 'Step 2: Location';
      case 'photoshoot': return 'Step 3: Vision';
      case 'expression': return 'Step 4: Mood';
      case 'upload': return 'Initialize';
      case 'result': return 'Masterpiece';
      default: return '';
    }
  }, [step]);

  return (
    <Layout 
      showBack={step !== 'onboarding' || onboardingIndex > 0} 
      onBack={goBack}
      title={stepTitle}
    >
      <AnimatePresence mode="wait">
        {step === 'onboarding' && (
          <motion.div
            key={`onboarding-${onboardingIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="relative flex-1 rounded-[40px] overflow-hidden mb-8 border border-white/10 shadow-2xl">
              <img 
                src={ONBOARDING_SLIDES[onboardingIndex].image} 
                className="w-full h-full object-cover" 
                alt="Onboarding"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-12 left-8 right-8 space-y-3">
                <h1 className="text-4xl font-bold tracking-tighter leading-tight">
                  {ONBOARDING_SLIDES[onboardingIndex].title}
                </h1>
                <p className="text-gray-300 text-lg font-light leading-relaxed">
                  {ONBOARDING_SLIDES[onboardingIndex].description}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pb-8">
              <div className="flex gap-2">
                {ONBOARDING_SLIDES.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === onboardingIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`} 
                  />
                ))}
              </div>
              <button 
                onClick={() => {
                  if (onboardingIndex < ONBOARDING_SLIDES.length - 1) setOnboardingIndex(onboardingIndex + 1);
                  else setStep('upload');
                }}
                className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:scale-105 transition-transform"
              >
                {onboardingIndex === ONBOARDING_SLIDES.length - 1 ? "Start Creating" : "Next"}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </motion.div>
        )}

        {step === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col py-10"
          >
            <header className="mb-10 text-center space-y-2">
              <h2 className="text-4xl font-bold tracking-tighter">Source Identity</h2>
              <p className="text-gray-400">The studio requires a clear portrait to lock your identity.</p>
            </header>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[4/5] glass rounded-[48px] border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.05] transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                 <div className="w-72 h-80 border-2 border-white rounded-[100px]" />
                 <div className="absolute w-full h-[1px] bg-white animate-[scan_3s_infinite]" />
              </div>
              <div className="p-8 bg-white/5 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1">Upload Your Face</h3>
              <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">8K Biometric Scan</p>
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFile} />
            </div>

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
              >
                {errorMsg}
              </motion.div>
            )}
            
            <div className="mt-8 p-6 glass rounded-3xl border border-white/10 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">Studio Protocol</span>
              <p className="text-sm text-gray-400 mt-2">All transformations are processed securely using high-end Nano Banana identity locking.</p>
            </div>
          </motion.div>
        )}

        {step === 'scanning' && (
          <motion.div
            key="scanning"
            className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
          >
            <div className="w-64 h-64 rounded-full border-2 border-white/10 p-4 relative">
               <motion.div 
                 className="absolute inset-0 border-2 border-white rounded-full"
                 animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.1, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
               />
               <img src={userImage || ''} className="w-full h-full object-cover rounded-full grayscale" />
               <motion.div 
                 className="absolute top-0 left-0 w-full h-[2px] bg-white shadow-[0_0_20px_white]"
                 animate={{ top: ['0%', '100%', '0%'] }}
                 transition={{ duration: 2, repeat: Infinity }}
               />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tighter">Analyzing Face</h3>
              <p className="text-gray-500 text-sm animate-pulse">Mapping biometric landmarks...</p>
            </div>
          </motion.div>
        )}

        {step === 'clothing' && renderSelectionGrid(
          CLOTHING_OPTIONS,
          (opt) => setSelections({...selections, clothing: opt}),
          selections.clothing?.id,
          "Wardrobe",
          "Choose your AI attire",
          "clothing"
        )}

        {step === 'background' && renderSelectionGrid(
          BACKGROUND_OPTIONS,
          (opt) => setSelections({...selections, background: opt}),
          selections.background?.id,
          "Environment",
          "Select the location",
          "background"
        )}

        {step === 'photoshoot' && renderSelectionGrid(
          PHOTOSHOOT_OPTIONS,
          (opt) => setSelections({...selections, photoshoot: opt}),
          selections.photoshoot?.id,
          "Vision",
          "Define the cinematic lighting",
          "photoshoot"
        )}

        {step === 'expression' && renderSelectionGrid(
          EXPRESSION_OPTIONS,
          (opt) => setSelections({...selections, expression: opt}),
          selections.expression?.id,
          "Mood",
          "How should the AI adapt your face?",
          "expression"
        )}

        {step === 'generating' && (
          <motion.div
            key="generating"
            className="flex-1 flex flex-col items-center justify-center text-center px-10"
          >
            <div className="w-64 h-64 mb-10 relative">
               <div className="absolute inset-0 glass rounded-[64px] border border-white/10 p-2 overflow-hidden">
                  <img src={userImage || ''} className="w-full h-full object-cover grayscale opacity-20 blur-sm" />
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 border-4 border-white/20 border-t-white rounded-full animate-spin" />
               </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold tracking-tighter">Synthesizing Masterpiece</h3>
              <p className="text-gray-400 text-lg font-light">Locking identity with cinematic embeddings...</p>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 relative rounded-[48px] overflow-hidden shadow-2xl glass border border-white/20 group cursor-pointer" onClick={() => setShowBefore(!showBefore)}>
               <img src={resultImage || ''} className={`w-full h-full object-cover transition-opacity duration-300 ${showBefore ? 'opacity-0' : 'opacity-100'}`} alt="Result" />
               <img src={userImage || ''} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${showBefore ? 'opacity-100' : 'opacity-0'}`} alt="Original" />
               
               <div className="absolute top-6 right-6 px-4 py-2 glass rounded-full border border-white/20">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">Free 8K</span>
               </div>

               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 glass rounded-full border border-white/20 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{showBefore ? 'Original' : 'Result'}</span>
                  <div className="w-px h-3 bg-white/20" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Tap to Compare</span>
               </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
               <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setStep('clothing')}
                    className="glass border border-white/10 py-5 rounded-[28px] font-bold text-lg active:scale-95 transition-all"
                  >
                    Adjust Style
                  </button>
                  <a 
                    href={resultImage || '#'} 
                    download={`persona-ai-masterpiece.png`}
                    className="bg-white text-black py-5 rounded-[28px] font-bold text-lg text-center active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                  >
                    Save Free HD
                  </a>
               </div>
               <button 
                 onClick={() => {
                   setSelections({clothing:null, background:null, photoshoot:null, expression:null});
                   setStep('upload');
                   setResultImage(null);
                 }}
                 className="text-gray-500 text-sm font-medium hover:text-white transition-colors text-center pb-8"
               >
                 Start New Transformation
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default App;
