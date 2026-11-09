import { cn } from '../utils/cn';

export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-11 w-auto', className)}
      aria-hidden="true"
    >
      <path d="M3 51L23 6L43 51M12 33H34" stroke="currentColor" strokeWidth="1.6" />
      <path d="M38 10L49 49L61 20L73 49L85 10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M23 6V51M61 20V51" stroke="currentColor" strokeWidth="0.55" opacity="0.55" />
    </svg>
  );
}

interface LogoProps {
  compact?: boolean;
  className?: string;
  descriptor?: boolean;
}

export function Logo({ compact = false, className, descriptor = false }: LogoProps) {
  if (compact) {
    return (
      <span className={cn('inline-flex flex-col items-center text-white', className)}>
        <Monogram className="h-12" />
        <span className="mt-1 font-display text-[1.35rem] tracking-[0.28em]">ARYA</span>
      </span>
    );
  }

  return (
    <span className={cn('group inline-flex items-center gap-3 text-white', className)}>
      <Monogram className="h-9 transition-transform duration-700 group-hover:scale-[1.04] sm:h-10" />
      <span className="inline-flex flex-col">
        <span className="font-display text-[1.65rem] leading-[0.82] tracking-[0.19em] sm:text-[1.8rem]">
          ARYA
        </span>
        <span className="mt-[0.42rem] whitespace-nowrap text-[0.42rem] font-medium uppercase tracking-[0.28em] text-white/75 sm:text-[0.46rem]">
          Worldwide Entertainment
        </span>
      </span>
      {descriptor && (
        <span className="ml-4 hidden border-l border-white/25 pl-5 text-[0.5rem] uppercase leading-[1.7] tracking-[0.22em] text-white/55 min-[1180px]:block">
          Independent Film
          <br />& Entertainment
        </span>
      )}
    </span>
  );
}
