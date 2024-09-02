// VerticalSlider.js
import React, { useState, useRef, useEffect } from 'react';
import './millilitre_scale_component.css'; // Import CSS for styling

const VerticalSlider = ({ min = 0, max = 500, step = 1, buttonLabel = "" }) => {
  const [value, setValue] = useState(min);
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleStart = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleMove = (e) => {
    if (!dragging || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const sliderHeight = sliderRect.height;
    const sliderTop = sliderRect.top;

    // Handle touch events
    const clientY = e.clientY || e.touches[0].clientY;

    // Calculate new value
    const newValue = max - ((clientY - sliderTop) / sliderHeight) * (max - min);
    
    // Round and clamp the new value to ensure it's within the min and max range
    const roundedValue = Math.round(newValue / step) * step;
    const clampedValue = Math.min(max, Math.max(min, roundedValue));

    if (!isNaN(clampedValue)) {
      setValue(clampedValue);
    }
  };

  const handleEnd = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove); // For mobile touch
      document.addEventListener('touchend', handleEnd);   // For mobile touch
    } else {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove); // For mobile touch
      document.removeEventListener('touchend', handleEnd);   // For mobile touch
    }

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove); // For mobile touch
      document.removeEventListener('touchend', handleEnd);   // For mobile touch
    };
  }, [dragging]);

  return (
    <div className="slider-container">
      <button className="slider-button" onClick={() => console.log(value)}>
        {buttonLabel}
      </button>
      <div
        className="vertical-slider"
        onMouseDown={handleStart}
        onTouchStart={handleStart} // For mobile touch
        ref={sliderRef}
      >
        <div className="slider-track">
          <div
            className="slider-thumb"
            style={{ bottom: `${((value - min) / (max - min)) * 100}%` }}
          />
        </div>
        <div className="slider-value">{value}ml</div>
      </div>
    </div>
  );
};

export default VerticalSlider;

