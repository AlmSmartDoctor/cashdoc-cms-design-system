export interface FileUploadIconProps {
  className?: string;
}

export const FileUploadIcon = ({ className }: FileUploadIconProps) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M28 8H14C12.8954 8 12 8.89543 12 10V38C12 39.1046 12.8954 40 14 40H34C35.1046 40 36 39.1046 36 38V16L28 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 8V16H36"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 28V20M24 20L20 24M24 20L28 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
