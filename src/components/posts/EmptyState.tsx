import React from "react";
import { IconProps } from "../../types";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<IconProps>;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  icon: Icon,
}) => {
  return (
    <div className="c-empty">
      <div className="c-empty__container">
        {Icon && (
          <div className="c-empty__icon">
            <Icon />
          </div>
        )}
        <div className="c-empty__content">
          <h2 className="c-empty__title">{title}</h2>
          {subtitle && <p className="c-empty__subtitle">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
