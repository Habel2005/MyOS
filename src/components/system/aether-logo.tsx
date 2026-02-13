import { cn } from '@/lib/utils';

export function AetherLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={cn("w-16 h-16", className)}
    >
      <path
        fill="currentColor"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm52-88a52 52 0 1 1-52-52a52.06 52.06 0 0 1 52 52Zm-88 0a36 36 0 1 0 36 36a36 36 0 0 0-36-36Z"
      />
    </svg>
  );
}
