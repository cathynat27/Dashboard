import React, { useState } from "react";
import { useCounterAnimation } from "../../hooks/useCounterAnimation";

const AnimatedCounter = ({ number, label, icon }) => {
  // Extract numeric value from string (e.g., "500+" -> 500, "10K+" -> 10000, "200+" -> 200, "4" -> 4)
  const parseNumber = (str) => {
    if (typeof str !== "string") return 0;
    
    const numStr = str.replace(/[^0-9]/g, "");
    const value = parseInt(numStr, 10);
    
    if (str.includes("K")) {
      return value * 1000;
    }
    return value;
  };

  const [isInView, setIsInView] = useState(false);
  const targetValue = parseNumber(number);
  const count = useCounterAnimation(targetValue, 2000, isInView);

  // Intersection Observer to trigger animation when component comes into view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    const currentElement = document.getElementById(`counter-${label}`);
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [label]);

  // Format the display value
  const formatDisplay = () => {
    if (number.includes("K")) {
      return count >= 1000 ? `${(count / 1000).toFixed(0)}K+` : count;
    }
    if (number.includes("+")) {
      return `${count}+`;
    }
    return count;
  };

  return (
    <div id={`counter-${label}`} className="widgetCard p-6 text-center bg-white">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-3xl font-bold text-blue-600 mb-2">
        {formatDisplay()}
      </div>
      <div className="text-gray-700 font-medium">{label}</div>
    </div>
  );
};

export default AnimatedCounter;
