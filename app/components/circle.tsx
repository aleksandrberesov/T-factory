import React from 'react';
import { TCircleProps } from './types';

function Circle (circleprops: TCircleProps){
    return (
    <svg width="100" height="100">
        <circle cx={circleprops.cx} cy={circleprops.cy} r={circleprops.r} stroke={circleprops.stroke} fill={circleprops.fill} />
        <text x={circleprops.cx} y={circleprops.cy} textAnchor="middle" dy=".3em" fontSize="20" fill={circleprops.stroke}>
        {circleprops.text}
        </text>
    </svg>
);
};

export default Circle;