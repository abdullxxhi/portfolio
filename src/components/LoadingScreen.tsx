import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp } from 'lucide-react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const loadingDuration = 2000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, []);

  const dataPoints = [
    { x: 4, y: 72 },
    { x: 18, y: 61 },
    { x: 31, y: 66 },
    { x: 45, y: 47 },
    { x: 59, y: 51 },
    { x: 73, y: 31 },
    { x: 88, y: 20 },
  ];

  const points = dataPoints
    .map((point) => `${point.x},${point.y}`)
    .join(' ');

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#F5F1E8] text-[#1D2A26]"
        >
          {/* Subtle atmosphere */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
            className="absolute h-72 w-72 rounded-full bg-[#2F5D50]/[0.05] blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Data Visualization */}
            <div className="relative mb-7 h-28 w-64">
              {/* Chart baseline */}
              <div className="absolute bottom-3 left-0 right-0 h-px bg-[#DDD6C8]" />

              {/* Chart area */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                {/* Horizontal reference lines */}
                <line
                  x1="0"
                  y1="25"
                  x2="100"
                  y2="25"
                  stroke="#DDD6C8"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                />

                <line
                  x1="0"
                  y1="50"
                  x2="100"
                  y2="50"
                  stroke="#DDD6C8"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                />

                <line
                  x1="0"
                  y1="75"
                  x2="100"
                  y2="75"
                  stroke="#DDD6C8"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                />

                {/* Animated trend line */}
                <motion.polyline
                  points={points}
                  fill="none"
                  stroke="#2F5D50"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{
                    pathLength: 0,
                  }}
                  animate={{
                    pathLength: 1,
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                  }}
                />
              </svg>

              {/* Data points */}
              {dataPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.18,
                    ease: 'easeOut',
                  }}
                  className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F5F1E8] bg-[#2F5D50]"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                  }}
                />
              ))}

              {/* Final trend indicator */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 1.35,
                  ease: 'easeOut',
                }}
                className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#DDD6C8] bg-[#FCFAF6]"
              >
                <TrendingUp className="h-4 w-4 text-[#2F5D50]" />
              </motion.div>
            </div>

            {/* Name + status */}
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 2,
                ease: 'easeOut',
              }}
              className="text-center"
            >
              <h2 className="font-display text-xl font-bold tracking-tight text-[#1D2A26] sm:text-2xl">
                ABDULLAHI ✯ ABDULSALAM
              </h2>

              <div className="mt-2 flex items-center justify-center gap-2 text-xs font-mono text-[#6B7280]">
                <motion.span
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-[#2F5D50]"
                />

                <span>Analyzing data...</span>
              </div>
            </motion.div>

            {/* Progress */}
            <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-[#DDD6C8]">
              <motion.div
                initial={{
                  width: '0%',
                }}
                animate={{
                  width: '100%',
                }}
                transition={{
                  duration: 2,
                  ease: 'linear',
                }}
                className="h-full rounded-full bg-[#2F5D50]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
