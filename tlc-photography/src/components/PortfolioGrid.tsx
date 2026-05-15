import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface PortfolioImage {
  title: string;
  src: string;
  alt: string;
  category: string;
}

interface Props {
  images: PortfolioImage[];
}

export default function PortfolioGrid({ images }: Props) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<PortfolioImage | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion.current) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  if (!images.length) {
    return (
      <p
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-neutral)',
          fontSize: 'var(--text-body)',
        }}
      >
        Portfolio images coming soon.
      </p>
    );
  }

  return (
    <>
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
        }}
        className="portfolio-grid"
      >
        {images.map((image, idx) => (
          <motion.button
            key={`${image.title}-${idx}`}
            initial={reducedMotion.current ? false : { opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={
              reducedMotion.current
                ? { duration: 0 }
                : { duration: 0.6, ease: 'easeOut', delay: idx * 0.12 }
            }
            onClick={() => setSelected(image)}
            aria-label={`View ${image.title}`}
            style={{
              padding: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '4px',
              overflow: 'hidden',
              display: 'block',
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              style={{
                width: '100%',
                aspectRatio: '4 / 5',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '4px',
              }}
            />
          </motion.button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent
          className="max-w-[90vw] w-auto p-8"
          style={{ maxHeight: '95vh', overflow: 'auto' }}
        >
          <DialogTitle className="sr-only">
            {selected?.title ?? 'Portfolio image'}
          </DialogTitle>
          {selected && (
            <img
              src={selected.src}
              alt={selected.alt}
              style={{
                maxHeight: '80vh',
                maxWidth: '100%',
                borderRadius: '4px',
                display: 'block',
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <style>{`
        @media (min-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
