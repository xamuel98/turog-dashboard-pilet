import React, { CSSProperties } from "react";

interface SkeletonProps {
  height?: number;
  borderRadius?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  height = 0.75,
  borderRadius = 0.25,
  className = "",
}) => {
  const style: CSSProperties = {
    "--skeleton-height": height,
    "--skeleton-radius": borderRadius,
  } as CSSProperties;

  return (
    <div
      className={`c-skeleton c-skeleton--shimmer ${className}`}
      style={style}
    />
  );
};

export default Skeleton;
