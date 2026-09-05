import { motion, useScroll, useTransform } from 'motion/react';

const dataPaths = [
  {
    id: 'path-1',
    d: 'M -80 190 C 120 70, 220 300, 410 180 S 680 80, 860 210 S 1120 330, 1320 150',
    color: '#2F5D50',
    width: 1.2,
  },
  {
    id: 'path-2',
    d: 'M -100 620 C 150 470, 280 720, 500 570 S 780 430, 980 600 S 1190 760, 1380 560',
    color: '#2F5D50',
    width: 0.9,
  },
  {
    id: 'path-3',
    d: 'M 80 1120 C 260 960, 390 1180, 580 1040 S 850 870, 1040 1040 S 1250 1190, 1400 1000',
    color: '#D97745',
    width: 0.9,
  },
  {
    id: 'path-4',
    d: 'M 720 -80 C 610 160, 850 250, 730 470 S 580 720, 760 890 S 940 1120, 820 1320',
    color: '#2F5D50',
    width: 0.65,
  },
];

const nodes = [
  { x: 120, y: 150, r: 3, color: '#2F5D50' },
  { x: 410, y: 180, r: 4, color: '#D97745' },
  { x: 680, y: 125, r: 2.5, color: '#2F5D50' },
  { x: 860, y: 210, r: 3.5, color: '#D97745' },
  { x: 1120, y: 300, r: 2.5, color: '#2F5D50' },

  { x: 180, y: 550, r: 2.5, color: '#D97745' },
  { x: 500, y: 570, r: 4, color: '#2F5D50' },
  { x: 780, y: 450, r: 2.5, color: '#2F5D50' },
  { x: 980, y: 600, r: 4, color: '#D97745' },
  { x: 1210, y: 690, r: 2.5, color: '#2F5D50' },

  { x: 260, y: 990, r: 3, color: '#2F5D50' },
  { x: 580, y: 1040, r: 4, color: '#D97745' },
  { x: 850, y: 900, r: 2.5, color: '#2F5D50' },
  { x: 1040, y: 1040, r: 4, color: '#D97745' },
  { x: 1250, y: 1130, r: 2.5, color: '#2F5D50' },

  { x: 720, y: 250, r: 2.5, color: '#D97745' },
  { x: 730, y: 470, r: 3, color: '#2F5D50' },
  { x: 760, y: 890, r: 3.5, color: '#D97745' },
];

const labels = [
  { x: 135, y: 135, text: '01' },
  { x: 425, y: 165, text: 'DATA' },
  { x: 690, y: 110, text: '%' },
  { x: 875, y: 195, text: '→' },
  { x: 1128, y: 285, text: '10' },

  { x: 195, y: 535, text: 'Σ' },
  { x: 515, y: 555, text: '02' },
  { x: 795, y: 435, text: '→' },
  { x: 995, y: 585, text: '%' },

  { x: 275, y: 975, text: '03' },
  { x: 595, y: 1025, text: 'AI' },
  { x: 865, y: 885, text: 'Σ' },
  { x: 1055, y: 1025, text: '→' },
  { x: 1265, y: 1115, text: '04' },
];

function FlowingDot({
  pathId,
  color,
  delay,
  duration,
}: {
  pathId: string;
  color: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.circle
      r="2.4"
      fill={color}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.85, 0.85, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={dataPaths.find((item) => item.id === pathId)?.d}
      />
    </motion.circle>
  );
}

export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();

  const networkY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const labelsY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const atmosphereY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#F5F1E8]" />

      {/* Soft light behind the network */}
      <motion.div
        className="absolute -top-[300px] left-[5%] h-[900px] w-[900px] rounded-full"
        style={{
          y: atmosphereY,
          background:
            'radial-gradient(circle, rgba(47,93,80,0.12) 0%, rgba(47,93,80,0.045) 42%, transparent 72%)',
          filter: 'blur(55px)',
        }}
      />

      <motion.div
        className="absolute top-[28%] -right-[300px] h-[900px] w-[900px] rounded-full"
        style={{
          y: atmosphereY,
          background:
            'radial-gradient(circle, rgba(217,119,69,0.10) 0%, rgba(217,119,69,0.035) 44%, transparent 72%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main data landscape */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: networkY,
        }}
      >
        <svg
          viewBox="0 0 1320 1320"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient
              id="sageFlow"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#2F5D50" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#2F5D50" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#2F5D50" stopOpacity="0.06" />
            </linearGradient>

            <linearGradient
              id="orangeFlow"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#D97745" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#D97745" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#D97745" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Data paths */}
          {dataPaths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              fill="none"
              stroke={
                path.color === '#D97745'
                  ? 'url(#orangeFlow)'
                  : 'url(#sageFlow)'
              }
              strokeWidth={path.width}
              strokeLinecap="round"
              strokeDasharray="2 10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0.18, 0.48, 0.18],
              }}
              transition={{
                pathLength: {
                  duration: 3,
                  ease: 'easeOut',
                },
                opacity: {
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            />
          ))}

          {/* Secondary solid traces */}
          <path
            d="M 0 350 C 180 280 270 390 440 330 S 720 240 900 350 S 1140 420 1320 300"
            fill="none"
            stroke="#2F5D50"
            strokeOpacity="0.09"
            strokeWidth="1"
            strokeDasharray="1 14"
          />

          <path
            d="M 0 820 C 180 730 320 860 490 790 S 760 680 930 790 S 1160 890 1320 760"
            fill="none"
            stroke="#D97745"
            strokeOpacity="0.075"
            strokeWidth="1"
            strokeDasharray="1 16"
          />

          {/* Nodes */}
          {nodes.map((node, index) => (
            <g key={`${node.x}-${node.y}`}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r * 3.5}
                fill={node.color}
                opacity="0.04"
                animate={{
                  opacity: [0.02, 0.09, 0.02],
                  r: [node.r * 2.5, node.r * 4, node.r * 2.5],
                }}
                transition={{
                  duration: 3 + (index % 4),
                  delay: index * 0.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="#F5F1E8"
                stroke={node.color}
                strokeWidth="1"
                opacity="0.48"
              />

              <circle
                cx={node.x}
                cy={node.y}
                r={Math.max(node.r * 0.38, 0.8)}
                fill={node.color}
                opacity="0.7"
              />
            </g>
          ))}

          {/* Moving data */}
          <FlowingDot
            pathId="path-1"
            color="#2F5D50"
            delay={0}
            duration={12}
          />

          <FlowingDot
            pathId="path-1"
            color="#D97745"
            delay={5}
            duration={15}
          />

          <FlowingDot
            pathId="path-2"
            color="#2F5D50"
            delay={2}
            duration={14}
          />

          <FlowingDot
            pathId="path-3"
            color="#D97745"
            delay={4}
            duration={13}
          />

          <FlowingDot
            pathId="path-4"
            color="#2F5D50"
            delay={1}
            duration={11}
          />
        </svg>
      </motion.div>

      {/* Data labels */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: labelsY,
        }}
      >
        {labels.map((label, index) => (
          <motion.span
            key={`${label.text}-${index}`}
            className="absolute font-mono text-[8px] tracking-[0.18em] text-[#2F5D50]"
            style={{
              left: `${(label.x / 1320) * 100}%`,
              top: `${(label.y / 1320) * 100}%`,
            }}
            animate={{
              opacity: [0.08, 0.22, 0.08],
            }}
            transition={{
              duration: 5 + (index % 3),
              delay: index * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {label.text}
          </motion.span>
        ))}
      </motion.div>

      {/* A few highlighted signal points */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute left-[31%] top-[13%] h-2 w-2 rounded-full bg-[#D97745]"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute right-[27%] top-[47%] h-1.5 w-1.5 rounded-full bg-[#2F5D50]"
          animate={{
            scale: [1, 1.7, 1],
            opacity: [0.25, 0.6, 0.25],
          }}
          transition={{
            duration: 5,
            delay: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute left-[43%] top-[78%] h-2 w-2 rounded-full bg-[#D97745]"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.65, 0.3],
          }}
          transition={{
            duration: 4.5,
            delay: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Very light paper grain */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(29,42,38,0.18) 0.45px, transparent 0.65px)',
          backgroundSize: '6px 6px',
        }}
      />

      {/* Keep the center readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at center, rgba(245,241,232,0.58) 0%, rgba(245,241,232,0.22) 48%, transparent 78%)',
        }}
      />

      {/* Gentle edge depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(29,42,38,0.045) 100%)',
        }}
      />

      {/* Top and bottom fades */}
      <div
        className="absolute inset-x-0 top-0 h-40 sm:h-56"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,241,232,0.72), transparent)',
        }}
      />

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
