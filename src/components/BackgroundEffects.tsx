import { motion } from 'motion/react';
import { Bot, BarChart3, Database, Code, FileSpreadsheet, Cpu } from 'lucide-react';

export default function BackgroundEffects() {
  const floatingIcons = [
    { Icon: Bot, top: '15%', left: '8%', delay: 0 },
    { Icon: BarChart3, top: '35%', left: '92%', delay: 1.5 },
    { Icon: Database, top: '55%', left: '5%', delay: 2.5 },
    { Icon: FileSpreadsheet, top: '75%', left: '88%', delay: 1 },
    { Icon: Code, top: '25%', left: '82%', delay: 3 },
    { Icon: Cpu, top: '85%', left: '12%', delay: 2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-noise">
      {/* Primary Glowing Mesh Blob Top Left - Deep Sage Green */}
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#2F5D50]/12 to-[#D97745]/8 blur-[120px] animate-pulse-glow" />

      {/* Secondary Glowing Mesh Blob Middle Right - Warm Terracotta */}
      <div className="absolute top-[40%] -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#D97745]/10 to-[#2F5D50]/8 blur-[140px] animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Bottom Left Soft Blob */}
      <div className="absolute bottom-[-100px] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-t from-[#2F5D50]/10 to-transparent blur-[140px]" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.25]" 
        style={{
          backgroundImage: `linear-gradient(#DDD6C8 1px, transparent 1px), linear-gradient(to right, #DDD6C8 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Floating Tech Icons in Background */}
      {floatingIcons.map(({ Icon, top, left, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-[#2F5D50]/20 hidden lg:block"
          style={{ top, left }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, -8, 0],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay,
            ease: 'easeInOut'
          }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}
    </div>
  );
}
