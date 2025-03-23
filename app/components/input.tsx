import React, { useRef, useEffect, useState } from 'react';
import './input.css';
import useResponsiveFontSize from '../hooks/useResponsiveFontSize';
import useDynamicWidth from '../hooks/useDynamicWidth';

type LabeledInputProps = {
    id: string;
    title?: string;
    shortTitle?: string;
    description?: string;
    type: string;
    value: number | string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    textColor?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ( props ) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [useShortTitle, setUseShortTitle] = useState(false);

    useResponsiveFontSize(containerRef, 200, () => setUseShortTitle(true), () => setUseShortTitle(false));
    useDynamicWidth(spanRef, inputRef, props.value);

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