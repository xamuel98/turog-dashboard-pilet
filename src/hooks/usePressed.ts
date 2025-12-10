import { useState } from "react";

/**
 * @description Press state hook for buttons
 * @returns {UsePressedReturn}
 */

interface UsePressedReturn {
  isPressed: boolean;
  pressHandlers: {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
  };
}

export const usePressed = (): UsePressedReturn => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const pressHandlers = {
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onMouseLeave: () => setIsPressed(false),
    onTouchStart: () => setIsPressed(true),
    onTouchEnd: () => setIsPressed(false),
  };

  return { isPressed, pressHandlers };
};
