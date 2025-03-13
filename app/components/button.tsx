import React from "react";
import Image from "next/image";
import { TButtonProps } from "./types";
import './button.css';

function SelectedTab(buttonprops: TButtonProps) {
    function GetContent(isIcon: boolean){
        if (isIcon){
            return(<Image src={buttonprops.icon_image!} alt="icon" width="30" height="30" priority/>);   
        }else{
            return(buttonprops.title);
        }
    };

    function Doclick(){
        if (buttonprops.onclick !== undefined){
            buttonprops.onclick();
        }   
        if ((buttonprops.onselected !== undefined) && (buttonprops.id !== undefined)){
            if (typeof buttonprops.id !== "string"){
                buttonprops.onselected(Number(buttonprops.id));
            }
        } 
    };

    const buttonstyle = [
        buttonprops.style, 
        "selected-tab",
        "w-fUll",
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
