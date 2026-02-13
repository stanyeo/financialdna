import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, Loader2, Lock } from 'lucide-react';
import { quizData, PHASES, getAnswerValue } from '../data/quizData';
import { submitToGoogleForm } from '../utils/formSubmission';
import { getValidator } from '../utils/validators';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import PhaseTransition from './PhaseTransition';
import ConfirmationScreen from './ConfirmationScreen';
import AdvisorReaction from './AdvisorReaction';

// ─────────────────────────────────────────────
// Build the visible question list (skip conditional Qs that don't apply)
// ─────────────────────────────────────────────
function getVisibleQuestions(answers) {
  return quizData.filter((q) => {
    if (typeof q.showIf === 'function') return q.showIf(answers);
    return true;
  });
}

// Validators are now imported from ../utils/validators

// ─────────────────────────────────────────────
// QuizContainer
// ─────────────────────────────────────────────
export default function QuizContainer() {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPhaseTransition, setShowPhaseTransition] = useState(false);
  const [pendingPhase, setPendingPhase] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [showAdvisorReaction, setShowAdvisorReaction] = useState(false);
  const [currentReaction, setCurrentReaction] = useState(null);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const visibleQuestions = useMemo(
    () => getVisibleQuestions(answers),
    [answers]
  );
  const total = visibleQuestions.length;
  const current = visibleQuestions[currentIndex];
  const currentPhase = current?.phase || 1;
  const phaseColor = PHASES[currentPhase]?.color || '#00d9ff';
  const answer = answers[current?.mapToKey];

  // ── Compute phase boundaries for progress bar ──
  const phaseBounds = useMemo(() => {
    const firstInPhase = visibleQuestions.findIndex((q) => q.phase === currentPhase);
    let lastInPhase = firstInPhase;
    for (let i = firstInPhase; i < visibleQuestions.length; i++) {
      if (visibleQuestions[i].phase === currentPhase) lastInPhase = i;
      else break;
    }
    return { phaseStart: firstInPhase + 1, phaseEnd: lastInPhase + 1 };
  }, [visibleQuestions, currentPhase]);

  // ── Scroll to top on question change ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex, showPhaseTransition]);

  // ── Answer handler ──
  const handleAnswer = useCallback(
    (value) => {
      setAnswers((prev) => ({ ...prev, [current.mapToKey]: value }));
    },
    [current]
  );

  // ── Can advance? ──
  const canAdvance = useMemo(() => {
    if (!current) return false;
    if (current.optional) return true;

    const val = answer;
    if (!val) return false;

    if (current.type === 'single') return true; // already has selection

    // Use centralized validator if available
    const validator = getValidator(current);
    if (validator) {
      return validator(val).valid;
    }

    if (typeof val === 'string') return val.trim().length > 0;
    return true;
  }, [current, answer]);

  // ── Navigate next ──
  const goNext = useCallback(() => {
    if (!canAdvance && !current?.optional) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex >= total) return; // shouldn't happen, submit takes over

    const nextQ = visibleQuestions[nextIndex];
    const nextPhase = nextQ?.phase;

    // Phase transition?
    if (nextPhase && nextPhase !== currentPhase) {
      // Mid-journey reassurance: show reaction after Phase 3 before advancing to Phase 4
      if (currentPhase === 3 && nextPhase === 4) {
        setDirection(1);
        setCurrentReaction({
          phase: 3,
          message: "You're halfway through. I can already see your pattern emerging—it's very clear where you sit. Let's lock in the rest.",
        });
        setPendingPhase(nextPhase);
        setShowAdvisorReaction(true);
        return;
      }

      setDirection(1);
      setPendingPhase(nextPhase);
      setShowPhaseTransition(true);
    } else {
      setDirection(1);
      setCurrentIndex(nextIndex);
    }
  }, [canAdvance, currentIndex, total, visibleQuestions, currentPhase, current]);

  // ── Navigate back ──
  const goBack = useCallback(() => {
    if (currentIndex <= 0) return;
    setDirection(-1);
    setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);

  // ── Phase transition complete ──
  const handlePhaseTransitionDone = useCallback(() => {
    setShowPhaseTransition(false);
    setDirection(1);
    // Phase 1 transition: don't increment (already at Q1, index 0)
    if (pendingPhase === 1) {
      setPendingPhase(null);
    } else {
      setPendingPhase(null);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [pendingPhase]);

  // ── Submit ──
  const doSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      // Build flat answer map: mapToKey -> string value
      const payload = {};
      for (const q of quizData) {
        const raw = answers[q.mapToKey];
        if (raw !== undefined && raw !== null && raw !== '') {
          payload[q.mapToKey] = getAnswerValue(raw);
        }
      }

      await submitToGoogleForm(payload);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      // Still show confirmation — no-cors may appear to fail but actually succeeds
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }, [answers, submitting]);

  // ── Submit with end reaction ──
  const handleSubmit = useCallback(() => {
    if (submitting) return;
    // Show Phase 5 reaction before actually submitting
    setCurrentReaction({
      phase: 5,
      message: "That's everything I need. Your Financial DNA is complete.",
    });
    setPendingSubmit(true);
    setShowAdvisorReaction(true);
  }, [submitting]);

  // ── Derived state ──
  const isLastQuestion = currentIndex === total - 1;

  // ── Keyboard navigation ──
  useEffect(() => {
    function onKey(e) {
      if (submitted || showPhaseTransition || submitting || showAdvisorReaction) return;
      if (e.key === 'Enter' && canAdvance) {
        e.preventDefault();
        if (isLastQuestion) handleSubmit();
        else goNext();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [canAdvance, submitted, showPhaseTransition, submitting, showAdvisorReaction, isLastQuestion, goNext, handleSubmit]);

  // ── Auto-advance after single-select (slight delay for feedback) ──
  const handleSingleAnswer = useCallback(
    (value) => {
      handleAnswer(value);

      // Small delay so user sees the selection before moving on
      const nextIndex = currentIndex + 1;
      if (nextIndex >= total) return; // last Q => user clicks submit

      setTimeout(() => {
        const nextQ = visibleQuestions[nextIndex];
        if (nextQ?.phase !== currentPhase) {
          const nextPhase = nextQ.phase;
          // Mid-journey reassurance: show reaction after Phase 3 before advancing to Phase 4
          if (currentPhase === 3 && nextPhase === 4) {
            setDirection(1);
            setCurrentReaction({
              phase: 3,
              message: "You're halfway through. I can already see your pattern emerging. It's very clear where you sit. Let's lock in the rest.",
              showButton: true,
            });
            setPendingPhase(nextPhase);
            setShowAdvisorReaction(true);
            return;
          }

          setDirection(1);
          setPendingPhase(nextPhase);
          setShowPhaseTransition(true);
        } else {
          setDirection(1);
          setCurrentIndex(nextIndex);
        }
      }, 400);
    },
    [handleAnswer, currentIndex, total, visibleQuestions, currentPhase]
  );

  // ── Advisor reaction complete ──
  const handleAdvisorReactionDone = useCallback(() => {
    setShowAdvisorReaction(false);
    setCurrentReaction(null);

    // If this was the submit reaction, actually submit now
    if (pendingSubmit) {
      setPendingSubmit(false);
      doSubmit();
      return;
    }

    // If this was a mid-journey reassurance, show the phase transition after
    if (pendingPhase) {
      setShowPhaseTransition(true);
      return;
    }
  }, [pendingSubmit, doSubmit, pendingPhase]);

  // ── Submitted state ──
  if (submitted) {
    return <ConfirmationScreen name={answers.clientName || ''} />;
  }

  // ── Intro avatar (shown once before Q1) ──
  if (showIntro) {
    return (
      <AdvisorReaction
        phase={1}
        message="Hey, I'm Stanley. I'm going to ask you some questions about how you think about money. At the end, you'll get a personalised report that breaks down your financial DNA. The more honest your response, the more accurate your results will be. Ready? Let's go!"
        onDone={() => {
          setShowIntro(false);
          setPendingPhase(1);
          setShowPhaseTransition(true);
        }}
        showButton={true}
      />
    );
  }

  // ── Advisor reaction interstitial ──
  if (showAdvisorReaction && currentReaction) {
    return (
      <AdvisorReaction
        phase={currentReaction.phase}
        message={currentReaction.message}
        onDone={handleAdvisorReactionDone}
        showButton={currentReaction.showButton}
      />
    );
  }

  // ── Phase transition interstitial ──
  if (showPhaseTransition && pendingPhase) {
    return (
      <PhaseTransition
        phase={pendingPhase}
        onComplete={handlePhaseTransitionDone}
      />
    );
  }

  // Guard
  if (!current) return null;

  // ── Slide animation variants ──
  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* ── Progress bar ── */}
      <div className="sticky top-0 z-50 bg-dna-bg/80 backdrop-blur-xl border-b border-dna-border/20 px-4 sm:px-6 py-3">
        <div className="max-w-lg mx-auto">
          <ProgressBar
            current={currentIndex + 1}
            total={total}
            phase={currentPhase}
            phaseStart={phaseBounds.phaseStart}
            phaseEnd={phaseBounds.phaseEnd}
          />
        </div>
      </div>

      {/* ── Question area ── */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 pt-8 sm:pt-12 pb-32">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Phase + question number */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{PHASES[currentPhase]?.icon}</span>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em]"
                  style={{ color: phaseColor + '90' }}
                >
                  {PHASES[currentPhase]?.title}
                </span>
                <span className="text-[10px] font-mono text-gray-600 ml-auto">
                  {currentIndex + 1} of {total}
                </span>
              </div>

              {/* Question text */}
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {current.question}
              </h2>
              {current.subtitle && (
                <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed line-clamp-3">
                  {current.subtitle}
                </p>
              )}

              {/* No wrong answers reassurance (shown sometimes) */}
              {current.type === 'single' && currentPhase >= 2 && currentIndex % 4 === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-[11px] text-gray-600 mt-1.5 italic"
                >
                  No right or wrong, just honest answers.
                </motion.p>
              )}

              {/* Answer area */}
              <div className="mt-6">
                <QuestionCard
                  question={current}
                  answer={answer}
                  onAnswer={
                    current.type === 'single' ? handleSingleAnswer : handleAnswer
                  }
                  phaseColor={phaseColor}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom navigation bar ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-dna-bg/90 backdrop-blur-xl border-t border-dna-border/20">
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-4">
          {/* PDPA consent shown only on last question */}
          {isLastQuestion && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-gray-500 text-center mb-3 leading-relaxed max-w-sm mx-auto"
            >
              <Lock className="w-3 h-3 inline mr-1 -mt-0.5" />
              By clicking Submit, I consent to the collection and processing of my
              personal data for the purpose of generating and sending my Financial
              DNA report and related advisory communications.
            </motion.p>
          )}

          <div className="flex items-center justify-between">
            {/* Back */}
            <button
              onClick={goBack}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                currentIndex === 0
                  ? 'text-gray-700 cursor-not-allowed'
                  : 'text-gray-400 hover:text-white active:text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {/* Next / Submit */}
            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!canAdvance || submitting}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  canAdvance && !submitting
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30 active:scale-95 shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                    : 'bg-dna-card/40 border border-dna-border/20 text-gray-600 cursor-not-allowed'
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analysing DNA...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={goNext}
                disabled={!canAdvance && !current.optional}
                className={`flex items-center gap-1 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95 ${
                  canAdvance || current.optional
                    ? 'text-white border hover:shadow-lg'
                    : 'bg-dna-card/40 border border-dna-border/20 text-gray-600 cursor-not-allowed'
                }`}
                style={
                  canAdvance || current.optional
                    ? {
                        borderColor: phaseColor + '50',
                        backgroundColor: phaseColor + '15',
                        color: phaseColor,
                        boxShadow: `0 0 15px ${phaseColor}15`,
                      }
                    : {}
                }
              >
                {current.optional ? 'Skip' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
