import React from "react";
import { TLabelProps } from "./types";

function LabelBox(labelprops: TLabelProps) {
    const textColorClass = labelprops.textcolor ? `text-${labelprops.textcolor}` : "text-black";
    return (
        <div
            className="flex justify-between"
        >
            <div
                className={textColorClass}
            >
                {labelprops.title}
            </div>
            <div
                className={textColorClass}
            >
                {labelprops.value}{" "}{labelprops.symbol}
            </div>  
        </div>
    );
}

export default LabelBox;