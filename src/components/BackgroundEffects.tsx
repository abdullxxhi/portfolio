import { motion, useScroll, useTransform } from 'motion/react';

const chartLines = [
  {
    id: 'line-1',
    d: 'M -40 250 C 90 210, 150 285, 260 245 S 430 150, 560 205 S 730 310, 870 220 S 1080 125, 1360 190',
    color: '#2F5D50',
    width: 1.5,
  },
  {
    id: 'line-2',
    d: 'M -40 500 C 110 445, 210 535, 340 480 S 510 385, 650 455 S 830 565, 970 490 S 1150 395, 1360 450',
    color: '#D97745',
    width: 1.1,
  },
  {
    id: 'line-3',
    d: 'M -40 790 C 120 720, 230 835, 390 770 S 600 655, 760 735 S 930 850, 1080 760 S 1230 665, 1360 720',
    color: '#2F5D50',
    width: 1.2,
  },
  {
    id: 'line-4',
    d: 'M -40 1060 C 130 1000, 250 1090, 400 1035 S 600 930, 760 1010 S 920 1125, 1090 1035 S 1240 950, 1360 1010',
    color: '#D97745',
    width: 0.9,
  },
];

const secondaryLines = [
  'M -40 335 C 120 290, 210 365, 350 320 S 570 235, 720 305 S 920 400, 1080 325 S 1230 250, 1360 300',
  'M -40 640 C 100 590, 240 680, 380 625 S 590 540, 740 610 S 930 710, 1100 630 S 1250 560, 1360 600',
  'M -40 910 C 120 860, 260 945, 410 895 S 610 810, 780 875 S 960 970, 1110 900 S 1240 820, 1360 860',
];

const chartPoints = [
  { x: 120, y: 226, color: '#2F5D50', label: '01' },
  { x: 260, y: 245, color: '#D97745', label: '↑' },
  { x: 560, y: 205, color: '#2F5D50', label: 'DATA' },
  { x: 870, y: 220, color: '#D97745', label: '%' },
  { x: 1080, y: 125, color: '#2F5D50', label: '02' },

  { x: 210, y: 535, color: '#2F5D50', label: 'Σ' },
  { x: 340, y: 480, color: '#D97745', label: '↑' },
  { x: 650, y: 455, color: '#2F5D50', label: '03' },
  { x: 970, y: 490, color: '#D97745', label: '%' },

  { x: 230, y: 835, color: '#D97745', label: '04' },
  { x: 390, y: 770, color: '#2F5D50', label: 'Σ' },
  { x: 760, y: 735, color: '#D97745', label: '↑' },
  { x: 1080, y: 760, color: '#2F5D50', label: 'AI' },

  { x: 250, y: 1090, color: '#2F5D50', label: '05' },
  { x: 400, y: 1035, color: '#D97745', label: '%' },
  { x: 760, y: 1010, color: '#2F5D50', label: 'Σ' },
  { x: 1090, y: 1035, color: '#D97745', label: '→' },
];

function AnimatedPoint({
  x,
  y,
  color,
  index,
}: {
  x: number;
  y: number;
  color: string;
  index: number;
}) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        fill={color}
        initial={{ opacity: 0.03, r: 7 }}
        animate={{
          opacity: [0.02, 0.10, 0.02],
          r: [7, 13, 7],
        }}
        transition={{
          duration: 4 + (index % 3),
          delay: index * 0.22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <circle
        cx={x}
        cy={y}
        r="3.2"
        fill="#F5F1E8"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.72"
      />

      <circle
        cx={x}
        cy={y}
        r="1.15"
        fill={color}
        opacity="0.9"
      />
    </g>
  );
}

function MovingSignal({
  path,
  color,
  duration,
  delay,
}: {
  path: string;
  color: string;
  duration: number;
  delay: number;
}) {
  return (
    <circle
      r="3"
      fill={color}
      opacity="0.8"
    >
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={path}
      />
      <animate
        attributeName="opacity"
        values="0;0.9;0.9;0"
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();

  const landscapeY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const labelsY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#F5F1E8]" />

      {/* Warm editorial lighting */}
      <motion.div
        className="absolute -top-[320px] left-[8%] h-[850px] w-[850px] rounded-full"
        style={{
          y: glowY,
          background:
            'radial-gradient(circle, rgba(47,93,80,0.14) 0%, rgba(47,93,80,0.055) 38%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        className="absolute top-[35%] -right-[280px] h-[820px] w-[820px] rounded-full"
        style={{
          y: glowY,
          background:
            'radial-gradient(circle, rgba(217,119,69,0.12) 0%, rgba(217,119,69,0.045) 40%, transparent 70%)',
          filter: 'blur(65px)',
        }}
      />

      {/* Main abstract data landscape */}
      <motion.div
        className="absolute inset-0"
        style={{ y: landscapeY }}
      >
        <svg
          viewBox="0 0 1320 1320"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient
              id="mainSageLine"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#2F5D50" stopOpacity="0.03" />
              <stop offset="20%" stopColor="#2F5D50" stopOpacity="0.20" />
              <stop offset="50%" stopColor="#2F5D50" stopOpacity="0.52" />
              <stop offset="80%" stopColor="#2F5D50" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#2F5D50" stopOpacity="0.03" />
            </linearGradient>

            <linearGradient
              id="mainOrangeLine"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#D97745" stopOpacity="0.025" />
              <stop offset="20%" stopColor="#D97745" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#D97745" stopOpacity="0.46" />
              <stop offset="80%" stopColor="#D97745" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#D97745" stopOpacity="0.025" />
            </linearGradient>

            <filter id="pointGlow">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Fine secondary curves */}
          {secondaryLines.map((path, index) => (
            <path
              key={`secondary-${index}`}
              d={path}
              fill="none"
              stroke={index % 2 === 0 ? '#2F5D50' : '#D97745'}
              strokeWidth="0.7"
              strokeOpacity="0.08"
              strokeDasharray="1 15"
              strokeLinecap="round"
            />
          ))}

          {/* Main flowing chart curves */}
          {chartLines.map((line, index) => (
            <motion.path
              key={line.id}
              d={line.d}
              fill="none"
              stroke={
                line.color === '#D97745'
                  ? 'url(#mainOrangeLine)'
                  : 'url(#mainSageLine)'
              }
              strokeWidth={line.width}
              strokeLinecap="round"
              strokeDasharray="1 8"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: [0.35, 0.72, 0.35],
              }}
              transition={{
                pathLength: {
                  duration: 2.8 + index * 0.35,
                  ease: 'easeOut',
                },
                opacity: {
                  duration: 7 + index,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            />
          ))}

          {/* Soft underlying versions of the curves */}
          {chartLines.map((line) => (
            <path
              key={`${line.id}-soft`}
              d={line.d}
              fill="none"
              stroke={line.color}
              strokeWidth="9"
              strokeOpacity="0.018"
              filter="url(#pointGlow)"
            />
          ))}

          {/* Data points */}
          {chartPoints.map((point, index) => (
            <AnimatedPoint
              key={`${point.x}-${point.y}`}
              x={point.x}
              y={point.y}
              color={point.color}
              index={index}
            />
          ))}

          {/* Moving signals */}
          <MovingSignal
            path={chartLines[0].d}
            color="#2F5D50"
            duration={14}
            delay={0}
          />

          <MovingSignal
            path={chartLines[0].d}
            color="#D97745"
            duration={18}
            delay={7}
          />

          <MovingSignal
            path={chartLines[1].d}
            color="#D97745"
            duration={16}
            delay={3}
          />

          <MovingSignal
            path={chartLines[2].d}
            color="#2F5D50"
            duration={17}
            delay={5}
          />

          <MovingSignal
            path={chartLines[3].d}
            color="#D97745"
            duration={19}
            delay={2}
          />
        </svg>
      </motion.div>

      {/* Tiny analytical labels */}
      <motion.div
        className="absolute inset-0"
        style={{ y: labelsY }}
      >
        {chartPoints.map((point, index) => (
          <motion.span
            key={`${point.label}-${index}`}
            className="absolute font-mono text-[8px] tracking-[0.18em]"
            style={{
              left: `${(point.x / 1320) * 100}%`,
              top: `${(point.y / 1320) * 100}%`,
              color: point.color,
              transform: 'translate(8px, -14px)',
            }}
            animate={{
              opacity: [0.08, 0.3, 0.08],
            }}
            transition={{
              duration: 5 + (index % 4),
              delay: index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {point.label}
          </motion.span>
        ))}
      </motion.div>

      {/* A subtle statistical axis */}
      <div
        className="absolute left-[7%] right-[7%] top-1/2 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(47,93,80,0.08) 18%, rgba(47,93,80,0.12) 50%, rgba(217,119,69,0.07) 82%, transparent)',
        }}
      />

      {/* Central readability veil */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 48% 68% at center, rgba(245,241,232,0.72) 0%, rgba(245,241,232,0.42) 45%, rgba(245,241,232,0.08) 75%, transparent 100%)',
        }}
      />

      {/* Soft paper grain */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(29,42,38,0.18) 0.45px, transparent 0.65px)',
          backgroundSize: '6px 6px',
        }}
      />

      {/* Edge depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(29,42,38,0.045) 100%)',
        }}
      />

      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-44 sm:h-60"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,241,232,0.78), transparent)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 sm:h-60"
        style={{
          background:
            'linear-gradient(to top, rgba(245,241,232,0.78), transparent)',
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
