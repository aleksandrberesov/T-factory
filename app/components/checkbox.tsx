import React from "react";
import Circle from "./circle";
import Rectangle from "./rectangle";
import { TCheckBoxProps } from "./types";

function CheckBox(checkprops: TCheckBoxProps) {
    return (
        <div className="grid grid-cols-3 gap-1">
            <Circle cx={50} cy={50} r={40} stroke="black" fill="#EADDFF" text={checkprops.title.charAt(0)}/>
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
                fill="grey" 
                iconURL="/icons/check.svg" 
            />
        </div>
        
    );
}

export default CheckBox;