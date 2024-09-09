import React from "react";
import { TLabelProps } from "./types";

function LabelBox(labelprops: TLabelProps) {
    return (
        <p
            className="text-black"
        >
            {labelprops.title} {labelprops.value} {labelprops.symbol}
        </p>
    );
}

export default LabelBox;