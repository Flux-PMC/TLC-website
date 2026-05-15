import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex w-full rounded',
        'min-h-[120px] px-4 py-3',
        'bg-[var(--color-bg-primary)]',
        'border border-[var(--color-surface)]',
        'font-body text-[length:var(--text-body)] text-[var(--color-text-primary)]',
        'placeholder:text-[var(--color-neutral)]',
        'resize-y',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-accent-light)] focus-visible:outline-offset-[1px]',
        'focus-visible:border-[var(--color-accent)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-[border-color] duration-150',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
