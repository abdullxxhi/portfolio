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
    { Icon: Bot, top: '15%', left: '8%', delay: 0, duration: 9 },
    { Icon: BarChart3, top: '35%', left: '92%', delay: 1.5, duration: 10 },
    { Icon: Database, top: '55%', left: '5%', delay: 2.5, duration: 8 },
    { Icon: FileSpreadsheet, top: '75%', left: '88%', delay: 1, duration: 11 },
    { Icon: Code, top: '25%', left: '82%', delay: 3, duration: 9 },
    { Icon: Cpu, top: '85%', left: '12%', delay: 2, duration: 10 }
  ];

  const particles = [
    { top: '12%', left: '18%', delay: 0 },
    { top: '22%', left: '67%', delay: 1.2 },
    { top: '31%', left: '42%', delay: 2.4 },
    { top: '44%', left: '76%', delay: 0.8 },
    { top: '53%', left: '23%', delay: 3 },
    { top: '64%', left: '58%', delay: 1.8 },
    { top: '73%', left: '35%', delay: 2.7 },
    { top: '82%', left: '71%', delay: 0.5 },
    { top: '91%', left: '46%', delay: 3.5 }
  ];

  const networkNodes = [
    { top: '18%', left: '30%' },
    { top: '29%', left: '57%' },
    { top: '47%', left: '34%' },
    { top: '61%', left: '69%' },
    { top: '78%', left: '52%' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-noise">

      {/* =========================================================
          AMBIENT GLOW
      ========================================================== */}

      {/* Primary green/orange glow */}
      <motion.div
        className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#2F5D50]/12 to-[#D97745]/8 blur-[120px]"
        animate={{
          scale: [1, 1.08, 1],
          x: [0, 20, 0],
          y: [0, 15, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Secondary terracotta glow */}
      <motion.div
        className="absolute top-[38%] -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#D97745]/10 to-[#2F5D50]/8 blur-[140px]"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -25, 0],
          y: [0, 20, 0],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          delay: 3,
          ease: 'easeInOut'
        }}
      />

      {/* Bottom green glow */}
      <motion.div
        className="absolute bottom-[-100px] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-t from-[#2F5D50]/10 to-transparent blur-[140px]"
        animate={{
          scale: [1, 1.06, 1],
          x: [0, -15, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          delay: 2,
          ease: 'easeInOut'
        }}
      />

      {/* Small central warm glow */}
      <motion.div
        className="absolute top-[18%] left-[48%] w-[280px] h-[280px] rounded-full bg-[#D97745]/5 blur-[110px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 1,
          ease: 'easeInOut'
        }}
      />

      {/* =========================================================
          MOVING GRID
      ========================================================== */}

      <motion.div
        className="absolute inset-[-48px] opacity-[0.20]"
        animate={{
          x: [0, 48, 0],
          y: [0, 48, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: `
            linear-gradient(#DDD6C8 1px, transparent 1px),
            linear-gradient(to right, #DDD6C8 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Soft grid fade */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          background:
            'radial-gradient(circle at center, transparent 20%, #F5F1E8 95%)'
        }}
      />

      {/* =========================================================
          FLOATING PARTICLES
      ========================================================== */}

      {particles.map(({ top, left, delay }, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute hidden sm:block"
          style={{ top, left }}
          animate={{
            y: [0, -12, 0],
            x: [0, 6, 0],
            opacity: [0.15, 0.45, 0.15],
            scale: [0.8, 1.15, 0.8]
          }}
          transition={{
            duration: 6 + (index % 3),
            repeat: Infinity,
            delay,
            ease: 'easeInOut'
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#2F5D50]/40" />
        </motion.div>
      ))}

      {/* =========================================================
          SUBTLE DATA NETWORK
      ========================================================== */}

      <div className="absolute inset-0 hidden lg:block opacity-[0.18]">

        {/* Connecting lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.line
            x1="30"
            y1="18"
            x2="57"
            y2="29"
            stroke="#2F5D50"
            strokeWidth="0.12"
            strokeDasharray="1 1"
            animate={{
              strokeDashoffset: [0, -4]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          <motion.line
            x1="57"
            y1="29"
            x2="34"
            y2="47"
            stroke="#D97745"
            strokeWidth="0.12"
            strokeDasharray="1 1"
            animate={{
              strokeDashoffset: [0, -4]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          <motion.line
            x1="34"
            y1="47"
            x2="69"
            y2="61"
            stroke="#2F5D50"
            strokeWidth="0.12"
            strokeDasharray="1 1"
            animate={{
              strokeDashoffset: [0, -4]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          <motion.line
            x1="69"
            y1="61"
            x2="52"
            y2="78"
            stroke="#D97745"
            strokeWidth="0.12"
            strokeDasharray="1 1"
            animate={{
              strokeDashoffset: [0, -4]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </svg>

        {/* Network nodes */}
        {networkNodes.map(({ top, left }, index) => (
          <motion.div
            key={`node-${index}`}
            className="absolute"
            style={{ top, left }}
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.25, 0.65, 0.25]
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              delay: index * 0.7,
              ease: 'easeInOut'
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#2F5D50] shadow-[0_0_12px_rgba(47,93,80,0.35)]" />
          </motion.div>
        ))}
      </div>

      {/* =========================================================
          FLOATING TECHNOLOGY ICONS
      ========================================================== */}

      {floatingIcons.map(
        ({ Icon, top, left, delay, duration }, index) => (
          <motion.div
            key={`icon-${index}`}
            className="absolute text-[#2F5D50]/20 hidden lg:block"
            style={{ top, left }}
            animate={{
              y: [0, -18, 0],
              x: [0, index % 2 === 0 ? 5 : -5, 0],
              rotate: [0, 8, -8, 0],
              opacity: [0.12, 0.3, 0.12],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration,
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
          EDGE VIGNETTE
      ========================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, transparent 55%, rgba(29,42,38,0.025) 100%)'
        }}
      />
    </div>
  );
}
