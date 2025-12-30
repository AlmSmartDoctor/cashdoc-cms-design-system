export interface ImageUploadIconProps {
  className?: string;
}

export const ImageUploadIcon = ({ className }: ImageUploadIconProps) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="8"
      y="8"
      width="32"
      height="32"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M40 28L32 20L20 32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.5 24L24 22L8 38"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
