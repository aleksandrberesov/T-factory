import React from "react";
import { TListBoxProps } from "./types";
import './styles/listbox.css';

function ListBox(props: TListBoxProps) {
    const listItems = props.elements.map((item, index) =>
        <li className="listbox-item" key={index}>
            <div className="" style={{ backgroundColor: props.backgroundColor || 'transparent' }}>
                {item}
            </div>
        </li>
    );

    const containerStyle: React.CSSProperties = {
        maxHeight: 'auto',
        overflowY: 'auto',
    };

    return (
        <div className="listbox-container h-full w-full bg-gray-200" style={containerStyle}>
            <p className="w-full text-black">{props.title}</p>
            <ul className="">{listItems}</ul>        
        </div>
    );
}

export default ListBox;