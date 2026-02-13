import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { getValidator } from '../utils/validators';

/**
 * QuestionCard — Renders a single quiz question.
 * Supports types: single, text, email, tel
 *
 * Features:
 * - Interactive "tap card" selection with phase-colored feedback
 * - Staggered option reveal for visual rhythm
 * - Selected state feels "locked in" (checkmark, solid fill)
 * - Mobile-first touch targets (min 56px height)
 * - Real-time validation with inline error messages
 */
export default function QuestionCard({
  question,
  answer,
  onAnswer,
  phaseColor = '#00d9ff',
}) {
  const { type, options, placeholder, subtitle, optional } = question;
  const inputRef = useRef(null);
  const [justSelected, setJustSelected] = useState(null);
  const [touched, setTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const validator = getValidator(question);

  // Focus text inputs on mount
  useEffect(() => {
    if (['text', 'email', 'tel'].includes(type) && inputRef.current) {
      const timer = setTimeout(() => inputRef.current.focus(), 400);
      return () => clearTimeout(timer);
    }
  }, [question.id, type]);

  // Reset state when question changes
  useEffect(() => {
    setJustSelected(null);
    setTouched(false);
    setErrorMsg(null);
  }, [question.id]);

  // Validate on value change (only after first blur)
  useEffect(() => {
    if (touched && validator && answer) {
      const result = validator(answer);
      setErrorMsg(result.valid ? null : result.error);
    } else if (touched && !answer) {
      setErrorMsg(null);
    }
  }, [answer, touched]);

  // Handle input change with phone digit enforcement
  const handleInputChange = (e) => {
    let value = e.target.value;
    if (type === 'tel') {
      value = value.replace(/\D/g, '').slice(0, 8);
    }
    onAnswer(value);
  };

  // Handle blur to trigger first validation
  const handleBlur = (e) => {
    setTouched(true);
    e.target.style.borderColor = '';
    e.target.style.boxShadow = '';
    if (validator && answer) {
      const result = validator(answer);
      setErrorMsg(result.valid ? null : result.error);
    }
  };

  // ── Single-select ──
  if (type === 'single') {
    return (
      <div className="space-y-2.5">
        {options.map((opt, i) => {
          const isSelected =
            answer &&
            (typeof answer === 'string'
              ? answer === opt.value
              : answer.value === opt.value);
          const wasJustSelected = justSelected === opt.value;

          return (
            <motion.button
              key={opt.value}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setJustSelected(opt.value);
                onAnswer(opt);
              }}
              whileTap={{ scale: 0.97 }}
              className="w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden group"
              style={{
                padding: '14px 16px',
                minHeight: '56px',
                borderColor: isSelected ? phaseColor + '70' : 'rgba(26, 45, 84, 0.3)',
                backgroundColor: isSelected ? phaseColor + '12' : 'rgba(10, 22, 40, 0.4)',
                boxShadow: isSelected
                  ? `0 0 24px ${phaseColor}18, 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 ${phaseColor}15`
                  : '0 2px 8px rgba(0,0,0,0.15)',
                transform: isSelected ? 'translateX(0)' : undefined,
              }}
            >
              <div className="flex items-center gap-3.5">
                {/* Emoji with hover animation */}
                {opt.emoji && (
                  <motion.span
                    className="text-2xl flex-shrink-0 select-none"
                    animate={wasJustSelected ? { scale: [1, 1.3, 1], rotate: [0, 8, -8, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    style={{ filter: isSelected ? 'none' : 'grayscale(0.3)' }}
                  >
                    {opt.emoji}
                  </motion.span>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span
                    className="font-semibold text-[15px] block leading-snug transition-colors duration-200"
                    style={{ color: isSelected ? phaseColor : '#e5e7eb' }}
                  >
                    {opt.label}
                  </span>
                  {opt.description && (
                    <span
                      className="text-xs mt-0.5 block leading-snug transition-colors duration-200"
                      style={{ color: isSelected ? phaseColor + 'aa' : '#6b7280' }}
                    >
                      {opt.description}
                    </span>
                  )}
                </div>

                {/* Checkmark indicator */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: isSelected ? phaseColor : 'transparent',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: isSelected ? phaseColor : 'rgba(26, 45, 84, 0.5)',
                  }}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Selection flash overlay */}
              <AnimatePresence>
                {wasJustSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ backgroundColor: phaseColor }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    );
  }

  // ── Text / Email / Tel inputs ──
  const inputType = type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'text';
  const isLongText = type === 'text' && question.id === 'q16_successDefinition';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {isLongText ? (
        <textarea
          ref={inputRef}
          value={answer || ''}
          onChange={handleInputChange}
          placeholder={placeholder || 'Type here...'}
          rows={4}
          className={`w-full bg-dna-card/50 border rounded-2xl px-5 py-4
                     text-white text-[15px] placeholder-gray-600 resize-none
                     focus:outline-none transition-all duration-300
                     ${errorMsg ? 'border-red-500/70' : 'border-dna-border/30'}`}
          onFocus={(e) => {
            if (!errorMsg) {
              e.target.style.borderColor = phaseColor + '60';
              e.target.style.boxShadow = `0 0 24px ${phaseColor}12, 0 4px 16px rgba(0,0,0,0.2)`;
            }
          }}
          onBlur={handleBlur}
        />
      ) : (
        <input
          ref={inputRef}
          type={type === 'tel' ? 'text' : inputType}
          inputMode={type === 'tel' ? 'numeric' : undefined}
          value={answer || ''}
          onChange={handleInputChange}
          placeholder={placeholder || 'Type here...'}
          maxLength={type === 'tel' ? 8 : undefined}
          autoComplete={
            type === 'email'
              ? 'email'
              : type === 'tel'
              ? 'tel'
              : question.mapToKey === 'clientName'
              ? 'name'
              : 'off'
          }
          className={`w-full bg-dna-card/50 border rounded-2xl px-5 py-4
                     text-white text-[15px] placeholder-gray-600
                     focus:outline-none transition-all duration-300
                     ${errorMsg ? 'border-red-500/70' : 'border-dna-border/30'}`}
          style={{ minHeight: '56px' }}
          onFocus={(e) => {
            if (!errorMsg) {
              e.target.style.borderColor = phaseColor + '60';
              e.target.style.boxShadow = `0 0 24px ${phaseColor}12, 0 4px 16px rgba(0,0,0,0.2)`;
            }
          }}
          onBlur={handleBlur}
        />
      )}

      {/* Validation error message */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 mt-2 ml-1"
          >
            <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            <span className="text-[12px] text-red-400">{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper text */}
      {optional && !errorMsg && (
        <p className="text-[11px] text-gray-500 mt-2.5 ml-1">
          This field is optional. You can skip it.
        </p>
      )}
      {type === 'tel' && !errorMsg && (
        <p className="text-[11px] text-gray-500 mt-2.5 ml-1">
          Singapore mobile: 8 digits, starting with 8 or 9
        </p>
      )}
    </motion.div>
  );
}
