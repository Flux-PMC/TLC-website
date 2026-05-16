import { useEffect, useRef } from 'react';

const TOKENS = [
  '--color-bg-primary',
  '--color-text-primary',
  '--color-accent',
  '--color-surface',
  '--color-neutral',
  '--color-botanical-1',
  '--color-botanical-2',
] as const;

type Token = (typeof TOKENS)[number];

const WAYPOINTS: Record<Token, string[]> = {
  '--color-bg-primary':   ['#FAF7F4', '#FAF7F2', '#FBF7F1', '#FBF6F0', '#FBF6F0'],
  '--color-text-primary': ['#3A3338', '#372F32', '#332B2C', '#312827', '#2F2623'],
  '--color-accent':       ['#9B8EC4', '#B28EAC', '#C08B76', '#C69862', '#C9A45C'],
  '--color-surface':      ['#EDE7DF', '#ECE2D9', '#EBDDD3', '#EBDAD0', '#EBD9CF'],
  '--color-neutral':      ['#A89B91', '#A09183', '#978676', '#907B6E', '#8E7568'],
  '--color-botanical-1':  ['#C2CBB2', '#B8C3A5', '#ADBA99', '#A6B292', '#A3AB8E'],
  '--color-botanical-2':  ['#D6DCCA', '#D8D9C4', '#DAD5BD', '#DCD2BA', '#DDD0B8'],
};

const FONTS_A: Record<string, string> = {
  '--font-heading':    "'Cormorant Garamond', Georgia, serif",
  '--font-subheading': "'Cormorant Garamond', Georgia, serif",
  '--font-body':       "'Raleway', 'Helvetica Neue', sans-serif",
  '--font-ui':         "'Raleway', 'Helvetica Neue', sans-serif",
};

const FONTS_B: Record<string, string> = {
  '--font-heading':    "'Fraunces', Georgia, serif",
  '--font-subheading': "'Fraunces', Georgia, serif",
  '--font-body':       "'Outfit', 'Helvetica Neue', sans-serif",
  '--font-ui':         "'Outfit', 'Helvetica Neue', sans-serif",
};

type Phase = 'day' | 'evening-transition' | 'night' | 'morning-transition';

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function interpolateWaypoints(waypoints: string[], progress: number): string {
  const p = Math.max(0, Math.min(1, progress));
  const pos = p * 4;
  const idx = Math.min(Math.floor(pos), 3);
  const frac = pos - idx;
  const [r1, g1, b1] = hexToRgb(waypoints[idx]);
  const [r2, g2, b2] = hexToRgb(waypoints[idx + 1]);
  return rgbToHex(
    r1 + (r2 - r1) * frac,
    g1 + (g2 - g1) * frac,
    b1 + (b2 - b1) * frac,
  );
}

function getTransitionProgress(now: Date): { progress: number; phase: Phase } {
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const eveningStart = 17 * 60;
  const eveningEnd   = 18 * 60;
  const morningStart =  8 * 60;
  const morningEnd   =  9 * 60;

  if (totalMinutes >= morningEnd && totalMinutes < eveningStart) {
    return { progress: 0, phase: 'day' };
  }
  if (totalMinutes >= eveningStart && totalMinutes < eveningEnd) {
    return { progress: (totalMinutes - eveningStart) / 60, phase: 'evening-transition' };
  }
  if (totalMinutes >= eveningEnd || totalMinutes < morningStart) {
    return { progress: 1, phase: 'night' };
  }
  if (totalMinutes >= morningStart && totalMinutes < morningEnd) {
    return { progress: 1 - (totalMinutes - morningStart) / 60, phase: 'morning-transition' };
  }
  return { progress: 0, phase: 'day' };
}

function parseTimeOverride(search: string): Date | null {
  const timeParam = new URLSearchParams(search).get('time');
  if (!timeParam) return null;
  const match = timeParam.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export default function PaletteManager() {
  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const fontStateRef  = useRef<'a' | 'b'>('a');
  const debugTimeRef  = useRef<Date | null>(null);

  useEffect(() => {
    debugTimeRef.current = parseTimeOverride(window.location.search);

    const getNow = (): Date => debugTimeRef.current ?? new Date();

    function applyCssVars(progress: number): void {
      const root = document.documentElement;
      for (const token of TOKENS) {
        root.style.setProperty(token, interpolateWaypoints(WAYPOINTS[token], progress));
      }
    }

    function applyFontsDirect(fonts: Record<string, string>): void {
      const root = document.documentElement;
      for (const [prop, value] of Object.entries(fonts)) {
        root.style.setProperty(prop, value);
      }
    }

    function swapFonts(target: 'a' | 'b'): void {
      const fonts = target === 'b' ? FONTS_B : FONTS_A;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion) {
        applyFontsDirect(fonts);
        fontStateRef.current = target;
        return;
      }

      const body = document.body;
      body.style.transition = 'opacity 0.6s ease';
      body.style.opacity = '0';
      setTimeout(() => {
        applyFontsDirect(fonts);
        fontStateRef.current = target;
        body.style.opacity = '1';
        setTimeout(() => {
          body.style.transition = '';
        }, 600);
      }, 600);
    }

    function tick(): void {
      const { progress, phase } = getTransitionProgress(getNow());
      applyCssVars(progress);

      if (phase === 'day') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (fontStateRef.current !== 'a') swapFonts('a');
        return;
      }

      if (phase === 'night') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (fontStateRef.current !== 'b') swapFonts('b');
        return;
      }
    }

    // Initialize: apply current state immediately without animation
    const { progress, phase } = getTransitionProgress(getNow());
    applyCssVars(progress);

    if (phase === 'night' || phase === 'morning-transition') {
      applyFontsDirect(FONTS_B);
      fontStateRef.current = 'b';
    } else {
      applyFontsDirect(FONTS_A);
      fontStateRef.current = 'a';
    }

    if (phase === 'evening-transition' || phase === 'morning-transition') {
      intervalRef.current = setInterval(tick, 60_000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return null;
}
