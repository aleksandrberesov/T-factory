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

    return (
        <div className="listbox-container bg-gray-200">
            <p className="w-full text-black" > {props.title} </p>
            <ul>{listItems}</ul>        
        </div>

    );
}

export default ListBox;