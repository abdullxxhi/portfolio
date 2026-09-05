import { motion, useScroll, useTransform } from 'motion/react';

export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();

  const sageY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orangeY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const centerY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#F5F1E8]" />

      {/* Large soft sage field */}
      <motion.div
        className="
          absolute
          -top-[260px]
          -left-[280px]
          w-[780px]
          h-[780px]
          sm:w-[1000px]
          sm:h-[1000px]
          lg:w-[1250px]
          lg:h-[1250px]
          rounded-full
        "
        style={{
          y: sageY,
          background:
            'radial-gradient(circle, rgba(47,93,80,0.24) 0%, rgba(47,93,80,0.14) 25%, rgba(47,93,80,0.055) 48%, transparent 72%)',
          filter: 'blur(35px)',
        }}
        animate={{
          scale: [1, 1.045, 1],
          x: [0, 25, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Large terracotta field */}
      <motion.div
        className="
          absolute
          top-[22%]
          -right-[340px]
          w-[760px]
          h-[760px]
          sm:w-[1000px]
          sm:h-[1000px]
          lg:w-[1250px]
          lg:h-[1250px]
          rounded-full
        "
        style={{
          y: orangeY,
          background:
            'radial-gradient(circle, rgba(217,119,69,0.19) 0%, rgba(217,119,69,0.10) 28%, rgba(217,119,69,0.035) 52%, transparent 72%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 0.96, 1.025, 1],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle sage wash */}
      <motion.div
        className="
          absolute
          top-[42%]
          -left-[180px]
          w-[600px]
          h-[600px]
          sm:w-[760px]
          sm:h-[760px]
          rounded-full
        "
        style={{
          y: centerY,
          background:
            'radial-gradient(circle, rgba(47,93,80,0.10) 0%, rgba(47,93,80,0.045) 42%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, 30, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Warm central glow */}
      <div
        className="
          absolute
          top-[18%]
          left-1/2
          -translate-x-1/2
          w-[600px]
          h-[600px]
          sm:w-[850px]
          sm:h-[850px]
          rounded-full
        "
        style={{
          background:
            'radial-gradient(circle, rgba(252,250,246,0.75) 0%, rgba(252,250,246,0.35) 38%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Soft horizontal color movement */}
      <div
        className="absolute top-[54%] left-0 right-0 h-[420px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(47,93,80,0.035), transparent 28%, rgba(217,119,69,0.045) 72%, transparent)',
          filter: 'blur(45px)',
        }}
      />

      {/* Subtle paper texture */}
      <div
        className="absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(29,42,38,0.18) 0.5px, transparent 0.7px)',
          backgroundSize: '6px 6px',
        }}
      />

      {/* Decorative data points */}
      <div className="absolute inset-0 opacity-[0.16]">
        <span className="absolute top-[17%] left-[12%] h-1.5 w-1.5 rounded-full bg-[#2F5D50]" />
        <span className="absolute top-[28%] left-[25%] h-1 w-1 rounded-full bg-[#D97745]" />
        <span className="absolute top-[38%] right-[18%] h-1.5 w-1.5 rounded-full bg-[#2F5D50]" />
        <span className="absolute top-[52%] right-[31%] h-1 w-1 rounded-full bg-[#D97745]" />
        <span className="absolute top-[67%] left-[18%] h-1.5 w-1.5 rounded-full bg-[#2F5D50]" />
        <span className="absolute top-[78%] right-[12%] h-1 w-1 rounded-full bg-[#D97745]" />
      </div>

      {/* Fine vertical atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(47,93,80,0.8) 50%, transparent 100%)',
          backgroundSize: '45% 100%',
          backgroundPosition: 'center',
        }}
      />

      {/* Edge depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 42%, rgba(29,42,38,0.055) 100%)',
        }}
      />

      {/* Top atmospheric fade */}
      <div
        className="absolute inset-x-0 top-0 h-48 sm:h-64"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,241,232,0.45), transparent)',
        }}
      />

      {/* Bottom atmospheric fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 sm:h-64"
        style={{
          background:
            'linear-gradient(to top, rgba(245,241,232,0.45), transparent)',
        }}
      />

      {/* Reduced motion */}
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </div>
  );
}
