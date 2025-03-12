import React from "react";
import { TGridBoxProps } from "./types";
import './gridbox.css';
import BaseComponent from "./base-component";

const GridBox: React.FC<TGridBoxProps> = ({title, elements, columns, rows, showBorders}) => {
    const numbercolumns = columns ?? 1;
    const numberrows = rows ?? 1;
    const occupiedCells: boolean[][] = Array.from({ length: numberrows }, () => Array(numbercolumns).fill(false));
    const unAssignedElements: { element: React.ReactNode, index: number }[] = [];

    const listItems = elements?.map((item, index) => {
        const colSpan = item.columnSpan ?? 1;
        const rowSpan = item.rowSpan ?? 1;

        if (item.row == undefined || item.column == undefined) {
            unAssignedElements.push({ element: item.element, index });
            return null;
        } else {
            if (item.row < 1 || item.column < 1) return null; // Ensure row and column are positive
            for (let r = item.row - 1; r < item.row - 1 + rowSpan; r++) {
                if (r >= numberrows) continue; // Ensure row is within bounds
                for (let c = item.column - 1; c < item.column - 1 + colSpan; c++) {
                    if (c >= numbercolumns) continue; // Ensure column is within bounds
                    occupiedCells[r][c] = true;
                }
            }

            const style = {
                gridColumn: `${item.column} / span ${colSpan}`,
                gridRow: `${item.row} / span ${rowSpan}`,
            };
            return (
                <div key={index} className={`grid-item ${showBorders ? 'border' : ''}`} style={style}>
                    {item.element}
                </div>
            );   
        }
    }).filter(Boolean) || [];

    for (let r = 0; r < numberrows; r++) {
        for (let c = 0; c < numbercolumns; c++) {
            if (!occupiedCells[r][c]) {
                const extraElement = unAssignedElements.shift();
                let style = {
                    gridColumn: `${c+1} / span ${1}`,
                    gridRow: `${r+1} / span ${1}`,
                };
                listItems.push(
                    <div 
                        key={`empty-${r}-${c}`} 
                        className={`grid-item ${showBorders ? 'border' : ''}`} 
                        style={style}
                    >
                        {extraElement?.element || <BaseComponent align="stretch"/>}
                    </div>
                );
            }
        }
    }

    const gridSettings = [
        'gridbox-grid',
        `grid-cols-${columns}`,
        `grid-rows-${rows}`
    ].join(' ');

    return (
        <div className="gridbox-container">
            {title && (<p className="gridbox-title">{title}</p>)}
            <div className={gridSettings}>{listItems}</div>
        </div>
    );
}

export default GridBox;