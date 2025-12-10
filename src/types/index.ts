import { SVGProps } from "react";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface NewPost {
  title: string;
  body: string;
}

export type IconProps = SVGProps<SVGSVGElement>;
