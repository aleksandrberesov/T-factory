import React from "react";
import { TGridBoxProps } from "./types";
import './gridbox.css';

const GridBox: React.FC<TGridBoxProps> = ({title, elements, columns = 1, rows = 1, showBorders}) => {
    let filledCells = 0;
    const occupiedCells: boolean[][] = Array.from({ length: rows }, () => Array(columns).fill(false));
    const extraElements: { element: JSX.Element, index: number }[] = [];

    const listItems = elements?.map((item, index) => {
        const colSpan = item.columnSpan ?? 1;
        const rowSpan = item.rowSpan ?? 1;

        if (item.row == undefined || item.column == undefined) {
            extraElements.push({ element: (
                <div key={index} className={`grid-item ${showBorders ? 'border' : ''}`}>
                    {item.element}
                </div>
            ), index });
            return null;
        } else {
            filledCells += colSpan * rowSpan;

            for (let r = item.row - 1; r < item.row - 1 + rowSpan; r++) {
                if (r >= rows) continue; // Ensure row is within bounds
                for (let c = item.column - 1; c < item.column - 1 + colSpan; c++) {
                    if (c >= columns) continue; // Ensure column is within bounds
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

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (!occupiedCells[r][c]) {
                const extraElement = extraElements.shift();
                listItems.push(
                    extraElement?.element || (
                        <div key={`empty-${r}-${c}`} className={`grid-item ${showBorders ? 'border' : ''}`} style={{ gridColumn: c + 1, gridRow: r + 1 }}>
                            {/* Empty cell */}
                        </div>
                    )
                );
            }
        }
    }

    // Sort listItems according to row and column
    listItems.sort((a, b) => {
        if (!a || !b) return 0; // Handle null values
        const aRow = parseInt(String(a.props.style.gridRow).split(' ')[0]);
        const aCol = parseInt(String(a.props.style.gridColumn).split(' ')[0]);
        const bRow = parseInt(String(b.props.style.gridRow).split(' ')[0]);
        const bCol = parseInt(String(b.props.style.gridColumn).split(' ')[0]);

        if (aRow === bRow) {
            return aCol - bCol;
        }
        return aRow - bRow;
    });

    const gridSettings = [
        'w-full h-full',
        'grid',
        'grid-flow-row',
        `grid-cols-${columns}`,
        `grid-rows-${rows}`,
        'gap-1', // Add gaps between items
        'm-0' // Remove margins
    ].join(' ');

    return (
        <div className="gridbox-container w-full h-full">
            {title && (<p className="gridbox-title">{title}</p>)}
            <div className={gridSettings}>{listItems}</div>
        </div>
    );
}

export default GridBox;