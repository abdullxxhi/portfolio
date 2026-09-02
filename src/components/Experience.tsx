import { motion, useScroll, useTransform } from 'motion/react';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Sparkles,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  const { scrollYProgress } = useScroll();

  /*
   * The timeline progress moves with the page.
   * It is intentionally limited to transform/scaleY for performance.
   */
  const timelineScale = useTransform(
    scrollYProgress,
    [0.55, 0.82],
    [0, 1]
  );

  return (
    <section
      id="experience"
      className="py-24 relative z-10 bg-[#F5F1E8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="
            inline-flex
            items-center
            space-x-2
            px-3.5
            py-1.5
            rounded-full
            bg-[#FCFAF6]
            border
            border-[#DDD6C8]
            shadow-sm
          ">
            <Briefcase className="w-3.5 h-3.5 text-[#2F5D50]" />

            <span className="
              text-xs
              font-mono
              uppercase
              tracking-widest
              text-[#2F5D50]
              font-semibold
            ">
              CAREER TRACK
            </span>
          </div>

          <h2 className="
            text-3xl
            sm:text-4xl
            font-bold
            font-display
            text-[#1D2A26]
          ">
            Practical Experience
          </h2>

          <p className="text-base text-[#4B5563]">
            Hands-on technical work building real-world automation
            systems and data analytics solutions.
          </p>
        </motion.div>

        {/* =====================================================
            CAREER TIMELINE
        ====================================================== */}

        <div className="max-w-4xl mx-auto relative">

          {/* Timeline base */}
          <div
            className="
              absolute
              top-0
              bottom-0
              left-6
              sm:left-8
              w-px
              bg-[#DDD6C8]
            "
          />

          {/* Animated timeline progress */}
          <motion.div
            style={{
              scaleY: timelineScale,
              transformOrigin: 'top',
            }}
            className="
              absolute
              top-0
              bottom-0
              left-6
              sm:left-8
              w-[2px]
              bg-gradient-to-b
              from-[#2F5D50]
              via-[#D97745]
              to-[#2F5D50]
              will-change-transform
            "
          />

          {/* Timeline items */}
          <div className="space-y-14">

            {experienceData.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-16 sm:pl-20"
              >

                {/* =================================================
                    TIMELINE NODE
                ================================================== */}

                <motion.div
                  whileInView={{
                    scale: [0.85, 1.08, 1],
                  }}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.12 + 0.15,
                  }}
                  className="
                    absolute
                    left-6
                    sm:left-8
                    top-1
                    -translate-x-1/2
                    z-20
                  "
                >
                  {/* Node glow */}
                  <motion.div
                    animate={{
                      opacity: [0.2, 0.45, 0.2],
                      scale: [1, 1.35, 1],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: idx * 0.4,
                      ease: 'easeInOut',
                    }}
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-[#2F5D50]/30
                      blur-md
                    "
                  />

                  {/* Node */}
                  <div className="
                    relative
                    w-10
                    h-10
                    rounded-full
                    bg-[#FCFAF6]
                    border-2
                    border-[#2F5D50]
                    text-[#2F5D50]
                    flex
                    items-center
                    justify-center
                    shadow-[0_5px_20px_rgba(47,93,80,0.12)]
                    group-hover:bg-[#2F5D50]
                    group-hover:text-white
                    transition-colors
                  ">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </motion.div>

                {/* =================================================
                    EXPERIENCE CARD
                ================================================== */}

                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="
                    group
                    relative
                    bg-[#FCFAF6]
                    rounded-[24px]
                    border
                    border-[#DDD6C8]
                    shadow-[0_10px_35px_rgba(47,93,80,0.06)]
                    overflow-hidden
                    transition-shadow
                    hover:border-[#2F5D50]/35
                    hover:shadow-[0_18px_45px_rgba(47,93,80,0.11)]
                  "
                >

                  {/* Top accent */}
                  <div className="
                    h-1
                    w-full
                    bg-gradient-to-r
                    from-[#2F5D50]
                    via-[#4E8D66]
                    to-[#D97745]
                    opacity-70
                    group-hover:opacity-100
                    transition-opacity
                  " />

                  <div className="p-6 sm:p-8">

                    {/* =================================================
                        CARD HEADER
                    ================================================== */}

                    <div className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-start
                      justify-between
                      gap-5
                      mb-7
                    ">

                      <div>

                        {/* Milestone number */}
                        <div className="
                          flex
                          items-center
                          gap-2
                          mb-3
                        ">
                          <span className="
                            text-[10px]
                            font-mono
                            tracking-[0.2em]
                            text-[#9CA3AF]
                          ">
                            MILESTONE
                          </span>

                          <span className="
                            text-[10px]
                            font-mono
                            font-bold
                            text-[#D97745]
                          ">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Type */}
                        <div className="
                          inline-flex
                          items-center
                          gap-1.5
                          px-3
                          py-1
                          rounded-full
                          bg-[#2F5D50]/10
                          border
                          border-[#2F5D50]/20
                          text-[#2F5D50]
                          text-xs
                          font-mono
                          font-semibold
                          mb-3
                        ">
                          <Sparkles className="w-3 h-3 text-[#D97745]" />

                          <span>
                            {exp.type}
                          </span>
                        </div>

                        {/* Role */}
                        <h3 className="
                          text-xl
                          sm:text-2xl
                          font-bold
                          font-display
                          text-[#1D2A26]
                          leading-tight
                        ">
                          {exp.role}
                        </h3>

                        {/* Company */}
                        <div className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-[#2F5D50]
                          font-medium
                          mt-2
                        ">
                          <Building2 className="w-4 h-4" />

                          <span>
                            {exp.company}
                          </span>
                        </div>
                      </div>

                      {/* Period */}
                      <div className="
                        inline-flex
                        items-center
                        gap-2
                        px-3.5
                        py-2
                        rounded-xl
                        bg-[#F5F1E8]
                        border
                        border-[#DDD6C8]
                        text-xs
                        font-mono
                        text-[#4E8D66]
                        font-semibold
                        shrink-0
                        self-start
                      ">
                        <Calendar className="w-3.5 h-3.5" />

                        <span>
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* =================================================
                        ACHIEVEMENTS
                    ================================================== */}

                    <div className="
                      pt-5
                      border-t
                      border-[#DDD6C8]
                    ">
                      <div className="space-y-3">
                        {exp.achievements.map((ach, i) => (
                          <motion.div
                            key={i}
                            initial={{
                              opacity: 0,
                              x: -8,
                            }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{
                              once: true,
                              amount: 0.4,
                            }}
                            transition={{
                              duration: 0.45,
                              delay:
                                idx * 0.12 + i * 0.06,
                            }}
                            className="
                              flex
                              items-start
                              gap-3
                              text-sm
                              text-[#4B5563]
                              leading-relaxed
                            "
                          >
                            <CheckCircle2
                              className="
                                w-4
                                h-4
                                text-[#4E8D66]
                                shrink-0
                                mt-0.5
                              "
                            />

                            <span>
                              {ach}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* =================================================
                        CARD FOOTER
                    ================================================== */}

                    <div className="
                      mt-6
                      pt-4
                      border-t
                      border-[#DDD6C8]/70
                      flex
                      items-center
                      justify-between
                    ">
                      <span className="
                        text-[10px]
                        font-mono
                        uppercase
                        tracking-widest
                        text-[#9CA3AF]
                      ">
                        Professional milestone
                      </span>

                      <ArrowUpRight className="
                        w-4
                        h-4
                        text-[#2F5D50]/40
                        group-hover:text-[#D97745]
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        transition-all
                      " />
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* =====================================================
            CURRENT STATUS
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            max-w-4xl
            mx-auto
            mt-16
            pl-16
            sm:pl-20
          "
        >
          <div className="
            relative
            rounded-[22px]
            border
            border-[#2F5D50]/20
            bg-[#2F5D50]/[0.045]
            p-5
            sm:p-6
            overflow-hidden
          ">
            {/* Decorative glow */}
            <div className="
              absolute
              -right-20
              -top-20
              w-40
              h-40
              rounded-full
              bg-[#D97745]/10
              blur-3xl
            " />

            <div className="
              relative
              flex
              flex-col
              sm:flex-row
              sm:items-center
              justify-between
              gap-4
            ">
              <div>
                <div className="
                  flex
                  items-center
                  gap-2
                  mb-1.5
                ">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      rounded-full
                      bg-[#4E8D66]
                      opacity-50
                      animate-ping
                    " />

                    <span className="
                      relative
                      inline-flex
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-[#4E8D66]
                    " />
                  </span>

                  <span className="
                    text-[10px]
                    font-mono
                    uppercase
                    tracking-widest
                    text-[#4E8D66]
                    font-bold
                  ">
                    CURRENT STATUS
                  </span>
                </div>

                <h3 className="
                  font-display
                  text-lg
                  sm:text-xl
                  font-bold
                  text-[#1D2A26]
                ">
                  Building, learning & automating.
                </h3>
              </div>

              <div className="
                text-xs
                font-mono
                text-[#2F5D50]
                font-semibold
                uppercase
                tracking-wider
              ">
                2026 →
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
