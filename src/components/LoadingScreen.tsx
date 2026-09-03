import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const loadingDuration = 2000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, []);

  const bars = [32, 52, 42, 68, 58, 82, 72];

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
          {/* Subtle background atmosphere */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
            className="absolute h-72 w-72 rounded-full bg-[#2F5D50]/[0.06] blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Data Analysis Visual */}
            <div className="relative mb-7 flex h-20 w-28 items-end justify-center gap-1.5">
              {/* Baseline */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[#DDD6C8]" />

              {/* Animated Bars */}
              {bars.map((height, index) => (
                <motion.div
                  key={index}
                  initial={{
                    height: 4,
                    opacity: 0.25,
                  }}
                  animate={{
                    height: `${height}%`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`w-2.5 rounded-t-sm ${
                    index === 5
                      ? 'bg-[#D97745]'
                      : 'bg-[#2F5D50]'
                  }`}
                />
              ))}

              {/* Trend Indicator */}
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
                  duration: 2,
                  ease: 'easeOut',
                }}
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#DDD6C8] bg-[#FCFAF6]"
              >
                <TrendingUp className="h-3.5 w-3.5 text-[#2F5D50]" />
              </motion.div>

              {/* Analysis Icon */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 2,
                  delay: 0.15,
                  ease: 'easeOut',
                }}
                className="absolute -left-2 bottom-1 flex h-6 w-6 items-center justify-center rounded-md bg-[#FCFAF6]"
              >
                <BarChart3 className="h-3.5 w-3.5 text-[#2F5D50]" />
              </motion.div>
            </div>

            {/* Name */}
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
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#1D2A26]">
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

            {/* Progress Bar */}
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
