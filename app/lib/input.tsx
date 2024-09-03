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
            //style={{ backgroundColor: buttonprops.backgroundcolor, color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
            //onClick={buttonprops.onclick}
            type = "text"       
            value = {value}
            onChange={handleChange}
        />
    );
}

export default InputTab;