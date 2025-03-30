import React from "react";
import Image from "next/image";
import { TButtonProps } from "./types";
import './styles/button.css';

function SelectedTab(buttonprops: TButtonProps) {
    function GetContent(isIcon: boolean){
        if (isIcon){
            return(<Image src={buttonprops.icon_image!} alt="icon" width="30" height="30" priority/>);   
        }else{
            return(buttonprops.title);
        }
    };

    function Doclick(){
        if (buttonprops.onClick){ buttonprops.onClick(); }   
        if ((buttonprops.onSelected) && (buttonprops.id!==undefined)){ buttonprops.onSelected(buttonprops.id); } 
    };

    const buttonstyle = [
        buttonprops.style, 
        buttonprops.extraClasses,
        "selected-tab",
        "w-full", // Corrected class name
        "h-full"
    ].join(" ");
    return (
        <button
            style={{ backgroundColor: buttonprops.backgroundcolor, color: buttonprops.textcolor }}
            onClick={Doclick}
            className={buttonstyle}
        >
            {GetContent(buttonprops.icon_image !== undefined)}
        </button>
    );
}

export default SelectedTab;
