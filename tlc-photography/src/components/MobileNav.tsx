import { useState } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#services', label: 'Services' },
  { href: '/#blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

interface Props {
  currentPath: string;
}

export default function MobileNav({ currentPath }: Props) {
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    currentPath === href || (href !== '/' && currentPath.startsWith(href));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open navigation menu"
          aria-expanded={open}
          style={{
            minHeight: '44px',
            minWidth: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-primary)',
            padding: 0,
          }}
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav
          aria-label="Mobile navigation"
          style={{ display: 'flex', flexDirection: 'column', marginTop: '48px' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? 'page' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '44px',
                padding: '0 16px',
                fontFamily: 'var(--font-ui)',
                fontSize: 'var(--text-button)',
                textTransform: 'uppercase' as const,
                letterSpacing: '1.5px',
                textDecoration: 'none',
                color: isActive(link.href)
                  ? 'var(--color-accent)'
                  : 'var(--color-text-primary)',
                borderBottom: isActive(link.href)
                  ? '1.5px solid var(--color-accent)'
                  : 'none',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
