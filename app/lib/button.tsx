import React from "react";
import Image from "next/image";
import { TButtonProps } from "./lib_types"

function SelectedTab(buttonprops: TButtonProps) {
    if (buttonprops.icon_image !== undefined){
        return (
            <button
                style={{ backgroundColor: buttonprops.backgroundcolor, color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
                onClick={buttonprops.onclick}
            >
                <Image src={buttonprops.icon_image} alt="Play" width="50" height="50" />
            </button>
        );
    }else{
        return (
            <button
                style={{ backgroundColor: buttonprops.backgroundcolor, color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
                onClick={buttonprops.onclick}
            >
                {buttonprops.title}
            </button>
        );
    }
}

export default SelectedTab;
