import React from 'react';
import Image from "next/image";
import {TRectangleProps} from "./types"

function Rectangle  (rectprops: TRectangleProps) {
  return (
    <div className='text-black flex justify-center items-center'>
    <svg width={rectprops.width} height={rectprops.height}>
      <rect x={rectprops.x} y={rectprops.y} width={rectprops.width} height={rectprops.height} stroke={rectprops.stroke} fill={rectprops.fill} />
      <image href={rectprops.iconURL} width={rectprops.width} height={rectprops.height} />
    </svg>
    </div>
  );
};

export default Rectangle;
