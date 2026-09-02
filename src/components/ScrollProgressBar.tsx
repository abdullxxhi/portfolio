import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        const currentProgress =
          (window.scrollY / totalHeight) * 100;

        setScrollProgress(currentProgress);
      } else {
        setScrollProgress(0);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-[2px] w-full bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#2F5D50] transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
