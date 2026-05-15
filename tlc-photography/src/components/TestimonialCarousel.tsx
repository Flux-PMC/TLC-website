import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface Testimonial {
  clientName: string;
  sessionType: string;
  quote: string;
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: Props) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    if (testimonials.length > 1) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testimonials.length]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    startTimer();
  };

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <div
      style={{
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div style={{ position: 'relative', minHeight: '140px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={
              reducedMotionRef.current ? false : { opacity: 0, x: 20 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              reducedMotionRef.current ? { opacity: 1 } : { opacity: 0, x: -20 }
            }
            transition={
              reducedMotionRef.current
                ? { duration: 0 }
                : { duration: 0.5, ease: 'easeOut' }
            }
          >
            <blockquote
              style={{
                fontFamily: 'var(--font-subheading)',
                fontSize: 'var(--text-subheading)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'var(--color-text-primary)',
                margin: '0 0 16px',
                lineHeight: 1.6,
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 'var(--text-small)',
                color: 'var(--color-neutral)',
                margin: 0,
                letterSpacing: '0.5px',
              }}
            >
              — {t.clientName}
              {t.sessionType && (
                <span
                  style={{
                    marginLeft: '8px',
                    fontFamily: 'var(--font-body)',
                    textTransform: 'none',
                    letterSpacing: 0,
                  }}
                >
                  · {t.sessionType}
                </span>
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {testimonials.length > 1 && (
        <div
          role="tablist"
          aria-label="Testimonial navigation"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '28px',
          }}
        >
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === current}
              aria-label={`Testimonial ${idx + 1} of ${testimonials.length}`}
              onClick={() => goTo(idx)}
              style={{
                minHeight: '44px',
                minWidth: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  border: `1.5px solid var(--color-accent)`,
                  background:
                    idx === current ? 'var(--color-accent)' : 'transparent',
                  transition: 'background 0.2s',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
