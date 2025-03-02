import React from "react";
import { TGridBoxProps } from "./types";
import './gridbox.css';

function GridBox(gridprops: TGridBoxProps) {
    const listItems = gridprops.elements.map((item, index) => (
        <div key={index} className="grid-item">
            {item.element}
        </div>
    ));

    const gridSettings = [
        'grid',
        'grid-flow-row',
        `grid-cols-${gridprops.columns || 1}`,
        `grid-rows-${gridprops.rows || 'auto'}`,
        'gap-2',
        'm-2'
    ].join(' ');

    return (
        <div className="gridbox-container">
            {gridprops.title && (
                <p className="gridbox-title">
                    {gridprops.title}
                </p>
            )}
            <div className={gridSettings}>
                {listItems}
            </div>
        </div>
    );
}

export default GridBox;