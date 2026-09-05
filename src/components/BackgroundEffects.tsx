import { motion, useScroll, useTransform } from 'motion/react';

export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();

  const sageY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const terracottaY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const warmY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#F5F1E8]" />

      {/* Warm paper-like tonal variation */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 75% 55% at 50% 8%,
              rgba(252,250,246,0.72) 0%,
              rgba(252,250,246,0.30) 38%,
              transparent 72%
            ),
            radial-gradient(
              ellipse 65% 50% at 8% 82%,
              rgba(217,119,69,0.045) 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 65% 50% at 92% 18%,
              rgba(47,93,80,0.055) 0%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Soft sage atmosphere */}
      <motion.div
        className="
          absolute
          -top-[320px]
          -left-[300px]
          w-[700px]
          h-[700px]
          sm:w-[850px]
          sm:h-[850px]
          lg:w-[1050px]
          lg:h-[1050px]
          rounded-full
        "
        style={{
          y: sageY,
          background: `
            radial-gradient(
              circle,
              rgba(47,93,80,0.16) 0%,
              rgba(47,93,80,0.075) 28%,
              rgba(47,93,80,0.025) 52%,
              transparent 72%
            )
          `,
          filter: 'blur(55px)',
        }}
        animate={{
          x: [0, 18, -8, 0],
          y: [0, 12, -8, 0],
          scale: [1, 1.035, 0.985, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Soft terracotta atmosphere */}
      <motion.div
        className="
          absolute
          top-[18%]
          -right-[330px]
          w-[720px]
          h-[720px]
          sm:w-[880px]
          sm:h-[880px]
          lg:w-[1080px]
          lg:h-[1080px]
          rounded-full
        "
        style={{
          y: terracottaY,
          background: `
            radial-gradient(
              circle,
              rgba(217,119,69,0.115) 0%,
              rgba(217,119,69,0.055) 30%,
              rgba(217,119,69,0.018) 52%,
              transparent 73%
            )
          `,
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -20, 10, 0],
          y: [0, -10, 12, 0],
          scale: [1.01, 0.975, 1.025, 1.01],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Small warm glow */}
      <motion.div
        className="
          absolute
          top-[48%]
          left-[34%]
          w-[420px]
          h-[420px]
          sm:w-[560px]
          sm:h-[560px]
          rounded-full
        "
        style={{
          y: warmY,
          background: `
            radial-gradient(
              circle,
              rgba(217,119,69,0.045) 0%,
              rgba(252,250,246,0.025) 38%,
              transparent 70%
            )
          `,
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.65, 0.9, 0.65],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Very subtle paper grain */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `
            radial-gradient(
              rgba(29,42,38,0.10) 0.45px,
              transparent 0.55px
            )
          `,
          backgroundSize: '5px 5px',
        }}
      />

      {/* Extremely subtle data points */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at 20% 24%,
              rgba(47,93,80,0.55) 0.8px,
              transparent 1px
            ),
            radial-gradient(
              circle at 74% 62%,
              rgba(217,119,69,0.55) 0.7px,
              transparent 0.95px
            ),
            radial-gradient(
              circle at 46% 86%,
              rgba(47,93,80,0.45) 0.65px,
              transparent 0.9px
            )
          `,
          backgroundSize: '180px 180px, 220px 220px, 260px 260px',
        }}
      />

      {/* Soft central breathing space */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 58% 68% at 50% 48%,
              rgba(252,250,246,0.30) 0%,
              rgba(252,250,246,0.10) 38%,
              transparent 72%
            )
          `,
        }}
      />

      {/* Gentle edge depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 48%,
              rgba(29,42,38,0.025) 100%
            )
          `,
        }}
      />

      {/* Soft top fade */}
      <div
        className="absolute inset-x-0 top-0 h-40 sm:h-56"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,241,232,0.72), transparent)',
        }}
      />

      {/* Soft bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 sm:h-56"
        style={{
          background:
            'linear-gradient(to top, rgba(245,241,232,0.72), transparent)',
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
