import React from "react";
import Circle from "./circle";
import Rectangle from "./rectangle";
import { TCheckBoxProps } from "./types";

function CheckBox(checkprops: TCheckBoxProps) {
    const Letter = (checkprops.title || '').charAt(0);
    return (
        <div className="grid grid-cols-3 gap-1 text-3xl">
            <Circle cx={50} cy={50} r={40} stroke="black" fill="#EADDFF" text={Letter}/>
            <p
                className="text-black flex justify-center items-center"
            >
                {checkprops.title}{checkprops.is_checked}
            </p>
           <Rectangle 
                x={0} 
                y={0}
                width={50} 
                height={50} 
                stroke="black" 
                fill="#3D3D3D" 
                iconURL="/icons/check.svg" 
            />
        </div>
        
    );
}

export default CheckBox;