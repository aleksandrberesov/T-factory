import { useEffect } from 'react';

const useResponsiveFontSize = (
    containerRef: React.RefObject<HTMLElement>,
    threshold: number,
    onSmall: () => void,
    onLarge: () => void
) => {
    useEffect(() => {
        const adjustFontSize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                if (containerWidth < threshold) {
                    containerRef.current.classList.add('small-font');
                    onSmall();
                } else {
                    containerRef.current.classList.remove('small-font');
                    onLarge();
                }
            }
        };

        const handleResize = () => {
            requestAnimationFrame(adjustFontSize);
        };

        adjustFontSize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [containerRef, threshold, onSmall, onLarge]);
};

export default useResponsiveFontSize;
