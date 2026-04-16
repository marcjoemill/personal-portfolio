import { useEffect, useState } from 'react';

const SECTION_THEMES: Record<string, 'dark' | 'light'> = {
  hero: 'dark',
  philosophy: 'light',
  work: 'dark',
  proof: 'dark',
  
  thinking: 'light',
  about: 'light',
};

export default function Navigation() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.keys(SECTION_THEMES).forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTheme(SECTION_THEMES[id]);
          }
        },
        {
          // Fires when the section crosses the top 10% of the viewport (where the nav lives)
          rootMargin: '-0% 0px -90% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isDark = theme === 'dark';

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-black/20 backdrop-blur-sm border-b border-white/10'
            : 'bg-white/20 backdrop-blur-sm border-b border-gray-200/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-lg font-medium transition-colors duration-300 ${
              isDark
                ? 'text-white/80 hover:text-white'
                : 'text-gray-800 hover:text-gray-600'
            }`}
          >
            Portfolio
          </button>

          <div className="flex items-center gap-8">
            {['work', 'proof', 'thinking', 'about'].map((id, i) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-sm transition-colors duration-300 ${
                  isDark
                    ? 'text-white/60 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {['Work', 'Experience', 'Thinking', 'About'][i]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}