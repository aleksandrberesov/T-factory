import React from "react";
import { TLabelProps } from "./types";

const LabelBox: React.FC<TLabelProps> = (props) => {
    const textColorClass = props.textcolor ? `text-${props.textcolor}` : "text-black";
    return (
        <div
            className="flex justify-between w-full"
        >
            {props.title && (<p className={textColorClass}>{props.title}</p>)}
            {props.title && (props.value !== undefined && props.value !== null) && (<p> </p>)}
            {(props.value !== undefined && props.value !== null) && (
                <p className={textColorClass}>
                    {props.value}{props.symbol && " "}{props.symbol && props.symbol}
                </p>
            )}
        </div>
    );
}

export default LabelBox;