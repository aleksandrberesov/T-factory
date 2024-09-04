import React, {useState, ChangeEvent} from "react";
import { TButtonProps } from "./lib_types"
import { number } from "@telegram-apps/sdk";

function InputTab(buttonprops: TButtonProps) {
    const [value, setValue] = useState(buttonprops.title);
    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    return (
        <input
            style={{ backgroundColor: buttonprops.backgroundcolor, color: 'black'}}
            //onClick={buttonprops.onclick}
            className=""
            type = "text"       
            value = {value}
            onChange={handleChange}
        />
    );
}

export default InputTab;