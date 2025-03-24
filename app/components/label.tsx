import React, { useRef, useState } from "react";
import { TLabelProps } from "./types";
import useResponsiveFontSize from "../hooks/useResponsiveFontSize";
import useDynamicWidth from "../hooks/useDynamicWidth";

const LabelBox: React.FC<TLabelProps> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const valueRef = useRef<HTMLParagraphElement>(null);
    const [useShortTitle, setUseShortTitle] = useState(false);

    useResponsiveFontSize(containerRef, 50, () => setUseShortTitle(true), () => setUseShortTitle(false));
    useDynamicWidth(spanRef, valueRef, props.value || "");

    const textColorClass = props.textcolor ? `text-${props.textcolor}` : "text-black";

    return (
        <div
            className="flex justify-between w-full"
            ref={containerRef}
        >
            {props.title && (
                <p className={textColorClass}>
                    {useShortTitle ? props.title.slice(0, 3) : props.title}
                </p>
            )}
            {props.title && (props.value !== undefined && props.value !== null) && (<p> </p>)}
            {(props.value !== undefined && props.value !== null) && (
                <p ref={valueRef} className={textColorClass}>
                    <span ref={spanRef} className="hidden-span">
                        {props.value}
                    </span>
                    <span style={{ whiteSpace: "nowrap" }}>
                        {props.value}{props.symbol && " "}{props.symbol && props.symbol}
                    </span>
                </p>
            )}
        </div>
    );
}

export default LabelBox;