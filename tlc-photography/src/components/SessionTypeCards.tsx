import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface SessionType {
  name: string;
  description: string;
  image: string;
  startingPrice: string;
  href?: string;
}

interface Props {
  sessions: SessionType[];
  linkToServices?: boolean;
}

export default function SessionTypeCards({ sessions, linkToServices }: Props) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const isTouchDevice = useRef(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const onFirstTouch = () => {
      isTouchDevice.current = true;
      window.removeEventListener('touchstart', onFirstTouch);
    };
    window.addEventListener('touchstart', onFirstTouch, { passive: true });
    return () => window.removeEventListener('touchstart', onFirstTouch);
  }, []);

  const handleMouseEnter = (idx: number) => {
    if (!isTouchDevice.current) setActiveCard(idx);
  };

  const handleMouseLeave = (idx: number) => {
    if (!isTouchDevice.current && activeCard === idx) setActiveCard(null);
  };

  const handleClick = (idx: number, href?: string) => {
    if (isTouchDevice.current) {
      setActiveCard((prev) => (prev === idx ? null : idx));
    } else if (href) {
      window.location.href = href;
    }
  };

  const transitionDuration = reducedMotion.current ? 0 : 0.35;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '24px',
      }}
      className="session-cards-grid"
    >
      {sessions.map((session, idx) => {
        const isActive = activeCard === idx;
        const destination = linkToServices ? '/services' : undefined;

        return (
          <div
            key={session.name}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            onClick={() => handleClick(idx, destination)}
            style={{
              position: 'relative',
              borderRadius: '4px',
              overflow: 'hidden',
              aspectRatio: '4 / 5',
              cursor: destination || isTouchDevice.current ? 'pointer' : 'default',
            }}
            role={destination ? 'link' : undefined}
            aria-label={destination ? `${session.name} — view all services` : session.name}
          >
            {/* Image */}
            <motion.div
              animate={{ scale: isActive ? 1.03 : 1 }}
              transition={{ duration: transitionDuration, ease: 'easeOut' }}
              style={{ width: '100%', height: '100%' }}
            >
              {session.image ? (
                <img
                  src={session.image}
                  alt={session.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'var(--color-surface)',
                  }}
                />
              )}
            </motion.div>

            {/* Overlay */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: isActive ? '0%' : '100%' }}
              transition={
                reducedMotion.current
                  ? { duration: 0 }
                  : { duration: transitionDuration, ease: 'easeOut' }
              }
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(58,51,56,0.85) 0%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px',
              }}
              aria-hidden={!isActive}
            >
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '20px',
                  fontWeight: 400,
                  color: '#FAF7F4',
                  margin: '0 0 4px',
                  lineHeight: 1.2,
                }}
              >
                {session.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(250, 247, 244, 0.8)',
                  margin: 0,
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                }}
              >
                {session.description}
              </p>
            </motion.div>
          </div>
        );
      })}

      <style>{`
        @media (min-width: 640px) {
          .session-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .session-cards-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
