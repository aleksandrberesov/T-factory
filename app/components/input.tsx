import React, { useRef, useEffect, useState } from 'react';
import './input.css';

interface LabeledInputProps {
    id: string;
    title?: string;
    description?: string;
    type: string;
    value: number;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ id, title, description, type, value, placeholder, onChange }) => {
    const [inputWidth, setInputWidth] = useState<string>('auto');
    const spanRef = useRef<HTMLSpanElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (spanRef.current && labelRef.current && inputRef.current) {
            const labelFontSize = window.getComputedStyle(labelRef.current).fontSize;
            const padding = parseFloat(labelFontSize) * 1.1;
            const newWidth = `${spanRef.current.offsetWidth + padding}px`;
            setInputWidth(newWidth);
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
                className="dynamic-width-input"
            />
            <span ref={spanRef} className="hidden-span">
                {value}
            </span>
            {description && <span id={`${id}-desc`} className="input-description">{description}</span>}
        </div>
    );
};

export default LabeledInput;