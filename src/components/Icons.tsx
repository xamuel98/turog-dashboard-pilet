import React from "react";
import { IconProps } from "../types";

export const EmptyPostIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="48px"
    height="48px"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      d="m9,17c1.654-2.937,2.535-3.694,3.018-3.543.774.241.549,2.831,1.368,2.982.604.112,1.139-1.219,1.789-1.053.525.134.493,1.08,1.087,1.263.239.073.496,0,.737-.135"
      fill="none"
      stroke="#131316"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      data-color="color-2"
    />
    <path
      d="m6,14l-1.5,3-1.5-3V4c0-.552.448-1,1-1h1c.552,0,1,.448,1,1v10Z"
      stroke="#131316"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      fill="#131316"
    />
    <path
      d="m4,6h3.5c.828,0,1.5.672,1.5,1.5v3.5"
      fill="none"
      stroke="#131316"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const BadgeCheck: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      d="m17.999,10c0-1.097-.567-2.113-1.465-2.707.215-1.054-.103-2.174-.878-2.95-.775-.776-1.896-1.094-2.95-.878-.593-.897-1.609-1.464-2.706-1.464s-2.113.567-2.706,1.464c-1.053-.216-2.174.102-2.95.878s-1.093,1.896-.878,2.949c-.897.593-1.465,1.61-1.465,2.707s.567,2.113,1.465,2.707c-.215,1.054.103,2.174.878,2.95s1.898,1.092,2.95.878c.593.897,1.609,1.464,2.706,1.464s2.113-.568,2.706-1.465c1.059.214,2.176-.103,2.95-.878.776-.776,1.094-1.896.878-2.95.897-.593,1.465-1.609,1.465-2.707Zm-4.218-1.875l-4,5c-.178.222-.442.358-.726.374-.019,0-.037.001-.056.001-.265,0-.52-.105-.707-.293l-2-2c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l1.21,1.21,3.302-4.127c.347-.43.975-.502,1.406-.156.431.345.501.974.156,1.405Z"
      stroke-width="0"
      fill="#000"
    ></path>
  </svg>
);

export const ChevronLeft: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="12px"
    height="12px"
    viewBox="0 0 12 12"
    {...props}
  >
    <polyline
      points="7.75 1.75 3.5 6 7.75 10.25"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    ></polyline>
  </svg>
);

export const ChevronRight: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="12px"
    height="12px"
    viewBox="0 0 12 12"
  >
    <polyline
      points="4.25 10.25 8.5 6 4.25 1.75"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    ></polyline>
  </svg>
);

export const XMark: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="18px"
    height="18px"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      d="M4,14.75c-.192,0-.384-.073-.53-.22-.293-.293-.293-.768,0-1.061L13.47,3.47c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061L4.53,14.53c-.146,.146-.338,.22-.53,.22Z"
      fill="#f7f8f8"
      data-color="color-2"
    ></path>
    <path
      d="M14,14.75c-.192,0-.384-.073-.53-.22L3.47,4.53c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0L14.53,13.47c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z"
      fill="#f7f8f8"
    ></path>
  </svg>
);

export const TriangleWarning: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="12px"
    height="12px"
    viewBox="0 0 12 12"
    {...props}
  >
    <circle
      cx="6"
      cy="10.125"
      r=".875"
      fill="#f7f8f8"
      stroke-width="0"
      data-color="color-2"
    ></circle>
    <line
      x1="6"
      y1="4.75"
      x2="6"
      y2="7.75"
      fill="none"
      stroke="#f7f8f8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      data-color="color-2"
    ></line>
    <path
      d="m8.625,10.25h1.164c1.123,0,1.826-1.216,1.265-2.189L7.265,1.484c-.562-.975-1.969-.975-2.53,0L.946,8.061c-.561.973.142,2.189,1.265,2.189h1.164"
      fill="none"
      stroke="#f7f8f8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    ></path>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    {...props}
  >
    <circle
      cx="6.5"
      cy="6.5"
      r="5"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <line
      x1="10.5"
      y1="10.5"
      x2="14.5"
      y2="14.5"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const MoreFill: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
  </svg>
);
