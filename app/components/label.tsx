import React from "react";
import { TLabelProps } from "./types";

function LabelBox(labelprops: TLabelProps) {
    const textColorClass = labelprops.textcolor ? `text-${labelprops.textcolor}` : "text-black";
    return (
        <div
            className="flex justify-between"
        >
            {labelprops.title && (<p className={textColorClass}>{labelprops.title}</p>)}
            <p> </p>
            {labelprops.value && (<p className={textColorClass}>{labelprops.value}{" "}{labelprops.symbol && labelprops.symbol}</p>)} 
        </div>
    );
}

export default LabelBox;