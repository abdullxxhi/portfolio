import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, BarChart3 } from 'lucide-react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const loadingDuration = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    {
      label: 'Records',
      value: 2481,
      suffix: '',
    },
    {
      label: 'Accuracy',
      value: 94.6,
      suffix: '%',
    },
    {
      label: 'Growth',
      value: 18.4,
      suffix: '%',
    },
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 3,
              ease: 'easeOut',
            }}
            className="absolute h-72 w-72 rounded-full bg-[#2F5D50]/[0.05] blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* KPI Panel */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 3,
                ease: 'easeOut',
              }}
              className="w-[290px] rounded-xl border border-[#DDD6C8] bg-[#FCFAF6] p-4 shadow-[0_8px_30px_rgba(47,93,80,0.06)]"
            >
              {/* Panel heading */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6B7280]">
                    Analysis
                  </p>

                  <p className="mt-1 text-xs font-medium text-[#1D2A26]">
                    Key performance indicators
                  </p>
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2F5D50]/[0.08]">
                  <BarChart3 className="h-3.5 w-3.5 text-[#2F5D50]" />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
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
                      delay: index * 0.15,
                      ease: 'easeOut',
                    }}
                    className="rounded-lg border border-[#DDD6C8] bg-[#F5F1E8]/45 p-2.5"
                  >
                    <p className="text-[8px] uppercase tracking-[0.08em] text-[#6B7280]">
                      {metric.label}
                    </p>

                    <motion.p
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: 3,
                        delay: 0.3 + index * 0.15,
                      }}
                      className="mt-1 font-mono text-sm font-semibold text-[#1D2A26]"
                    >
                      {metric.value}
                      {metric.suffix}
                    </motion.p>
                  </motion.div>
                ))}
              </div>

              {/* Trend */}
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
                  duration: 3,
                  delay: 0.7,
                  ease: 'easeOut',
                }}
                className="mt-3 flex items-center gap-2 border-t border-[#DDD6C8] pt-3"
              >
                <TrendingUp className="h-3.5 w-3.5 text-[#2F5D50]" />

                <span className="text-[10px] text-[#6B7280]">
                  Positive trend detected
                </span>

                <span className="ml-auto font-mono text-[10px] font-semibold text-[#2F5D50]">
                  +18.4%
                </span>
              </motion.div>
            </motion.div>

            {/* Name */}
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
              className="mt-6 text-center"
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
