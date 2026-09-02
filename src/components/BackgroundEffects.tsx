import { motion, useScroll, useTransform } from 'motion/react';

export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();

  /*
   * Responsive scroll movement.
   *
   * The values are intentionally moderate so the background feels alive
   * without competing with the actual portfolio content.
   */
  const sageY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const sageX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 28, -18]
  );

  const terracottaY = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const terracottaX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -24, 20]
  );

  const centerY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -45]);

  /*
   * Very subtle background tonal shift as the visitor moves through
   * the portfolio.
   */
  const atmosphereOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.82, 0.95, 0.88, 0.96, 0.82]
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* =========================================================
          BASE PAPER
      ========================================================== */}

      <div className="absolute inset-0 bg-[#F5F1E8]" />

      {/* =========================================================
          PAPER / EDITORIAL TEXTURE
      ========================================================== */}

      <div
        className="absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage: `
            radial-gradient(
              rgba(29,42,38,0.055) 0.7px,
              transparent 0.7px
            )
          `,
          backgroundSize: '19px 19px',
        }}
      />

      {/* =========================================================
          LARGE ATMOSPHERIC FIELD
      ========================================================== */}

      <motion.div
        className="absolute
          -top-[22vw]
          -left-[20vw]
          w-[72vw]
          h-[72vw]
          min-w-[520px]
          min-h-[520px]
          max-w-[1050px]
          max-h-[1050px]
          rounded-full
          will-change-transform"
        style={{
          x: sageX,
          y: sageY,
          opacity: atmosphereOpacity,
          background: `
            radial-gradient(
              circle,
              rgba(47,93,80,0.19) 0%,
              rgba(47,93,80,0.095) 30%,
              rgba(47,93,80,0.035) 56%,
              transparent 73%
            )
          `,
          filter: 'blur(32px)',
        }}
        animate={{
          scale: [1, 1.035, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          TERRACOTTA ATMOSPHERE
      ========================================================== */}

      <motion.div
        className="absolute
          top-[18vh]
          -right-[23vw]
          w-[68vw]
          h-[68vw]
          min-w-[500px]
          min-h-[500px]
          max-w-[980px]
          max-h-[980px]
          rounded-full
          will-change-transform"
        style={{
          x: terracottaX,
          y: terracottaY,
          opacity: atmosphereOpacity,
          background: `
            radial-gradient(
              circle,
              rgba(217,119,69,0.16) 0%,
              rgba(217,119,69,0.075) 31%,
              rgba(217,119,69,0.025) 56%,
              transparent 74%
            )
          `,
          filter: 'blur(38px)',
        }}
        animate={{
          scale: [1.02, 0.97, 1.02],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          delay: 1.5,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          CENTRAL DEPTH
      ========================================================== */}

      <motion.div
        className="absolute
          top-[42vh]
          left-1/2
          -translate-x-1/2
          w-[55vw]
          h-[55vw]
          min-w-[420px]
          min-h-[420px]
          max-w-[760px]
          max-h-[760px]
          rounded-full
          will-change-transform"
        style={{
          y: centerY,
          background: `
            radial-gradient(
              circle,
              rgba(47,93,80,0.055) 0%,
              rgba(47,93,80,0.022) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(48px)',
        }}
        animate={{
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{
          duration: 27,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          EDITORIAL GRID
      ========================================================== */}

      <motion.div
        className="absolute inset-0 opacity-[0.20] will-change-transform"
        style={{
          y: gridY,
          backgroundImage: `
            linear-gradient(
              rgba(47,93,80,0.075) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(47,93,80,0.075) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Larger editorial guide grid */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(217,119,69,0.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(217,119,69,0.18) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '192px 192px',
        }}
      />

      {/* =========================================================
          SOFT HORIZONTAL ATMOSPHERIC BANDS
      ========================================================== */}

      <div
        className="absolute inset-x-0 top-[24%] h-[18vh]"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(252,250,246,0.24), transparent)',
          filter: 'blur(30px)',
        }}
      />

      <div
        className="absolute inset-x-0 top-[70%] h-[20vh]"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(47,93,80,0.025), transparent)',
          filter: 'blur(35px)',
        }}
      />

      {/* =========================================================
          SLOW DIAGONAL LIGHT
      ========================================================== */}

      <motion.div
        className="absolute
          -top-[35%]
          left-1/2
          w-[130px]
          h-[170%]
          rotate-[24deg]
          will-change-transform"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(255,255,255,0.13), transparent)',
          filter: 'blur(58px)',
        }}
        animate={{
          x: ['-42vw', '48vw'],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* =========================================================
          CORNER LIGHT
      ========================================================== */}

      <motion.div
        className="absolute
          -bottom-[22vw]
          -left-[18vw]
          w-[48vw]
          h-[48vw]
          min-w-[360px]
          min-h-[360px]
          max-w-[700px]
          max-h-[700px]
          rounded-full
          will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(217,119,69,0.055) 0%, transparent 68%)',
          filter: 'blur(42px)',
        }}
        animate={{
          x: [0, 18, 0],
          y: [0, -14, 0],
          scale: [1, 1.035, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          VIGNETTE
      ========================================================== */}

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at center,
              transparent 42%,
              rgba(29,42,38,0.035) 100%
            )
          `,
        }}
      />

      {/* =========================================================
          TOP / BOTTOM ATMOSPHERIC FADES
      ========================================================== */}

      <div
        className="absolute top-0 inset-x-0 h-40"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,241,232,0.48), transparent)',
        }}
      />

      <div
        className="absolute bottom-0 inset-x-0 h-40"
        style={{
          background:
            'linear-gradient(to top, rgba(245,241,232,0.48), transparent)',
        }}
      />

      {/* =========================================================
          MOBILE-SPECIFIC ATMOSPHERE
      ========================================================== */}

      <div className="absolute inset-0 lg:hidden">

        {/* Mobile sage field */}
        <motion.div
          className="absolute
            -top-[150px]
            -left-[170px]
            w-[470px]
            h-[470px]
            rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(47,93,80,0.15) 0%, rgba(47,93,80,0.045) 48%, transparent 72%)',
            filter: 'blur(30px)',
          }}
          animate={{
            x: [0, 14, 0],
            y: [0, 10, 0],
            scale: [1, 1.035, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Mobile terracotta field */}
        <motion.div
          className="absolute
            top-[42%]
            -right-[185px]
            w-[500px]
            h-[500px]
            rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(217,119,69,0.12) 0%, rgba(217,119,69,0.035) 50%, transparent 73%)',
            filter: 'blur(32px)',
          }}
          animate={{
            x: [0, -12, 0],
            y: [0, -10, 0],
            scale: [1.02, 0.97, 1.02],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Mobile central glow */}
        <div
          className="absolute
            top-[68%]
            left-1/2
            -translate-x-1/2
            w-[360px]
            h-[360px]
            rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(47,93,80,0.045) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Slightly tighter mobile grid */}
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(47,93,80,0.065) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(47,93,80,0.065) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '44px 44px',
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
