import React from "react";
import { TLabelProps } from "./types";

function LabelBox(labelprops: TLabelProps) {
    return (
        <div
            className="flex justify-between"
        >
            <div
                className="text-black"
            >
                {labelprops.title}
            </div>
            <div
                className="text-black"
            >
                {labelprops.value}{labelprops.symbol}
            </div>  
        </div>
    );
}

export default LabelBox;