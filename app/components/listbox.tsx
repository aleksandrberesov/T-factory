import React from "react";
import { TListBoxProps } from "./types";

function ListBox(props: TListBoxProps) {
    const listItems = props.elements.map((item, index) =>
        <li key={index}>{item}</li>
    );

    return (
        <div style={{ backgroundColor: props.backgroundColor || 'transparent' }}>
            <p className="text-black" > {props.title} </p>
            <ul>{listItems}</ul>        
        </div>

    );
}

export default ListBox;