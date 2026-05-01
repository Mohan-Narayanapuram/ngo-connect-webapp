import { icons } from 'lucide-react';

export default function Icon({ name, size = 16, className = '', strokeWidth = 1.75 }) {
  const pascalName = name
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');

  const LucideIcon = icons[pascalName];

  if (!LucideIcon) {
    // Silent fallback — renders an empty square placeholder
    return (
      <svg
        width={size} height={size}
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    );
  }

  return <LucideIcon size={size} className={className} strokeWidth={strokeWidth} />;
}