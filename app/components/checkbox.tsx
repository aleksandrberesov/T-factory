import React from "react";
import { TCheckBoxProps } from "./types";

function CheckBox(checkprops: TCheckBoxProps) {
    return (
        <p
            className="text-black"
        >
            {checkprops.title}{checkprops.is_checked}
        </p>
    );
}

export default CheckBox;