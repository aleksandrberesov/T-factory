import React from "react";
import { TLabelProps } from "./types";

function LabelItem(labelprops: TLabelProps) {
    return (
        <p
            className="text-black"
        >
            {labelprops.title} {labelprops.value} {labelprops.symbol}
        </p>
    );
}

export default LabelItem;