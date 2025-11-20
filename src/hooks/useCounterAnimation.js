import { useState, useEffect } from "react";

export const useCounterAnimation = (targetValue, duration = 2000, shouldStart = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startValue = 0;
    const increment = targetValue / (duration / 16); // 16ms per frame (60fps)
    let animationFrameId;

    const animate = () => {
      startValue += increment;
      if (startValue >= targetValue) {
        setCount(targetValue);
      } else {
        setCount(Math.floor(startValue));
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetValue, duration, shouldStart]);

  return count;
};
