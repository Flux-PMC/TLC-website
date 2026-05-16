import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Service {
  name: string;
  description: string;
  image: string;
  startingPrice: string;
}

interface Props {
  services: Service[];
}

export default function ServiceCards({ services }: Props) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const isTouchDevice = useRef(false);
  const reducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const onFirstTouch = () => {
      isTouchDevice.current = true;
      window.removeEventListener('touchstart', onFirstTouch);
    };
    window.addEventListener('touchstart', onFirstTouch, { passive: true });
    return () => window.removeEventListener('touchstart', onFirstTouch);
  }, []);

  const handleMouseEnter = (idx: number) => {
    if (!isTouchDevice.current) setExpandedCard(idx);
  };

  const handleMouseLeave = (idx: number) => {
    if (!isTouchDevice.current && expandedCard === idx) setExpandedCard(null);
  };

  const handleToggle = (idx: number) => {
    setExpandedCard((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {services.map((service, idx) => {
        const isExpanded = expandedCard === idx;
        const dur = reducedMotion.current ? 0 : 0.35;
        const descId = `service-desc-${idx}`;

        return (
          <div
            key={service.name}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            style={{
              position: 'relative',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '8px',
              padding: '24px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
              className="service-card-inner"
            >
              {/* Image section */}
              <motion.div
                animate={{ opacity: isExpanded ? 0.88 : 1 }}
                transition={{ duration: dur }}
                style={{
                  borderRadius: '4px',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
                className="service-card-image"
              >
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      aspectRatio: '3 / 2',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: '4px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      backgroundColor: 'var(--color-bg-primary)',
                      borderRadius: '4px',
                      aspectRatio: '3 / 2',
                    }}
                  />
                )}
              </motion.div>

              {/* Text section */}
              <div style={{ flex: 1 }}>
                {/* Expand trigger button */}
                <button
                  onClick={() => handleToggle(idx)}
                  aria-expanded={isExpanded}
                  aria-controls={descId}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--text-h3)',
                      fontWeight: 400,
                      color: 'var(--color-text-primary)',
                      margin: '0 0 8px',
                      lineHeight: 1.3,
                    }}
                  >
                    {service.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 'var(--text-small)',
                      color: 'var(--color-neutral)',
                      margin: 0,
                      letterSpacing: '0.3px',
                    }}
                  >
                    Starting at {service.startingPrice}
                  </p>
                </button>

                {/* Expandable description */}
                <motion.div
                  id={descId}
                  initial={false}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={
                    reducedMotion.current
                      ? { duration: 0 }
                      : {
                          height: { duration: 0.4, ease: 'easeOut' },
                          opacity: {
                            duration: 0.4,
                            delay: isExpanded ? 0.1 : 0,
                          },
                        }
                  }
                  style={{ overflow: 'hidden' }}
                  aria-hidden={!isExpanded}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-small)',
                      fontWeight: 300,
                      color: 'var(--color-text-primary)',
                      margin: '12px 0 0',
                      lineHeight: 1.7,
                    }}
                  >
                    {service.description}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Accent line at bottom */}
            <motion.div
              initial={false}
              animate={{ scaleX: isExpanded ? 1 : 0 }}
              transition={
                reducedMotion.current
                  ? { duration: 0 }
                  : { duration: dur, ease: 'easeOut' }
              }
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: 'var(--color-accent)',
                transformOrigin: 'left',
              }}
              aria-hidden
            />
          </div>
        );
      })}

      <style>{`
        @media (min-width: 768px) {
          .service-card-inner {
            flex-direction: row !important;
          }
          .service-card-image {
            width: 240px;
          }
          .service-card-image img,
          .service-card-image > div {
            aspect-ratio: 4 / 5 !important;
            width: 240px !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
