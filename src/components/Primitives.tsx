import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import {
  type ButtonHTMLAttributes,
  type ImgHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../utils/cn';

export const ease = [0.22, 1, 0.36, 1] as const;

export function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  element.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 54,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y, clipPath: 'inset(0 0 16% 0)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('max-w-5xl', className)}>
      <Reveal>
        <div className={cn('mb-6 flex items-center gap-4 text-[0.62rem] font-semibold uppercase tracking-[0.32em]', light ? 'text-white/55' : 'text-black/55')}>
          <span className={cn('h-px w-9', light ? 'bg-white/45' : 'bg-black/35')} />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className={cn('text-balance font-display text-[clamp(2.9rem,6.5vw,7.5rem)] font-normal uppercase leading-[0.88] tracking-[-0.035em]', light ? 'text-white' : 'text-charcoal')}>
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className={cn('mt-7 max-w-xl text-sm leading-7 sm:text-base sm:leading-8', light ? 'text-white/60' : 'text-black/60')}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: 'light' | 'dark' | 'outline-light' | 'text-light' | 'text-dark';
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  external,
  variant = 'light',
  className,
  arrow = true,
  onClick,
  type = 'button',
  disabled,
  ariaLabel,
}: ButtonProps) {
  const styles = cn(
    'group relative inline-flex min-h-12 items-center justify-center gap-5 overflow-hidden border px-6 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 disabled:cursor-not-allowed disabled:opacity-50 sm:px-7',
    variant === 'light' && 'border-white bg-white text-black hover:bg-ivory',
    variant === 'dark' && 'border-black bg-black text-white hover:bg-charcoal',
    variant === 'outline-light' && 'border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-black',
    variant === 'text-light' && 'min-h-0 justify-start border-0 border-b border-white/30 px-0 pb-2 text-white hover:border-white',
    variant === 'text-dark' && 'min-h-0 justify-start border-0 border-b border-black/25 px-0 pb-2 text-black hover:border-black',
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
      )}
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className={styles}
        onClick={onClick}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={styles} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  );
}

const fallbackSvg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#141414"/><g fill="none" stroke="#d5d5d5" stroke-width="3" opacity=".8"><path d="M475 470L560 270l85 200M510 390h100"/><path d="M625 290l45 180 50-120 50 120 45-180"/></g><text x="600" y="570" fill="#999" text-anchor="middle" font-family="Arial" font-size="15" letter-spacing="7">ARYA WORLDWIDE</text></svg>',
)}`;

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function SmartImage({ src, alt, className, fallbackSrc, onLoad, ...props }: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
    setUsedFallback(false);
  }, [src]);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      className={cn('bg-charcoal transition-opacity duration-700', loaded ? 'opacity-100' : 'opacity-0', className)}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      onError={() => {
        if (fallbackSrc && !usedFallback) {
          setUsedFallback(true);
          setCurrentSrc(fallbackSrc);
        } else if (currentSrc !== fallbackSvg) {
          setCurrentSrc(fallbackSvg);
        }
        setLoaded(true);
      }}
    />
  );
}

export function Modal({
  open,
  onClose,
  children,
  label,
  className,
  closeLabel = 'Close dialog',
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  className?: string;
  closeLabel?: string;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = 'hidden';
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
      if (event.key === 'Tab') {
        const container = closeRef.current?.closest('.arya-modal');
        const focusable = Array.from(
          container?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') || [],
        ).filter((element) => element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const backdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="arya-modal fixed inset-0 z-[100] bg-black/90 p-0 backdrop-blur-sm sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.35 }}
          onMouseDown={backdropClick}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="fixed right-4 top-4 z-[120] flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/75 text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:border-white hover:bg-white hover:text-black sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={cn('relative h-full w-full overflow-y-auto overscroll-contain bg-black text-white shadow-2xl', className)}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985, clipPath: 'inset(2.5% 2.5% 2.5% 2.5%)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99, clipPath: 'inset(1% 1% 1% 1%)' }}
            transition={{ duration: reduce ? 0 : 0.55, ease }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DemoTag({ dark = false, children = 'DEMO CONTENT' }: { dark?: boolean; children?: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center border px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.2em]', dark ? 'border-white/25 text-white/60' : 'border-black/20 text-black/55')}>
      {children}
    </span>
  );
}

export function InlineArrow({ className }: { className?: string }) {
  return <ArrowRight className={cn('h-4 w-4', className)} strokeWidth={1.4} aria-hidden="true" />;
}
