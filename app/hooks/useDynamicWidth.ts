import { useEffect } from 'react';

const useDynamicWidth = (
    spanRef: React.RefObject<HTMLSpanElement>,
    elementRef: React.RefObject<HTMLElement>, 
    value: number | string
) => {
    useEffect(() => {
        const fontCoef = 1.4;
        if (spanRef.current && elementRef.current) {
            const labelFontSize = window.getComputedStyle(elementRef.current).fontSize;
            const padding = parseFloat(labelFontSize) * fontCoef;
            const newWidth = `${spanRef.current.offsetWidth + padding}px`;
            (elementRef.current as HTMLElement).style.width = newWidth;
        }
    }, [value, spanRef, elementRef]);
};

export default useDynamicWidth;
