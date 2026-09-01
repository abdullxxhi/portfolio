import { motion } from 'motion/react';
import {
  Bot,
  BarChart3,
  Database,
  Code,
  FileSpreadsheet,
  Cpu
} from 'lucide-react';

export default function BackgroundEffects() {
  const floatingIcons = [
    { Icon: Bot, top: '14%', left: '7%', delay: 0 },
    { Icon: BarChart3, top: '32%', left: '91%', delay: 1.5 },
    { Icon: Database, top: '54%', left: '4%', delay: 2.5 },
    { Icon: FileSpreadsheet, top: '73%', left: '89%', delay: 1 },
    { Icon: Code, top: '22%', left: '84%', delay: 3 },
    { Icon: Cpu, top: '84%', left: '11%', delay: 2 }
  ];

  const particles = [
    { top: '17%', left: '23%', delay: 0 },
    { top: '27%', left: '61%', delay: 1 },
    { top: '39%', left: '44%', delay: 2 },
    { top: '49%', left: '78%', delay: 0.5 },
    { top: '63%', left: '19%', delay: 1.8 },
    { top: '69%', left: '63%', delay: 2.5 },
    { top: '81%', left: '38%', delay: 1.2 },
    { top: '89%', left: '74%', delay: 3 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* =========================================================
          BASE ATMOSPHERE
      ========================================================== */}

      <div className="absolute inset-0 bg-[#F5F1E8]" />

      {/* Large green atmospheric glow */}
      <motion.div
        className="absolute -top-[260px] -left-[220px] w-[760px] h-[760px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(47,93,80,0.16) 0%, rgba(47,93,80,0.07) 35%, transparent 70%)',
          filter: 'blur(20px)'
        }}
        animate={{
          x: [0, 35, 0],
          y: [0, 25, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Large orange atmospheric glow */}
      <motion.div
        className="absolute top-[18%] -right-[260px] w-[720px] h-[720px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(217,119,69,0.15) 0%, rgba(217,119,69,0.06) 38%, transparent 72%)',
          filter: 'blur(25px)'
        }}
        animate={{
          x: [0, -35, 0],
          y: [0, 35, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          delay: 2,
          ease: 'easeInOut'
        }}
      />

      {/* Middle green glow */}
      <motion.div
        className="absolute top-[45%] left-[28%] w-[520px] h-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(47,93,80,0.08) 0%, transparent 68%)',
          filter: 'blur(35px)'
        }}
        animate={{
          x: [0, -25, 20, 0],
          y: [0, 20, -15, 0]
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Bottom orange glow */}
      <motion.div
        className="absolute -bottom-[300px] right-[18%] w-[650px] h-[650px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(217,119,69,0.09) 0%, transparent 68%)',
          filter: 'blur(30px)'
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -25, 0]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          delay: 4,
          ease: 'easeInOut'
        }}
      />

      {/* =========================================================
          DIAGONAL LIGHT
      ========================================================== */}

      <motion.div
        className="absolute -top-[20%] left-[35%] w-[180px] h-[150%] rotate-[25deg]"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent)',
          filter: 'blur(50px)'
        }}
        animate={{
          x: ['-35vw', '65vw']
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* =========================================================
          TECH GRID
      ========================================================== */}

      <div
        className="absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(47,93,80,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(47,93,80,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px'
        }}
      />

      {/* Larger secondary grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217,119,69,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,119,69,0.18) 1px, transparent 1px)
          `,
          backgroundSize: '156px 156px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '156px 156px']
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* =========================================================
          GLOWING GRID INTERSECTIONS
      ========================================================== */}

      <div className="absolute inset-0 hidden lg:block">
        <motion.div
          className="absolute top-[20%] left-[20%] w-2 h-2 rounded-full bg-[#2F5D50]/50"
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.4, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        <motion.div
          className="absolute top-[42%] left-[72%] w-2 h-2 rounded-full bg-[#D97745]/50"
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.4, 0.8]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1,
            ease: 'easeInOut'
          }}
        />

        <motion.div
          className="absolute top-[70%] left-[30%] w-2 h-2 rounded-full bg-[#2F5D50]/40"
          animate={{
            opacity: [0.2, 0.7, 0.2],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: 2,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* =========================================================
          FLOATING PARTICLES
      ========================================================== */}

      {particles.map(({ top, left, delay }, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute hidden md:block"
          style={{ top, left }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.15, 0.55, 0.15]
          }}
          transition={{
            duration: 5 + (index % 3),
            repeat: Infinity,
            delay,
            ease: 'easeInOut'
          }}
        >
          <div
            className={`rounded-full ${
              index % 3 === 0
                ? 'w-2 h-2 bg-[#D97745]/35'
                : 'w-1.5 h-1.5 bg-[#2F5D50]/35'
            }`}
          />
        </motion.div>
      ))}

      {/* =========================================================
          FLOATING TECH ICONS
      ========================================================== */}

      {floatingIcons.map(
        ({ Icon, top, left, delay }, index) => (
          <motion.div
            key={`icon-${index}`}
            className="absolute hidden lg:block text-[#2F5D50]/20"
            style={{ top, left }}
            animate={{
              y: [0, -14, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.12, 0.28, 0.12]
            }}
            transition={{
              duration: 8 + (index % 3),
              repeat: Infinity,
              delay,
              ease: 'easeInOut'
            }}
          >
            <Icon className="w-8 h-8" />
          </motion.div>
        )
      )}

      {/* =========================================================
          SUBTLE NETWORK CONNECTIONS
      ========================================================== */}

      <svg
        className="absolute inset-0 w-full h-full hidden xl:block opacity-[0.16]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M12 25 C25 15, 35 38, 48 25 S70 15, 88 30"
          fill="none"
          stroke="#2F5D50"
          strokeWidth="0.12"
          strokeDasharray="1 2"
          animate={{
            strokeDashoffset: [0, -10]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        <motion.path
          d="M8 65 C25 50, 40 75, 55 58 S75 50, 94 70"
          fill="none"
          stroke="#D97745"
          strokeWidth="0.1"
          strokeDasharray="1 2"
          animate={{
            strokeDashoffset: [0, -10]
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </svg>

      {/* =========================================================
          EDGE DEPTH
      ========================================================== */}

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 45%, rgba(29,42,38,0.035) 100%)'
        }}
      />

      {/* Top soft fade */}
      <div
        className="absolute top-0 left-0 right-0 h-40"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,241,232,0.35), transparent)'
        }}
      />

      {/* Bottom soft fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background:
            'linear-gradient(to top, rgba(245,241,232,0.35), transparent)'
        }}
      />
    </div>
  );
}
