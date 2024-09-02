// VerticalSlider.js
import React, { useState, useRef, useEffect } from 'react';
import './testingStyle.css'; // Import CSS for styling

const VerticalSlider = ({ min = 0, max = 500, step = 1, buttonLabel = "" }) => {
  const [value, setValue] = useState(min);
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const sliderHeight = sliderRect.height;
    const sliderTop = sliderRect.top;
    const newValue = Math.min(max, Math.max(min, max - ((e.clientY - sliderTop) / sliderHeight) * (max - min)));
    setValue(Math.round(newValue / step) * step);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  // Function to handle button click
  const handleButtonClick = () => {
    console.log(value);
  };

  return (
    <div className="slider-container">
      <button className="slider-button" onClick={handleButtonClick}>
        {buttonLabel}
      </button>
      <div
        className="vertical-slider"
        onMouseDown={handleMouseDown}
        ref={sliderRef}
      >
        <div className="slider-track">
          <div
            className="slider-thumb"
            style={{ bottom: `${((value - min) / (max - min)) * 100}%` }}
          />
        </div>
        <div className="slider-value">{value}</div>
      </div>
    </div>
  );
};

export default VerticalSlider;
