import React from "react";
import { TGridBoxProps } from "./types";

function GridBox(gridprops: TGridBoxProps) {
    const listItems = gridprops.elements.map((item) =>
        item.element
    );
    let gridSettings = ['grid', 'grid-flow-row', [' grid-col-',gridprops.columns?.toString].join("") , ' gap-2 m-2'].join(" ");
    gridSettings = [].join( "");
        
    
    return (
        <div
            className="bg-slate-700"
        >
            <p
                className="text-black"
            >
                {gridprops.title}
            </p>
            <div
                className={gridSettings}
            >
                {listItems}
            </div>        
        </div>

    );
}

export default GridBox;