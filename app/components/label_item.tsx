import React from "react";
import { TLabelProps } from "./types";

function LabelItem(labelprops: TLabelProps) {
    return (
        <p
            className="text-black"
        >
            {labelprops.title} {labelprops.value} {labelprops.unit}
        </p>
    );
}

export default LabelItem;