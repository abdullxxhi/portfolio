import { motion, useScroll, useTransform } from 'motion/react';

export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();

  const sageX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    [0, 70, -30, 55, -20]
  );

  const sageY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -120, -260]
  );

  const orangeX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    [0, -80, 45, -35]
  );

  const orangeY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 150, 300]
  );

  const centerY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -70, -150]
  );

  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -90]
  );

  const ringRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 140]
  );

  const ribbonX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-20, 80, -40]
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* =========================================================
          BASE
      ========================================================== */}

      <div className="absolute inset-0 bg-[#F5F1E8]" />

      {/* Fine paper texture */}
      <div
        className="absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage: `
            radial-gradient(
              rgba(29,42,38,0.10) 0.6px,
              transparent 0.6px
            )
          `,
          backgroundSize: '17px 17px',
        }}
      />

      {/* =========================================================
          LARGE SAGE ORGANIC FIELD
      ========================================================== */}

      <motion.div
        className="
          absolute
          -top-[24vw]
          -left-[25vw]
          w-[78vw]
          h-[78vw]
          min-w-[560px]
          min-h-[560px]
          max-w-[1150px]
          max-h-[1150px]
          rounded-full
          will-change-transform
        "
        style={{
          x: sageX,
          y: sageY,
          background: `
            radial-gradient(
              circle at 50% 50%,
              rgba(47,93,80,0.30) 0%,
              rgba(47,93,80,0.18) 24%,
              rgba(47,93,80,0.08) 46%,
              rgba(47,93,80,0.025) 62%,
              transparent 76%
            )
          `,
          filter: 'blur(18px)',
        }}
        animate={{
          scale: [1, 1.055, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          LARGE TERRACOTTA FIELD
      ========================================================== */}

      <motion.div
        className="
          absolute
          top-[8vh]
          -right-[27vw]
          w-[75vw]
          h-[75vw]
          min-w-[540px]
          min-h-[540px]
          max-w-[1100px]
          max-h-[1100px]
          rounded-full
          will-change-transform
        "
        style={{
          x: orangeX,
          y: orangeY,
          background: `
            radial-gradient(
              circle at 50% 50%,
              rgba(217,119,69,0.24) 0%,
              rgba(217,119,69,0.13) 25%,
              rgba(217,119,69,0.055) 46%,
              rgba(217,119,69,0.018) 62%,
              transparent 77%
            )
          `,
          filter: 'blur(22px)',
        }}
        animate={{
          scale: [1.02, 0.95, 1.02],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          delay: 1,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          CENTRAL GLOW
      ========================================================== */}

      <motion.div
        className="
          absolute
          top-[32%]
          left-1/2
          -translate-x-1/2
          w-[48vw]
          h-[48vw]
          min-w-[400px]
          min-h-[400px]
          max-w-[760px]
          max-h-[760px]
          rounded-full
          will-change-transform
        "
        style={{
          y: centerY,
          background: `
            radial-gradient(
              circle,
              rgba(252,250,246,0.72) 0%,
              rgba(252,250,246,0.36) 25%,
              rgba(47,93,80,0.045) 48%,
              transparent 72%
            )
          `,
          filter: 'blur(34px)',
        }}
        animate={{
          scale: [1, 1.08, 0.97, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          ARCHITECTURAL GRID
      ========================================================== */}

      <motion.div
        className="absolute inset-[-120px] opacity-[0.25] will-change-transform"
        style={{
          x: ribbonX,
          y: gridY,
          backgroundImage: `
            linear-gradient(
              rgba(47,93,80,0.11) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(47,93,80,0.11) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '72px 72px',
          transform: 'rotate(-2deg)',
        }}
      />

      {/* Larger guide grid */}
      <motion.div
        className="absolute inset-[-100px] opacity-[0.085] will-change-transform"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -45]),
          backgroundImage: `
            linear-gradient(
              rgba(217,119,69,0.22) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(217,119,69,0.22) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '216px 216px',
          transform: 'rotate(1deg)',
        }}
      />

      {/* =========================================================
          GIANT EDITORIAL RINGS
      ========================================================== */}

      <motion.div
        className="
          absolute
          top-[12%]
          left-[42%]
          w-[430px]
          h-[430px]
          rounded-full
          border-[1px]
          border-[#2F5D50]/10
          will-change-transform
        "
        style={{
          rotate: ringRotate,
        }}
      />

      <motion.div
        className="
          absolute
          top-[14%]
          left-[44%]
          w-[310px]
          h-[310px]
          rounded-full
          border-[1px]
          border-[#D97745]/10
          will-change-transform
        "
        style={{
          rotate: useTransform(
            scrollYProgress,
            [0, 1],
            [30, -90]
          ),
        }}
      />

      {/* Lower decorative ring */}
      <motion.div
        className="
          absolute
          top-[64%]
          -right-[110px]
          w-[420px]
          h-[420px]
          rounded-full
          border-[1px]
          border-[#2F5D50]/10
        "
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* =========================================================
          ORGANIC CURVE / RIBBON
      ========================================================== */}

      <motion.div
        className="
          absolute
          top-[-20%]
          left-[15%]
          w-[420px]
          h-[150%]
          rotate-[25deg]
          will-change-transform
        "
        style={{
          x: ribbonX,
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(252,250,246,0.02) 28%,
              rgba(252,250,246,0.34) 50%,
              rgba(252,250,246,0.02) 72%,
              transparent 100%
            )
          `,
          filter: 'blur(35px)',
        }}
        animate={{
          rotate: [25, 29, 25],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          FLOATING LIGHT ORBS
      ========================================================== */}

      <motion.div
        className="
          absolute
          top-[18%]
          right-[24%]
          w-[90px]
          h-[90px]
          rounded-full
        "
        style={{
          background:
            'radial-gradient(circle, rgba(217,119,69,0.20), transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={{
          y: [0, -24, 0],
          x: [0, 12, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="
          absolute
          top-[58%]
          left-[14%]
          w-[70px]
          h-[70px]
          rounded-full
        "
        style={{
          background:
            'radial-gradient(circle, rgba(47,93,80,0.18), transparent 70%)',
          filter: 'blur(7px)',
        }}
        animate={{
          y: [0, 20, 0],
          x: [0, -14, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="
          absolute
          top-[78%]
          right-[18%]
          w-[55px]
          h-[55px]
          rounded-full
        "
        style={{
          background:
            'radial-gradient(circle, rgba(217,119,69,0.16), transparent 70%)',
          filter: 'blur(6px)',
        }}
        animate={{
          y: [0, -16, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          HORIZONTAL ATMOSPHERIC LIGHT
      ========================================================== */}

      <motion.div
        className="
          absolute
          left-[-10%]
          top-[48%]
          w-[120%]
          h-[220px]
        "
        style={{
          background: `
            linear-gradient(
              to right,
              transparent,
              rgba(252,250,246,0.20),
              transparent
            )
          `,
          filter: 'blur(50px)',
        }}
        animate={{
          x: ['-8%', '8%', '-8%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          DEPTH SHADOW
      ========================================================== */}

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 35%,
              rgba(29,42,38,0.035) 72%,
              rgba(29,42,38,0.075) 100%
            )
          `,
        }}
      />

      {/* =========================================================
          TOP / BOTTOM FADES
      ========================================================== */}

      <div
        className="absolute inset-x-0 top-0 h-48"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,241,232,0.72), transparent)',
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{
          background:
            'linear-gradient(to top, rgba(245,241,232,0.72), transparent)',
        }}
      />

      {/* =========================================================
          MOBILE COMPOSITION
      ========================================================== */}

      <div className="absolute inset-0 lg:hidden">
        {/* Mobile sage glow */}
        <motion.div
          className="
            absolute
            -top-[110px]
            -left-[180px]
            w-[500px]
            h-[500px]
            rounded-full
          "
          style={{
            background: `
              radial-gradient(
                circle,
                rgba(47,93,80,0.27) 0%,
                rgba(47,93,80,0.10) 38%,
                transparent 72%
              )
            `,
            filter: 'blur(20px)',
          }}
          animate={{
            x: [0, 18, 0],
            y: [0, 14, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Mobile terracotta glow */}
        <motion.div
          className="
            absolute
            top-[35%]
            -right-[210px]
            w-[520px]
            h-[520px]
            rounded-full
          "
          style={{
            background: `
              radial-gradient(
                circle,
                rgba(217,119,69,0.22) 0%,
                rgba(217,119,69,0.075) 42%,
                transparent 73%
              )
            `,
            filter: 'blur(22px)',
          }}
          animate={{
            x: [0, -16, 0],
            y: [0, -12, 0],
            scale: [1.02, 0.96, 1.02],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Mobile central light */}
        <div
          className="
            absolute
            top-[61%]
            left-1/2
            -translate-x-1/2
            w-[390px]
            h-[390px]
            rounded-full
          "
          style={{
            background: `
              radial-gradient(
                circle,
                rgba(252,250,246,0.72) 0%,
                rgba(252,250,246,0.25) 38%,
                transparent 72%
              )
            `,
            filter: 'blur(25px)',
          }}
        />

        {/* Mobile grid */}
        <motion.div
          className="absolute inset-[-80px] opacity-[0.20]"
          style={{
            y: useTransform(
              scrollYProgress,
              [0, 1],
              [0, -55]
            ),
            backgroundImage: `
              linear-gradient(
                rgba(47,93,80,0.10) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(47,93,80,0.10) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '48px 48px',
            transform: 'rotate(-1.5deg)',
          }}
        />

        {/* Mobile ring */}
        <motion.div
          className="
            absolute
            top-[72%]
            -left-[110px]
            w-[340px]
            h-[340px]
            rounded-full
            border
            border-[#2F5D50]/10
          "
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Mobile light streak */}
        <motion.div
          className="
            absolute
            top-[-20%]
            right-[12%]
            w-[90px]
            h-[145%]
            rotate-[24deg]
          "
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(255,255,255,0.22), transparent)',
            filter: 'blur(28px)',
          }}
          animate={{
            x: ['20vw', '-30vw', '20vw'],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* =========================================================
          REDUCED MOTION
      ========================================================== */}

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
