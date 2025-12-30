/**
 * @license
 * This icon set incorporates path data from Lucide (https://lucide.dev)
 * and Feather Icons (https://feathericons.com), which are licensed under the ISC License.
 *
 * ISC License
 * Copyright (c) 2022, Lucide Contributors
 */

import React, { SVGProps } from "react";
import { cn } from "@/utils/cn";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

const DEFAULT_SIZE = 40;
const DEFAULT_STROKE_WIDTH = 2.0;

const IconWrapper = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      children,
      className,
      size = DEFAULT_SIZE,
      strokeWidth = DEFAULT_STROKE_WIDTH,
      viewBox = "0 0 24 24",
      ...props
    },
    ref,
  ) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  ),
);
IconWrapper.displayName = "IconWrapper";

// --- Navigation & Arrows ---
export const ChevronDownIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M6 9L12 15L18 9" />
    </IconWrapper>
  ),
);

export const ChevronUpIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M18 15L12 9L6 15" />
    </IconWrapper>
  ),
);

export const ChevronLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M15 18L9 12L15 6" />
    </IconWrapper>
  ),
);

export const ChevronRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M9 18L15 12L9 6" />
    </IconWrapper>
  ),
);

export const ChevronsLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M11 17L6 12L11 7" />
      <path d="M18 17L13 12L18 7" />
    </IconWrapper>
  ),
);

export const ChevronsRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M13 17L18 12L13 7" />
      <path d="M6 17L11 12L6 7" />
    </IconWrapper>
  ),
);

export const ArrowLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M19 12H5" />
      <path d="M12 19L5 12L12 5" />
    </IconWrapper>
  ),
);

export const ArrowRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M5 12H19" />
      <path d="M12 5L19 12L12 19" />
    </IconWrapper>
  ),
);

export const MenuIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </IconWrapper>
  ),
);

export const AlignIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <circle cx="9" cy="12" r="1" fill="currentColor" />
      <circle cx="9" cy="5" r="1" fill="currentColor" />
      <circle cx="9" cy="19" r="1" fill="currentColor" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
      <circle cx="15" cy="5" r="1" fill="currentColor" />
      <circle cx="15" cy="19" r="1" fill="currentColor" />
    </IconWrapper>
  ),
);

// --- Status & Feedback ---
export const XIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </IconWrapper>
  ),
);

export const CheckIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M20 6L9 17L4 12" />
    </IconWrapper>
  ),
);

export const CheckCircleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M22 11.08V12A10 10 0 1 1 16.07 2.86" />
      <path d="M22 4L11 15L8 12" />
    </IconWrapper>
  ),
);

export const InfoIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="16" y2="12" />
      <line x1="12" x2="12.01" y1="8" y2="8" />
    </IconWrapper>
  ),
);

export const ErrorIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </IconWrapper>
  ),
);

export const WarningIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </IconWrapper>
  ),
);

export const HelpIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </IconWrapper>
  ),
);

// --- Actions ---
export const CloseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M18 6L6 18" />
      <path d="M6 6L18 18" />
    </IconWrapper>
  ),
);

export const PlusIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </IconWrapper>
  ),
);

export const PlusCircleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="16" />
      <line x1="8" x2="16" y1="12" y2="12" />
    </IconWrapper>
  ),
);

export const TrashIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M3 6H21" />
      <path d="M19 6V20A2 2 0 0 1 17 22H7A2 2 0 0 1 5 20V6" />
      <path d="M8 6V4A2 2 0 0 1 10 2H14A2 2 0 0 1 16 4V6" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </IconWrapper>
  ),
);

export const SaveIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H16L21 8V19A2 2 0 0 1 19 21Z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </IconWrapper>
  ),
);

export const SettingsIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </IconWrapper>
  ),
);

export const RefreshIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3V8H16" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21V16H8" />
    </IconWrapper>
  ),
);

export const LinkIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </IconWrapper>
  ),
);

export const PinIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <line x1="12" x2="12" y1="17" y2="22" />
      <path d="M5 17H19V15.24A2 2 0 0 0 17.89 13.45L16.1 12.55A0.5 0.5 0 0 1 15.8 12.3V8A4 4 0 0 0 7.8 8V12.3A0.5 0.5 0 0 1 7.5 12.55L5.71 13.45A2 2 0 0 0 4.6 15.24V17Z" />
    </IconWrapper>
  ),
);

// --- Files & Content ---
export const FileIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M14.5 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V7.5L14.5 2Z" />
      <polyline points="14 2 14 8 20 8" />
    </IconWrapper>
  ),
);

export const FileTextIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M14.5 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V7.5L14.5 2Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" x2="16" y1="13" y2="13" />
      <line x1="8" x2="16" y1="17" y2="17" />
      <line x1="8" x2="12" y1="9" y2="9" />
    </IconWrapper>
  ),
);

export const ExcelIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M14.5 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V7.5L14.5 2Z" />
      <polyline points="14 2 14 8 20 8" />
      <rect x="8" y="13" width="8" height="6" rx="1" />
      <line x1="12" x2="12" y1="13" y2="19" />
      <line x1="8" x2="16" y1="16" y2="16" />
    </IconWrapper>
  ),
);

export const FileUploadIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <path d="M14.5 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V7.5L14.5 2Z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 12V18" />
      <path d="M15 15L12 12L9 15" />
    </IconWrapper>
  ),
);

export const ImageUploadIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="M21 15L17.91 11.91A2 2 0 0 0 15.09 11.91L6 21" />
      <path d="M16 12L18.5 9.5A2 2 0 0 1 21.32 9.5L21 12" />
    </IconWrapper>
  ),
);

export const CalendarIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconWrapper ref={ref} {...props}>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </IconWrapper>
  ),
);

// --- Custom Brand Icons ---
export const MedicashIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = DEFAULT_SIZE, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 22"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={cn("text-current", className)}
      {...props}
    >
      <g fill="currentColor">
        <path d="M17.9361 18.3242C18.5184 19.9414 20.3015 20.7804 21.9188 20.1981C23.536 19.6157 24.375 17.8326 23.7927 16.2154L19.2776 3.67591C18.6953 2.05867 16.9122 1.21969 15.2949 1.802C13.6777 2.38432 12.8387 4.16742 13.421 5.78466L17.9361 18.3242Z" />
        <path d="M13.3741 3.67585C13.9564 2.0586 15.7395 1.21962 17.3568 1.80194C18.974 2.38425 19.813 4.16735 19.2307 5.7846L14.7156 18.3241C14.1333 19.9413 12.3502 20.7803 10.7329 20.198C9.11569 19.6157 8.27671 17.8326 8.85903 16.2153L13.3741 3.67585Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.21568 15.8655L3.40558 9.78358L8.00981 11.4414L5.81991 17.5233C5.36212 18.7948 3.96031 19.4543 2.68888 18.9965C1.41746 18.5387 0.757885 17.1369 1.21568 15.8655ZM6.82668 17.8858C6.16868 19.7133 4.15382 20.6613 2.32638 20.0033C0.498935 19.3453 -0.449084 17.3305 0.208918 15.503L2.39882 9.42108L2.76131 8.41435L2.76123 8.41432L4.55271 3.43893C5.21071 1.61148 7.22556 0.663465 9.05301 1.32147C10.8804 1.97947 11.8285 3.99432 11.1705 5.82177L9.379 10.7971L9.37908 10.7972L9.01658 11.8039L6.82668 17.8858ZM8.31315 10.1149C8.24214 10.3082 8.02787 10.4074 7.83456 10.3364C7.64124 10.2654 7.54209 10.0511 7.6131 9.85778L9.13383 5.71775C9.20484 5.52444 9.41912 5.42529 9.61243 5.4963C9.80575 5.56731 9.90489 5.78158 9.83388 5.9749L8.31315 10.1149ZM9.96695 4.76687C10.1639 4.76687 10.3236 4.60718 10.3236 4.41019C10.3236 4.2132 10.1639 4.05351 9.96695 4.05351C9.76996 4.05351 9.61027 4.2132 9.61027 4.41019C9.61027 4.60718 9.76996 4.76687 9.96695 4.76687Z"
        />
      </g>
    </svg>
  ),
);

export const NewBadgeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = DEFAULT_SIZE, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      className={cn(className)}
      {...props}
    >
      <g transform="translate(-1841 -61)">
        <circle
          cx="6"
          cy="6"
          r="6"
          transform="translate(1841 61)"
          fill="#ffd200"
        />
        <text
          transform="translate(1844 70)"
          fill="#424242"
          fontSize="8"
          fontFamily="Pretendard-Bold, Pretendard"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            N
          </tspan>
        </text>
      </g>
    </svg>
  ),
);
