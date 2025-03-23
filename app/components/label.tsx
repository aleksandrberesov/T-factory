import React from "react";
import { TLabelProps } from "./types";

function LabelBox(labelprops: TLabelProps) {
    const textColorClass = labelprops.textcolor ? `text-${labelprops.textcolor}` : "text-black";
    return (
        <div
            className="flex justify-between w-full"
        >
            {labelprops.title && (<p className={textColorClass}>{labelprops.title}</p>)}
            {labelprops.title && (labelprops.value !== undefined && labelprops.value !== null) && (<p> </p>)}
            {(labelprops.value !== undefined && labelprops.value !== null) && (
                <p className={textColorClass}>
                    {labelprops.value}{labelprops.symbol && " "}{labelprops.symbol && labelprops.symbol}
                </p>
            )}
        </div>
    );
}

export default LabelBox;