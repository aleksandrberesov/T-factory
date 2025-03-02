import React, { useRef, useEffect, useState } from 'react';
import './input.css';

interface LabeledInputProps {
    id: string;
    title?: string;
    description?: string;
    type: string;
    value: number | string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ id, title, description, type, value, placeholder, onChange }) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fontCoef = 1.4; // Adjust this value to make the input wider
        if (spanRef.current && labelRef.current && inputRef.current) {
            const labelFontSize = window.getComputedStyle(labelRef.current).fontSize;
            const padding = parseFloat(labelFontSize) * fontCoef;
            const newWidth = `${spanRef.current.offsetWidth + padding}px`;
            inputRef.current.style.width = newWidth;
        }
    }, [value]);

    return (
        <div className="input-group">
            {title && <label ref={labelRef} htmlFor={id}>{title}</label>}
            <input
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="dynamic-width-input input-background"
            />
            <span ref={spanRef} className="hidden-span">
                {value}
            </span>
            {description && <span id={`${id}-desc`} className="input-description">{description}</span>}
        </div>
    );
};

export default LabeledInput;