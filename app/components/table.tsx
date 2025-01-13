import React from 'react';
import { TTableBoxProps } from './types';

const TableBox: React.FC<TTableBoxProps> = ({ elements }) => {
    return (
        <table className='min-w-full min-h-fit w-full h-full'>
            <tbody>
                {elements.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell !== null ? cell : <span>&nbsp;</span>}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableBox;