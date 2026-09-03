import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp } from 'lucide-react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  // Total loading duration: 3 seconds
  const loadingDuration = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, []);

  const rows = [
    { month: 'JAN', revenue: '24,500', growth: '+8.2%' },
    { month: 'FEB', revenue: '27,300', growth: '+11.4%' },
    { month: 'MAR', revenue: '31,800', growth: '+16.5%' },
    { month: 'APR', revenue: '29,400', growth: '+9.8%' },
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
          {/* Subtle background atmosphere */}
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
            {/* Data Table */}
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
                scale: 0.98,
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
              className="mb-6 w-[280px] overflow-hidden rounded-xl border border-[#DDD6C8] bg-[#FCFAF6] shadow-[0_8px_30px_rgba(47,93,80,0.06)]"
            >
              {/* Table Header */}
              <div className="grid grid-cols-3 border-b border-[#DDD6C8] bg-[#F5F1E8]/70 px-4 py-2.5 text-[9px] font-semibold tracking-[0.12em] text-[#6B7280]">
                <span>MONTH</span>

                <span className="text-right">
                  REVENUE
                </span>

                <span className="text-right">
                  GROWTH
                </span>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-[#DDD6C8]/70">
                {rows.map((row, index) => (
                  <motion.div
                    key={row.month}
                    initial={{
                      opacity: 0,
                      x: -12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.12,
                      ease: 'easeOut',
                    }}
                    className={`relative grid grid-cols-3 px-4 py-2.5 text-[11px] ${
                      index === 2
                        ? 'bg-[#2F5D50]/[0.055]'
                        : 'bg-transparent'
                    }`}
                  >
                    {/* Insight highlight sweep */}
                    {index === 2 && (
                      <motion.div
                        initial={{
                          scaleX: 0,
                          opacity: 0,
                        }}
                        animate={{
                          scaleX: 1,
                          opacity: 1,
                        }}
                        transition={{
                          duration: 3,
                          delay: 0.4,
                          ease: 'easeOut',
                        }}
                        className="absolute inset-0 origin-left bg-[#D97745]/[0.06]"
                      />
                    )}

                    <span className="relative z-10 font-medium text-[#4B5563]">
                      {row.month}
                    </span>

                    <span className="relative z-10 text-right font-mono text-[#1D2A26]">
                      {row.revenue}
                    </span>

                    <span
                      className={`relative z-10 text-right font-mono ${
                        index === 2
                          ? 'font-semibold text-[#D97745]'
                          : 'text-[#6B7280]'
                      }`}
                    >
                      {row.growth}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Insight */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 3,
                delay: 0.8,
                ease: 'easeOut',
              }}
              className="mb-5 flex items-center gap-2 rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] px-3 py-2"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#2F5D50]/[0.08]">
                <TrendingUp className="h-3.5 w-3.5 text-[#2F5D50]" />
              </div>

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#6B7280]">
                  Insight detected
                </p>

                <p className="mt-0.5 font-mono text-xs font-semibold text-[#1D2A26]">
                  Growth +16.5%
                </p>
              </div>
            </motion.div>

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
                delay: 1,
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
                  Analyzing data...
                </span>
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
