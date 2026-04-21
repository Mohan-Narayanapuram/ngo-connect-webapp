import { useEffect } from 'react';

export default function Icon({ name, size = 18, className = '' }) {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  return (
    <i
      data-lucide={name}
      style={{ width: size, height: size, display: 'inline-block' }}
      className={className}
    />
  );
}