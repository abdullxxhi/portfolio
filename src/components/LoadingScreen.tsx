import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp } from 'lucide-react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const loadingDuration = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, []);

  const points = [
    { x: 12, y: 76 },
    { x: 21, y: 68 },
    { x: 29, y: 72 },
    { x: 38, y: 57 },
    { x: 46, y: 61 },
    { x: 55, y: 46 },
    { x: 64, y: 49 },
    { x: 73, y: 34 },
    { x: 82, y: 27 },
    { x: 91, y: 20 },
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#F5F1E8] text-[#1D2A26]"
        >
          {/* Background atmosphere */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 3,
              ease: 'easeOut',
            }}
            className="absolute h-72 w-72 rounded-full bg-[#2F5D50]/[0.05] blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Scatter Plot */}
            <div className="relative mb-7 h-40 w-64">
              {/* Y axis */}
              <div className="absolute bottom-0 left-0 top-0 w-px bg-[#DDD6C8]" />

              {/* X axis */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[#DDD6C8]" />

              {/* Grid */}
              <div className="absolute inset-0">
                <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-[#DDD6C8]/70" />
                <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#DDD6C8]/70" />
                <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-[#DDD6C8]/70" />

                <div className="absolute bottom-0 left-1/4 top-0 border-l border-dashed border-[#DDD6C8]/70" />
                <div className="absolute bottom-0 left-1/2 top-0 border-l border-dashed border-[#DDD6C8]/70" />
                <div className="absolute bottom-0 left-3/4 top-0 border-l border-dashed border-[#DDD6C8]/70" />
              </div>

              {/* Data points */}
              {points.map((point, index) => (
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
                    duration: 0.45,
                    delay: index * 0.16,
                    ease: 'easeOut',
                  }}
                  className="absolute h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-[#F5F1E8] bg-[#2F5D50]"
                  style={{
                    left: `${point.x}%`,
                    bottom: `${point.y}%`,
                  }}
                />
              ))}

              {/* Trend line */}
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <motion.line
                  x1="8"
                  y1="83"
                  x2="94"
                  y2="18"
                  stroke="#D97745"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={{
                    pathLength: 1,
                    opacity: 0.8,
                  }}
                  transition={{
                    duration: 3,
                    delay: 0.8,
                    ease: 'easeOut',
                  }}
                />
              </svg>

              {/* Trend indicator */}
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
                  duration: 0.6,
                  delay: 2,
                  ease: 'easeOut',
                }}
                className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#DDD6C8] bg-[#FCFAF6]"
              >
                <TrendingUp className="h-4 w-4 text-[#2F5D50]" />
              </motion.div>

              {/* Axis labels */}
              <span className="absolute -bottom-4 right-0 text-[7px] uppercase tracking-[0.1em] text-[#6B7280]">
                Variable X
              </span>

              <span className="absolute -left-5 top-0 -rotate-90 text-[7px] uppercase tracking-[0.1em] text-[#6B7280]">
                Variable Y
              </span>
            </div>

            {/* Name + Status */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 3,
                delay: 0.8,
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
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-[#2F5D50]"
                />

                <span>
                  Finding patterns in data...
                </span>
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
                  duration: 3,
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
