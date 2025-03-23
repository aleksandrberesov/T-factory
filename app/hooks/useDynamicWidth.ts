import { useEffect } from 'react';

const useDynamicWidth = (
    spanRef: React.RefObject<HTMLSpanElement>,
    inputRef: React.RefObject<HTMLInputElement>,
    value: number | string
) => {
    useEffect(() => {
        const fontCoef = 1.4;
        if (spanRef.current && inputRef.current) {
            const labelFontSize = window.getComputedStyle(inputRef.current).fontSize;
            const padding = parseFloat(labelFontSize) * fontCoef;
            const newWidth = `${spanRef.current.offsetWidth + padding}px`;
            inputRef.current.style.width = newWidth;
        }
    }, [value, spanRef, inputRef]);
};

export default useDynamicWidth;
