
import React, { useState, useRef, useEffect } from 'react';
import './millilitre_scale_styling.css';

const MAX_VALUE = 500; // The highest value of the scale
const SCALE_HEIGHT = 272; // The height of the scale in pixels
 
const VerticalScale = () => {
  const [level, setLevel] = useState(0);
  const [dragging, setDragging] = useState(false);
  const scaleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      const scaleRect = scaleRef.current.getBoundingClientRect();
      const offset = e.clientY - scaleRect.top;
      const newLevel = Math.min(
        Math.max(0, offset),
        scaleRect.height - 30 // Adjust if your toggle height changes
      );
      setLevel(newLevel);
    };

    const handleMouseUp = () => {
      setDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default behavior
    setDragging(true);
  };

  const calculateValue = (level) => {
    // Map pixel position to the range 0 - MAX_VALUE
    return Math.round(((SCALE_HEIGHT - level) / SCALE_HEIGHT) * MAX_VALUE);
  };

  const handlePrintLevel = () => {
    console.log(`Current level: ${calculateValue(level)}`);
  };

  return (
    <div className="scale-container" ref={scaleRef}>
      <div
        className="scale-toggle"
        style={{ top: level }}
        onMouseDown={handleMouseDown}
      />
      <div className="level-display" style={{ top: level }}>
        {calculateValue(level)}
      </div>
      <button onClick={handlePrintLevel} className="print-button">
        Print Level
      </button>
    </div>
  );
};

export default VerticalScale;
  //