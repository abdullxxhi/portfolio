import { motion, useScroll, useTransform } from 'motion/react';

export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();

  // Different movement speeds create the parallax depth.
  const greenY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orangeY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const centerY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const greenX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 35, -20]);
  const orangeX = useTransform(scrollYProgress, [0, 0.5, 1], [0, -30, 25]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* =========================================================
          BASE
      ========================================================== */}

      <div className="absolute inset-0 bg-[#F5F1E8]" />

      {/* =========================================================
          PRIMARY PARALLAX ATMOSPHERE
      ========================================================== */}

      {/* Sage depth layer */}
      <motion.div
        className="absolute -top-[300px] -left-[260px] w-[820px] h-[820px] rounded-full will-change-transform"
        style={{
          x: greenX,
          y: greenY,
          background:
            'radial-gradient(circle, rgba(47,93,80,0.22) 0%, rgba(47,93,80,0.11) 32%, rgba(47,93,80,0.035) 58%, transparent 74%)',
          filter: 'blur(24px)',
        }}
        animate={{
          scale: [1, 1.045, 1],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Terracotta depth layer */}
      <motion.div
        className="absolute top-[12%] -right-[300px] w-[780px] h-[780px] rounded-full will-change-transform"
        style={{
          x: orangeX,
          y: orangeY,
          background:
            'radial-gradient(circle, rgba(217,119,69,0.20) 0%, rgba(217,119,69,0.10) 34%, rgba(217,119,69,0.03) 60%, transparent 76%)',
          filter: 'blur(28px)',
        }}
        animate={{
          scale: [1.02, 0.96, 1.02],
          rotate: [0, -4, 0],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          delay: 1,
          ease: 'easeInOut',
        }}
      />

      {/* Central atmospheric layer */}
      <motion.div
        className="absolute top-[38%] left-[22%] w-[620px] h-[620px] rounded-full will-change-transform"
        style={{
          y: centerY,
          background:
            'radial-gradient(circle, rgba(47,93,80,0.09) 0%, rgba(47,93,80,0.035) 42%, transparent 70%)',
          filter: 'blur(42px)',
        }}
        animate={{
          x: [0, 25, -15, 0],
          scale: [1, 1.035, 0.98, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          FLOATING HIGHLIGHT
      ========================================================== */}

      <motion.div
        className="absolute top-[60%] -right-[180px] w-[520px] h-[520px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(217,119,69,0.10) 0%, rgba(217,119,69,0.025) 50%, transparent 72%)',
          filter: 'blur(36px)',
          y: useTransform(scrollYProgress, [0, 1], [0, -160]),
        }}
        animate={{
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          PARALLAX GRID
      ========================================================== */}

      <motion.div
        className="absolute inset-0 opacity-[0.25] will-change-transform"
        style={{
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(47,93,80,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(47,93,80,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
        }}
      />

      {/* Secondary grid */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217,119,69,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,119,69,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '156px 156px',
        }}
      />

      {/* =========================================================
          DIAGONAL LIGHT
      ========================================================== */}

      <motion.div
        className="absolute -top-[30%] left-[38%] w-[170px] h-[160%] rotate-[25deg] will-change-transform"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(255,255,255,0.16), transparent)',
          filter: 'blur(55px)',
        }}
        animate={{
          x: ['-35vw', '65vw'],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* =========================================================
          DEPTH VIGNETTE
      ========================================================== */}

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 40%, rgba(29,42,38,0.045) 100%)',
        }}
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-48"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,241,232,0.38), transparent)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background:
            'linear-gradient(to top, rgba(245,241,232,0.38), transparent)',
        }}
      />

      {/* =========================================================
          MOBILE ATMOSPHERE
      ========================================================== */}

      <div className="absolute inset-0 lg:hidden">
        <div
          className="absolute -top-[180px] -left-[180px] w-[520px] h-[520px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(47,93,80,0.14) 0%, transparent 70%)',
            filter: 'blur(28px)',
          }}
        />

        <div
          className="absolute top-[45%] -right-[200px] w-[520px] h-[520px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(217,119,69,0.11) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* =========================================================
          REDUCED MOTION
      ========================================================== */}

      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            .will-change-transform {
              transform: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}
