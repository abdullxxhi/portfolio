import { motion, useScroll, useTransform } from 'motion/react';

export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();

  const sageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const terracottaY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#F5F1E8]" />

      {/* Subtle data texture */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at 12px 18px,
              rgba(47,93,80,0.12) 0.7px,
              transparent 0.9px
            ),
            radial-gradient(
              circle at 42px 34px,
              rgba(217,119,69,0.10) 0.55px,
              transparent 0.8px
            ),
            linear-gradient(
              118deg,
              transparent 0%,
              transparent 47%,
              rgba(47,93,80,0.035) 47.2%,
              transparent 47.45%,
              transparent 100%
            )
          `,
          backgroundSize: '84px 72px, 116px 104px, 190px 190px',
        }}
      />

      {/* Sparse analytical traces */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(
              92deg,
              transparent 0%,
              transparent 24%,
              rgba(47,93,80,0.08) 24.15%,
              transparent 24.3%,
              transparent 100%
            ),
            linear-gradient(
              7deg,
              transparent 0%,
              transparent 67%,
              rgba(217,119,69,0.07) 67.15%,
              transparent 67.3%,
              transparent 100%
            )
          `,
          backgroundSize: '260px 230px, 310px 280px',
        }}
      />

      {/* Soft sage atmosphere */}
      <motion.div
        className="
          absolute
          -top-[260px]
          -left-[220px]
          w-[620px]
          h-[620px]
          sm:w-[760px]
          sm:h-[760px]
          lg:w-[900px]
          lg:h-[900px]
          rounded-full
        "
        style={{
          y: sageY,
          background: `
            radial-gradient(
              circle,
              rgba(47,93,80,0.13) 0%,
              rgba(47,93,80,0.055) 42%,
              transparent 72%
            )
          `,
          filter: 'blur(45px)',
        }}
        animate={{
          scale: [1, 1.025, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Soft terracotta atmosphere */}
      <motion.div
        className="
          absolute
          top-[24%]
          -right-[280px]
          w-[620px]
          h-[620px]
          sm:w-[760px]
          sm:h-[760px]
          lg:w-[900px]
          lg:h-[900px]
          rounded-full
        "
        style={{
          y: terracottaY,
          background: `
            radial-gradient(
              circle,
              rgba(217,119,69,0.085) 0%,
              rgba(217,119,69,0.035) 44%,
              transparent 72%
            )
          `,
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1.01, 0.985, 1.01],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Very subtle center separation */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              rgba(252,250,246,0.30) 0%,
              rgba(252,250,246,0.08) 42%,
              transparent 72%
            )
          `,
        }}
      />

      {/* Barely visible edge depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 52%,
              rgba(29,42,38,0.025) 100%
            )
          `,
        }}
      />

      {/* Soft top fade */}
      <div
        className="absolute inset-x-0 top-0 h-36 sm:h-48"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,241,232,0.65), transparent)',
        }}
      />

      {/* Soft bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-36 sm:h-48"
        style={{
          background:
            'linear-gradient(to top, rgba(245,241,232,0.65), transparent)',
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
