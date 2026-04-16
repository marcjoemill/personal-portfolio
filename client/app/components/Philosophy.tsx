import { useEffect, useRef, useState } from 'react';

interface PhilosophyItem {
  title: string;
  description: string;
  tag: string;
  index: string;
}

const principles: PhilosophyItem[] = [
  {
    index: '01',
    tag: 'First principles',
    title: 'Start with the problem',
    description:
      "I don't jump to solutions. I spend time understanding what's actually broken, who it affects, and why it matters. Good engineering starts with clarity, not code.",
  },
  {
    index: '02',
    tag: 'Decision-making',
    title: 'Make tradeoffs visible',
    description:
      'Every decision is a tradeoff. Speed vs. quality. Flexibility vs. simplicity. I document what I choose and why, so future decisions have context.',
  },
  {
    index: '03',
    tag: 'Iteration',
    title: 'Ship, measure, iterate',
    description:
      'Perfect is the enemy of done. I build the smallest thing that works, get it in front of users, learn from reality, and improve from there.',
  },
  {
    index: '04',
    tag: 'Resilience',
    title: 'Learn from what breaks',
    description:
      'Failure is data. When something goes wrong, I treat it as an opportunity to understand the system better and build more resilient solutions.',
  },
];

const DWELL_VH = 60;
const TRANSITION_VH = 120;

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const vhPxRef = useRef<number>(800);
  const [scrolled, setScrolled] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = principles.length;

  const totalVH = DWELL_VH * 2 + (total - 1) * (TRANSITION_VH + DWELL_VH);

  useEffect(() => {
    const handleScroll = () => {
      vhPxRef.current = window.innerHeight;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const px = Math.max(0, -rect.top);
      setScrolled(px);

      const vh = vhPxRef.current / 100;
      for (let i = total - 1; i >= 0; i--) {
        const cardStart = i === 0 ? 0 : DWELL_VH * vh + (i - 1) * (TRANSITION_VH + DWELL_VH) * vh;
        if (px >= cardStart) {
          setActiveIndex(i);
          break;
        }
      }
    };

    vhPxRef.current = window.innerHeight;
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [total]);

  const getTrackX = () => {
    const vh = vhPxRef.current / 100;
    let x = 0;
    for (let i = 0; i < total - 1; i++) {
      const transitionStart = (DWELL_VH + i * (TRANSITION_VH + DWELL_VH)) * vh;
      const transitionEnd = transitionStart + TRANSITION_VH * vh;
      if (scrolled <= transitionStart) break;
      if (scrolled >= transitionEnd) {
        x = -(i + 1) * 100;
      } else {
        const t = (scrolled - transitionStart) / (transitionEnd - transitionStart);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        x = -(i * 100) - eased * 100;
        break;
      }
    }
    return x;
  };

  const getCardVisible = (i: number) => {
    const vh = vhPxRef.current / 100;

    if (i === 0) {
      const transitionStart = DWELL_VH * vh;
      const fadeOutEnd = transitionStart + TRANSITION_VH * 0.5 * vh;
      if (scrolled <= transitionStart) return 1;
      if (scrolled >= fadeOutEnd) return 0;
      return 1 - (scrolled - transitionStart) / (fadeOutEnd - transitionStart);
    }

    const transitionStart = (DWELL_VH + (i - 1) * (TRANSITION_VH + DWELL_VH)) * vh;
    const transitionEnd = transitionStart + TRANSITION_VH * vh;
    const fadeInStart = transitionStart + TRANSITION_VH * 0.5 * vh;

    let opacity = 0;

    if (scrolled >= fadeInStart && scrolled <= transitionEnd) {
      opacity = (scrolled - fadeInStart) / (transitionEnd - fadeInStart);
    } else if (scrolled > transitionEnd) {
      opacity = 1;
      if (i < total - 1) {
        const nextTransitionStart = (DWELL_VH + i * (TRANSITION_VH + DWELL_VH)) * vh;
        const nextFadeOutEnd = nextTransitionStart + TRANSITION_VH * 0.5 * vh;
        if (scrolled >= nextTransitionStart) {
          opacity = Math.max(0, 1 - (scrolled - nextTransitionStart) / (nextFadeOutEnd - nextTransitionStart));
        }
      }
    }

    return Math.min(1, Math.max(0, opacity));
  };

  const trackX = getTrackX();
  const overallProgress = Math.min(1, scrolled / ((totalVH - 100) * (vhPxRef.current / 100)));

  return (
    <div id="thinking">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        .phil-section {
          position: relative;
          height: ${totalVH}vh;
          background: #f5f3ef;
        }

        .phil-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        .phil-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 36px 72px;
        }

        .phil-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(30, 25, 15, 0.65);
          font-weight: 400;
        }

        .phil-counter {
          font-family: 'DM Mono', monospace;
          font-size: 15px;
          letter-spacing: 0.12em;
          color: rgba(30, 25, 15, 0.55);
        }

        .phil-counter-num {
          color: #6b4c18;
          transition: all 0.4s ease;
        }

        .phil-track {
          display: flex;
          height: 100%;
          will-change: transform;
        }

        .phil-card {
          flex: 0 0 100vw;
          width: 100vw;
          height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
          align-items: center;
        }

        .phil-card-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 72px 80px 80px;
          position: relative;
          z-index: 2;
        }

        .phil-card-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 80px 80px 64px;
          position: relative;
          z-index: 2;
          border-left: 1px solid rgba(107, 76, 24, 0.2);
        }

        .phil-bg-number {
          position: absolute;
          bottom: 0.15em;
          left: auto;
          right: 55%;
          font-family: 'Playfair Display', serif;
          font-size: clamp(200px, 24vw, 320px);
          font-weight: 300;
          color: rgba(138, 99, 32, 0.1);
          -webkit-text-stroke: 2px rgba(138, 99, 32, 0.22);
          line-height: 1;
          pointer-events: none;
          z-index: 0;
          letter-spacing: -0.06em;
          user-select: none;
        }

        .phil-tag {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6b4c18;
          display: inline-block;
          width: fit-content;
          margin-bottom: 20px;
        }

        .phil-card-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 7vw, 96px);
          font-weight: 300;
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: rgba(20, 16, 8, 0.95);
          margin: 0 0 32px 0;
        }

        .phil-accent-line {
          height: 2px;
          background: linear-gradient(90deg, rgba(107, 76, 24, 0.8), transparent);
          transition: width 0.9s 0.15s cubic-bezier(0.16,1,0.3,1);
          margin-bottom: 0;
        }

        .phil-card-desc {
          font-family: 'DM Mono', monospace;
          font-size: clamp(17px, 1.5vw, 22px);
          line-height: 1.85;
          color: rgba(20, 16, 8, 0.72);
          font-weight: 300;
          max-width: 460px;
        }

        .phil-ambient {
          position: absolute;
          top: 0; bottom: 0; left: 50%;
          width: 1px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(138, 99, 32, 0.06) 30%,
            rgba(138, 99, 32, 0.11) 50%,
            rgba(138, 99, 32, 0.06) 70%,
            transparent
          );
          pointer-events: none;
          z-index: 1;
        }

        .phil-progress-track {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: rgba(20, 16, 8, 0.1);
          z-index: 20;
        }

        .phil-progress-fill {
          height: 100%;
          background: #6b4c18;
          transition: width 0.1s linear;
        }

        .phil-dots {
          position: absolute;
          bottom: 44px;
          left: 80px;
          display: flex;
          gap: 8px;
          z-index: 20;
          align-items: center;
        }

        .phil-dot {
          height: 2px;
          background: rgba(107, 76, 24, 0.3);
          border-radius: 2px;
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s;
        }

        .phil-dot.active {
          background: #6b4c18;
        }

        .phil-scroll-hint {
          position: absolute;
          bottom: 44px;
          right: 80px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(20, 16, 8, 0.45);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 20;
          transition: opacity 0.6s ease;
        }

        .phil-scroll-arrow {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(107, 76, 24, 0.55));
        }
      `}</style>

      <div className="phil-section" ref={sectionRef}>
        <div className="phil-sticky">

          <div className="phil-topbar">
            <span className="phil-eyebrow">Engineering philosophy</span>
            <span className="phil-counter">
              <span className="phil-counter-num">{String(activeIndex + 1).padStart(2, '0')}</span>
              {' — '}
              {String(total).padStart(2, '0')}
            </span>
          </div>

          <div className="phil-ambient" />

          <div
            className="phil-track"
            style={{ transform: `translateX(${trackX}vw)` }}
          >
            {principles.map((item, i) => {
              const cardOpacity = getCardVisible(i);
              const visible = cardOpacity > 0.05;

              return (
                <div className="phil-card" key={i}>

                  <div
                    className="phil-bg-number"
                    style={{ opacity: cardOpacity * 0.9 }}
                  >
                    {item.index}
                  </div>

                  <div className="phil-card-left">
                    <div
                      style={{
                        opacity: cardOpacity,
                        transform: `translateY(${(1 - cardOpacity) * 20}px)`,
                      }}
                    >
                      <div className="phil-tag">{item.tag}</div>
                      <h2 className="phil-card-title">{item.title}</h2>
                      <div
                        className="phil-accent-line"
                        style={{ width: visible ? '88px' : '0px' }}
                      />
                    </div>
                  </div>

                  <div className="phil-card-right">
                    <p
                      className="phil-card-desc"
                      style={{
                        opacity: cardOpacity,
                        transform: `translateY(${(1 - cardOpacity) * 16}px)`,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="phil-scroll-hint"
            style={{ opacity: scrolled < 40 ? 1 : 0 }}
          >
            scroll down
            <div className="phil-scroll-arrow" />
          </div>

          <div className="phil-dots">
            {principles.map((_, i) => (
              <div
                key={i}
                className={`phil-dot ${i === activeIndex ? 'active' : ''}`}
                style={{ width: i === activeIndex ? '36px' : '16px' }}
              />
            ))}
          </div>

          <div className="phil-progress-track" style={{ opacity: overallProgress >= 0.98 ? 0 : 1, transition: 'opacity 0.4s ease' }}>
            <div
              className="phil-progress-fill"
              style={{ width: `${overallProgress * 100}%` }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}