import type { ReactNode, SVGProps } from 'react';

export type IconName =
  | 'home'
  | 'leaf'
  | 'book'
  | 'user'
  | 'camera'
  | 'close'
  | 'chevronLeft'
  | 'chevronRight'
  | 'plus'
  | 'minus'
  | 'check'
  | 'sparkle'
  | 'clock'
  | 'refresh'
  | 'heart'
  | 'scan'
  | 'arrowRight'
  | 'trash'
  | 'flame'
  | 'flash'
  | 'flip'
  | 'grid'
  | 'image'
  | 'shutter'
  | 'basket'
  | 'edit';

const PATHS: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="M3 10.6 12 3.5l9 7.1" />
      <path d="M5.6 9.6V19a1.5 1.5 0 0 0 1.5 1.5H10v-5.2h4v5.2h2.9a1.5 1.5 0 0 0 1.5-1.5V9.6" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4.2c.6 10.3-4.3 15.6-10.4 15.6-1.2 0-2.3-.2-3.2-.6C5.4 18.6 4 16.4 4 13.9 4 7.4 10.6 4.2 20 4.2Z" />
      <path d="M5.4 19.6c2.6-4 5.8-6.4 9.9-7.6" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2 2 0 0 1 2 2v13.5a1.8 1.8 0 0 0-2-1.6H5.5A1.5 1.5 0 0 1 4 16.9V5.5Z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H14a2 2 0 0 0-2 2v13.5a1.8 1.8 0 0 1 2-1.6h4.5a1.5 1.5 0 0 0 1.5-1.5V5.5Z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.2" r="3.9" />
      <path d="M4.6 20.2a7.4 7.4 0 0 1 14.8 0" />
    </>
  ),
  camera: (
    <>
      <path d="M3.5 9.2A1.7 1.7 0 0 1 5.2 7.5h2.3L8.8 5h6.4l1.3 2.5h2.3a1.7 1.7 0 0 1 1.7 1.7v7.6a1.7 1.7 0 0 1-1.7 1.7H5.2a1.7 1.7 0 0 1-1.7-1.7V9.2Z" />
      <circle cx="12" cy="13.4" r="3.5" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronLeft: <path d="M14.5 5 8 12l6.5 7" />,
  chevronRight: <path d="M9.5 5 16 12l-6.5 7" />,
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  minus: <path d="M5.5 12h13" />,
  check: <path d="M4.5 12.6l4.7 4.8L19.5 6.8" />,
  sparkle: (
    <>
      <path d="M11 3.5 12.9 9l5.6 1.9-5.6 1.9L11 18.4 9.1 12.8 3.5 10.9 9.1 9 11 3.5Z" />
      <path d="M18 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.4V12l3.2 2.1" />
    </>
  ),
  refresh: (
    <>
      <path d="M20.2 11.4a8.2 8.2 0 1 1-2.4-5.2" />
      <path d="M20.5 5.2v5.4h-5.4" />
    </>
  ),
  heart: (
    <path d="M12 20.3C7 17 3.6 13.9 3.6 10.3A4.2 4.2 0 0 1 12 8.4a4.2 4.2 0 0 1 8.4 1.9c0 3.6-3.4 6.7-8.4 10Z" />
  ),
  scan: (
    <>
      <path d="M4 8.5V6.4A1.9 1.9 0 0 1 5.9 4.5h2.1M16 4.5h2.1A1.9 1.9 0 0 1 20 6.4v2.1M20 15.5v2.1a1.9 1.9 0 0 1-1.9 1.9H16M8 19.5H5.9A1.9 1.9 0 0 1 4 17.6v-2.1" />
      <path d="M4.2 12h15.6" />
    </>
  ),
  arrowRight: <path d="M4.5 12h14M13 6.5l6 5.5-6 5.5" />,
  trash: (
    <>
      <path d="M4 6.8h16" />
      <path d="M9.2 6.8V4.6h5.6v2.2" />
      <path d="M6.2 6.8 7.3 20h9.4l1.1-13.2" />
    </>
  ),
  flame: (
    <>
      <path d="M13 2.5c.5 3-2 4.2-2 7a3 3 0 0 0 6 0c0-2-1-3-1-4 1.5 1 2.5 2.6 2.5 4.7A6.5 6.5 0 0 1 12 21.5 6.5 6.5 0 0 1 5.5 15.2C5.5 8.6 9.2 6.3 13 2.5Z" />
      <path d="M12 21.5a3 3 0 0 1-3-3c0-1.6 1.3-2.6 2-3.6.5 1 1.2 1.6 2 1.6s1.5-.6 2-1.6c.7 1 2 2 2 3.6a3 3 0 0 1-3 3Z" />
    </>
  ),
  flash: <path d="M13.5 3 6 13.2h4.6L9.8 21l7.6-10.4h-4.7L13.5 3Z" />,
  flip: (
    <>
      <path d="M12 4.5v15" />
      <path d="M7.5 8.6 4.6 5.4l3-3.2M16.5 15.4l3 3.2-3 3.2" />
      <path d="M4.6 5.4h4.2M19.4 18.6h-4.2" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.4" height="6.4" rx="1.4" />
      <rect x="13.6" y="4" width="6.4" height="6.4" rx="1.4" />
      <rect x="4" y="13.6" width="6.4" height="6.4" rx="1.4" />
      <rect x="13.6" y="13.6" width="6.4" height="6.4" rx="1.4" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M4.5 16.5l4.3-5.2 3.6 4.4 3.2-3.7 4.4 4.5" />
    </>
  ),
  shutter: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="3.4" />
    </>
  ),
  basket: (
    <>
      <path d="M3.8 9.4h16.4l-1.5 9.4a2 2 0 0 1-2 1.7H7.3a2 2 0 0 1-2-1.7L3.8 9.4Z" />
      <path d="M8.6 9.4 12 3.5l3.4 5.9" />
      <path d="M9.8 13.2v3.4M14.2 13.2v3.4" />
    </>
  ),
  edit: (
    <>
      <path d="M14.7 5.3l4 4L9 19h-4l1-4 9.7-9.7Z" />
      <path d="M12.5 7.5 16.5 11.5" />
    </>
  ),
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 22, strokeWidth = 1.6, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
