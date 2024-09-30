import React, { useState, useRef, useEffect } from 'react';

interface TrackBarProps {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
  }

const TrackBar: React.FC<TrackBarProps> = ({ value, max, onChange }) => {
  const [dragValue, setDragValue] = useState(value);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDragValue(value);
  }, [value]);

  const handleMouseMove = (e: MouseEvent) => {
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const newValue = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
      setDragValue(newValue/1.52);
      onChange((newValue / rect.width) * max);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const percentage = (dragValue / max) * 100;

  return (
    <div
      className="w-full bg-gray-200 rounded-full h-4 relative"
      ref={trackRef}
      onMouseDown={handleMouseDown}
    >
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
      <div
        className="w-4 h-4 bg-blue-700 rounded-full absolute top-0 cursor-pointer"
        style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
      ></div>
    </div>
  );
};
  
const VerticalTrackbar: React.FC<TrackBarProps> = ({ min, max, step, value, onChange }) => {
    const [dragging, setDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
  
    const handleMouseMove = (event: MouseEvent) => {
      if (dragging && trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const newValue = Math.min(Math.max(min, ((rect.bottom - event.clientY) / rect.height) * (max - min) + min), max);
        console.log('New Value:', newValue); // Debugging line
        onChange(Math.round(newValue / step) * step);
      }
    };
  
    const handleMouseUp = () => {
      setDragging(false);
      console.log('Mouse Up'); // Debugging line
    };
  
    useEffect(() => {
      if (dragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [dragging, handleMouseMove]);
  
    const handleMouseDown = () => {
      setDragging(true);
      console.log('Mouse Down'); // Debugging line
    };
  
    const percentage = ((value - min) / (max - min)) * 100;
  
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full mb-2">
          <span className="text-gray-700">{min}</span>
          <span className="text-gray-700">{max}</span>
        </div>
        <div
          ref={trackRef}
          className="w-2 h-64 bg-gray-200 rounded-lg relative cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          <div
            className="w-2 bg-blue-500 rounded-lg absolute"
            style={{ height: `${percentage}%`, bottom: 0 }}
          ></div>
          <div
            className="w-4 h-4 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2"
            style={{ bottom: `${percentage}%` }}
          ></div>
        </div>
        <span className="mt-2 text-gray-700">{value}</span>
      </div>
    );
  };

export { TrackBar, VerticalTrackbar};
