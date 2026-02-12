import { motion } from 'framer-motion';
import { CheckCircle, Mail, FileText, Brain, Shield, TrendingUp, Clock, Share2 } from 'lucide-react';

/**
 * ConfirmationScreen - Shown after successful form submission.
 *
 * Designed to:
 * 1. Build anticipation for the PDF
 * 2. Feel personal (advisor avatar)
 * 3. Drive organic referrals via share button
 */
export default function ConfirmationScreen({ name }) {
  const firstName = name ? name.trim().split(' ')[0] : '';

  const reportSections = [
    { icon: Brain, label: 'Your Financial Archetype', color: '#00d9ff' },
    { icon: Shield, label: 'Your Blind Spots & Fragilities', color: '#fbbf24' },
    { icon: TrendingUp, label: 'Your Strategic Blueprint', color: '#10b981' },
  ];

  const handleShare = async () => {
    const shareData = {
      title: 'Financial DNA Quiz',
      text: "I just took this Financial DNA quiz and it's actually pretty insightful. Try it out, might surprise you about yourself 🧬",
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      // User cancelled share, do nothing
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center">
      {/* Advisor avatar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <div className="relative">
          <img
            src="/avatars/avatar-result.png"
            alt="Your advisor"
            className="w-auto h-auto max-w-[96px] max-h-[96px] rounded-xl border-2 border-emerald-400/40"
            style={{ boxShadow: '0 0 30px rgba(52, 211, 153, 0.2)' }}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-dna-bg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
          >
            <CheckCircle className="w-4 h-4 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-3xl font-bold text-white mt-6"
      >
        {firstName ? `${firstName}, your DNA is decoded.` : 'Your DNA is decoded.'}
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-gray-400 mt-3 max-w-sm text-sm leading-relaxed"
      >
        Your personalised{' '}
        <span className="text-neon-cyan font-semibold">
          Behavioral Wealth Blueprint
        </span>{' '}
        is being generated and will land in your inbox shortly.
      </motion.p>

      {/* Open Email Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={() => {
          window.location.href = 'mailto:';
        }}
        className="mt-6 w-full max-w-sm flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                   bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-semibold text-sm
                   hover:bg-neon-cyan/20 active:scale-[0.98] transition-all duration-200"
      >
        <Mail className="w-4 h-4" />
        Open Email
      </motion.button>

      {/* What's in the PDF */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-subtle p-5 mt-8 max-w-sm w-full text-left"
      >
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-neon-cyan" />
          <p className="text-[11px] font-mono uppercase tracking-widest text-gray-500">
            What's in your report
          </p>
        </div>
        <div className="space-y-3">
          {reportSections.map((section, i) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.12 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: section.color + '15',
                  border: `1px solid ${section.color}30`,
                }}
              >
                <section.icon className="w-4 h-4" style={{ color: section.color }} />
              </div>
              <span className="text-sm text-gray-300">{section.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* What happens next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="glass-subtle p-5 mt-4 max-w-sm w-full text-left"
      >
        <p className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-4">
          Next steps
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-white font-medium">Check your inbox</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Your Blueprint PDF will arrive within a few minutes. Check spam if you don't see it.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#fbbf24' }} />
            <div>
              <p className="text-sm text-white font-medium">
                I might reach out
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Not to sell you anything. Just to walk through what your results
                mean and share one thing you can act on right away.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Share / Refer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-6 max-w-sm w-full"
      >
        <p className="text-[11px] text-gray-500 mb-3 text-center">
          Know someone who'd find this useful?
        </p>
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                     bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-semibold text-sm
                     hover:bg-neon-cyan/20 active:scale-[0.98] transition-all duration-200"
        >
          <Share2 className="w-4 h-4" />
          Send to a Friend
        </button>
      </motion.div>

      {/* Trust builder */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-[11px] text-gray-600 mt-6 max-w-xs leading-relaxed italic"
      >
        "Real talk: my goal is for you to walk away with something useful,
        whether or not we end up working together."
      </motion.p>

      {/* DNA processing animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mt-8 flex items-center gap-2"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-neon-cyan/50"
            animate={{ height: [6, 18, 6] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.12,
              ease: 'easeInOut',
            }}
          />
        ))}
        <span className="text-[10px] text-gray-600 ml-2 font-mono">
          generating blueprint...
        </span>
      </motion.div>
    </div>
  );
}
