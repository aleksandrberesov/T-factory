import React from "react";
import Image from "next/image";
import { TButtonProps } from "./types"

function SelectedTab(buttonprops: TButtonProps) {
    function GetContent(isIcon: boolean){
        if (isIcon){
            return(<Image src={buttonprops.icon_image!} alt="icon" width="50" height="50"/>);   
        }else{
            return(buttonprops.title);
        }
    };

    function Doclick(){
        if (buttonprops.onclick !== undefined){
            buttonprops.onclick();
        }   
        if ((buttonprops.onselected !== undefined) && (buttonprops.id !== undefined)){
            buttonprops.onselected(buttonprops.id);
        } 
    };

    const buttonstyle = [buttonprops.style, "flex", "items-center", "justify-center" ].join(" ");
    return (
        <button
            style={{ backgroundColor: buttonprops.backgroundcolor, color: buttonprops.textcolor, padding: '10px 20px', border: 'none', borderRadius: '5px' }}
            onClick={Doclick}
            className={buttonstyle}
        >
            {GetContent(buttonprops.icon_image !== undefined)}
        </button>
    );
}

export default SelectedTab;
