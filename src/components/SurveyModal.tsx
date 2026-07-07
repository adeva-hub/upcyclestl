import { useState, useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  open: boolean;
  onClose: () => void;
}

const STYLE_PERSONAS: Record<string, string> = {
  'My style is bold and I love wearing statement pieces with strong colors, graphic prints, and eye-catching patterns.': 'Calypso',
  'My style is classic and I prefer clean, minimalist silhouettes with quality materials and refined details.': 'Dallas',
  'My style is creative and I love layering pieces with different textures, mixed materials, and unexpected combinations.': 'Blossom',
  'My style is expressive and I gravitate toward garments that carry history, meaning, and craftsmanship.': 'Maverick',
};

const steps = [
  {
    id: 'style_identity',
    title: 'What describes your style?',
    subtitle: 'Choose the one that feels most like you.',
    options: [
      'My style is bold and I love wearing statement pieces with strong colors, graphic prints, and eye-catching patterns.',
      'My style is classic and I prefer clean, minimalist silhouettes with quality materials and refined details.',
      'My style is creative and I love layering pieces with different textures, mixed materials, and unexpected combinations.',
      'My style is expressive and I gravitate toward garments that carry history, meaning, and craftsmanship.',
    ],
  },
  {
    id: 'motivation',
    title: 'What draws you to upcycled fashion?',
    subtitle: 'Pick what resonates most.',
    options: [
      'The uniqueness — I want to wear something no one else has ever worn.',
      'The sustainability — I care deeply about reducing textile waste and fashion\'s impact.',
      'The craftsmanship — I appreciate hand-made, thoughtfully constructed garments.',
      'The story — I love wearing pieces that carry history and have a life before me.',
    ],
  },
  {
    id: 'garment_interest',
    title: 'What are you looking for?',
    subtitle: 'What kind of piece speaks to you right now?',
    options: [
      'A one-of-one wearable art piece — something that exists only once.',
      'A small batch item — limited availability, but a few exist.',
      'A studio experiment — something boundary-pushing and conceptual.',
      'I\'m open to anything — I\'ll know it when I see it.',
    ],
  },
];

type Answers = Record<string, string>;

export function SurveyModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [persona, setPersona] = useState('');
  const [error, setError] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Reset when closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(0);
        setAnswers({});
        setName('');
        setEmail('');
        setSubmitted(false);
        setPersona('');
        setError('');
      }, 300);
    }
  }, [open]);

  const currentStep = steps[step];
  const selectedOption = currentStep ? answers[currentStep.id] : undefined;
  const isLastQuestionStep = step === steps.length - 1;
  const isContactStep = step === steps.length;

  const handleSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentStep.id]: option }));
  };

  const handleNext = () => {
    if (!selectedOption) return;
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    const { error: dbError } = await supabase.from('style_survey_responses').insert({
      style_identity: answers['style_identity'],
      motivation: answers['motivation'],
      garment_interest: answers['garment_interest'],
      name: name.trim() || null,
      email: email.trim() || null,
    });
    setSubmitting(false);
    if (dbError) {
      setError('Something went wrong. Please try again.');
    } else {
      setPersona(STYLE_PERSONAS[answers['style_identity']] ?? '');
      setSubmitted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] transition-all duration-300"
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      aria-modal="true"
      role="dialog"
      aria-label="Style questionnaire"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div
        className="absolute inset-x-0 bottom-0 md:inset-x-auto md:right-6 md:top-6 md:bottom-6 md:w-[480px] bg-stone-800 flex flex-col rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
        style={{ transform: open ? 'translateY(0)' : 'translateY(40px)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 flex-shrink-0">
          <div>
            <p className="text-brick-400 text-xs tracking-ultrawide uppercase font-medium font-sans">
              {submitted ? 'Complete' : `${step + 1} of ${steps.length + 1}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-800 hover:bg-stone-700 transition-colors duration-200 flex-shrink-0"
            aria-label="Close survey"
          >
            <X className="w-4 h-4 text-stone-300" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-stone-800 mx-6 mb-6 flex-shrink-0">
          <div
            className="h-full bg-brick-500 transition-all duration-500"
            style={{ width: `${((step) / (steps.length + 1)) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {submitted ? (
            <Thankyou persona={persona} onClose={onClose} />
          ) : isContactStep ? (
            <ContactStep
              name={name}
              email={email}
              onName={setName}
              onEmail={setEmail}
              onSubmit={handleSubmit}
              submitting={submitting}
              error={error}
            />
          ) : (
            <QuestionStep
              step={currentStep}
              selected={selectedOption}
              onSelect={handleSelect}
              onNext={handleNext}
              isLast={isLastQuestionStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function QuestionStep({
  step,
  selected,
  onSelect,
  onNext,
  isLast,
}: {
  step: (typeof steps)[number];
  selected: string | undefined;
  onSelect: (v: string) => void;
  onNext: () => void;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Question heading */}
      <div className="px-6 pb-6">
        <h2 className="font-editorial text-cream-100 text-3xl font-light leading-snug mb-1">
          {step.title}
        </h2>
        <p className="text-stone-500 text-sm font-light">{step.subtitle}</p>
      </div>

      {/* Options */}
      <div className="flex-1">
        {step.options.map((option, i) => {
          const isSelected = selected === option;
          return (
            <button
              key={i}
              onClick={() => onSelect(option)}
              className={`w-full flex items-center justify-between gap-4 px-6 py-5 border-t text-left transition-all duration-200 group ${
                isSelected
                  ? 'bg-stone-800 border-stone-700'
                  : 'bg-transparent border-stone-800 hover:bg-stone-800/50'
              }`}
            >
              <span
                className={`font-editorial text-xl leading-snug transition-colors duration-200 ${
                  isSelected ? 'text-cream-100' : 'text-stone-300 group-hover:text-stone-100'
                }`}
              >
                {option}
              </span>
              <div
                className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'border-brick-500 bg-brick-500'
                    : 'border-stone-600 group-hover:border-stone-400'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <div className="px-6 py-6 flex-shrink-0 border-t border-stone-800">
        <button
          onClick={onNext}
          disabled={!selected}
          className={`w-full py-4 flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
            selected
              ? 'bg-brick-500 text-cream-100 hover:bg-brick-600'
              : 'bg-stone-800 text-stone-600 cursor-not-allowed'
          }`}
        >
          {isLast ? 'Almost done' : 'Continue'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ContactStep({
  name, email, onName, onEmail, onSubmit, submitting, error,
}: {
  name: string;
  email: string;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string;
}) {
  return (
    <div className="flex flex-col h-full px-6">
      <div className="pb-6">
        <h2 className="font-editorial text-cream-100 text-3xl font-light leading-snug mb-1">
          Want us to follow up?
        </h2>
        <p className="text-stone-500 text-sm font-light">
          Completely optional — leave your info and we'll reach out when a piece that matches your style becomes available.
        </p>
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <label className="text-stone-500 text-xs tracking-widest uppercase font-medium block mb-2">
            Name (optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={e => onName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-stone-800 border border-stone-700 text-cream-200 placeholder-stone-600 px-4 py-3 text-sm font-light focus:outline-none focus:border-brick-500 transition-colors duration-200 rounded-sm"
          />
        </div>
        <div>
          <label className="text-stone-500 text-xs tracking-widest uppercase font-medium block mb-2">
            Email (optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={e => onEmail(e.target.value)}
            placeholder="hello@example.com"
            className="w-full bg-stone-800 border border-stone-700 text-cream-200 placeholder-stone-600 px-4 py-3 text-sm font-light focus:outline-none focus:border-brick-500 transition-colors duration-200 rounded-sm"
          />
        </div>

        {error && (
          <p className="text-brick-400 text-sm font-light">{error}</p>
        )}
      </div>

      <div className="py-6 flex-shrink-0 space-y-3">
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="w-full py-4 flex items-center justify-center gap-2 bg-brick-500 hover:bg-brick-600 text-cream-100 text-xs tracking-widest uppercase font-medium transition-all duration-300 disabled:opacity-60"
        >
          {submitting ? 'Submitting...' : 'Submit'}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="w-full py-3 text-stone-500 text-xs tracking-widest uppercase font-medium hover:text-stone-300 transition-colors duration-200"
        >
          Skip &amp; Submit Anonymously
        </button>
      </div>
    </div>
  );
}

function Thankyou({ persona, onClose }: { persona: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
      <div className="w-16 h-16 rounded-full border border-brick-700 flex items-center justify-center mb-8">
        <Check className="w-7 h-7 text-brick-400" />
      </div>

      {persona && (
        <>
          <p className="text-stone-500 text-xs tracking-ultrawide uppercase font-medium font-sans mb-3">
            Your style is
          </p>
          <p className="font-editorial text-brick-400 text-6xl font-light italic mb-6 tracking-wide">
            {persona}
          </p>
          <div className="w-12 h-px bg-stone-700 mb-6" />
        </>
      )}

      <h2 className="font-editorial text-cream-100 text-3xl font-light italic mb-4">
        Thank you.
      </h2>
      <p className="text-stone-400 text-sm font-light leading-relaxed max-w-xs mb-10">
        Your style profile helps us create pieces that feel made for you. We'll be in touch when something special arrives.
      </p>
      <button
        onClick={onClose}
        className="px-10 py-4 border border-stone-700 text-stone-300 text-xs tracking-widest uppercase font-medium hover:border-stone-500 hover:text-stone-100 transition-all duration-300"
      >
        Back to Studio
      </button>
    </div>
  );
}
