import React, { ReactNode } from 'react';

interface ScrollBoxProps {
  children: ReactNode;
}

const ScrollBox: React.FC<ScrollBoxProps> = ({ children }) => {
  return (
    <div className="w-72 h-48 overflow-y-scroll border border-gray-300 p-2">
      {children}
    </div>
  );
};

export default ScrollBox;