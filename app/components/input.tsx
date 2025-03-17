import React, { useRef, useEffect, useState } from 'react';
import './input.css';

interface LabeledInputProps {
    id: string;
    title?: string;
    shortTitle?: string;
    description?: string;
    type: string;
    value: number | string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    textColor?: string; // New property for text color
}

const LabeledInput: React.FC<LabeledInputProps> = ( props ) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [useShortTitle, setUseShortTitle] = useState(false);

    useEffect(() => {
        const fontCoef = 1.4; // Adjust this value to make the input wider
        if (spanRef.current && labelRef.current && inputRef.current) {
            const labelFontSize = window.getComputedStyle(labelRef.current).fontSize;
            const padding = parseFloat(labelFontSize) * fontCoef;
            const newWidth = `${spanRef.current.offsetWidth + padding}px`;
            inputRef.current.style.width = newWidth;
        }
    }, [props.value]);

    useEffect(() => {
        const adjustFontSize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                if (containerWidth < 200) {
                    containerRef.current.classList.add('small-font');
                    setUseShortTitle(true);
                } else {
                    containerRef.current.classList.remove('small-font');
                    setUseShortTitle(false);
                }
            }
        };

        const handleResize = () => {
            requestAnimationFrame(adjustFontSize);
        };

        adjustFontSize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="input-group" ref={containerRef}>
            {props.title && (
                <label 
                    ref={labelRef} 
                    htmlFor={props.id} 
                    style={{ color: props.textColor }}
                >
                    {useShortTitle ? (props.shortTitle || props.title?.slice(0, 3)) : props.title}
                </label>
            )}
            <input
                ref={inputRef}
                id={props.id}
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                style={{ color: props.textColor }} 
                className="dynamic-width-input input-background"
            />
            <span ref={spanRef} className="hidden-span">
                {props.value}
            </span>
            {props.description && <span id={`${props.id}-desc`} className="input-description">{props.description}</span>}
        </div>
    );
};

export default LabeledInput;