import React from "react";
import Image from "next/image";
import { TButtonProps } from "./lib_types"

function SelectedTab(buttonprops: TButtonProps) {
    function GetContent(isIcon: boolean){
        if (isIcon){
            return(<img src={buttonprops.icon_image} alt="icon" width="50" height="50"></img>);   
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

    return (
        <button
            style={{ backgroundColor: buttonprops.backgroundcolor, color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
            onClick={Doclick}
            className={buttonprops.style}
        >
            {GetContent(buttonprops.icon_image !== undefined)}
        </button>
    );
}

export default SelectedTab;
