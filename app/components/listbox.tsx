import React from "react";
import { TListBoxProps } from "./types";

function ListBox(listprops: TListBoxProps) {
    const listItems = listprops.elements.map((item, index) =>
        <li key={index}>{item.element}</li>
    );

    return (
        <div>
            <p className="text-black" > {listprops.title} </p>
            <ul>{listItems}</ul>        
        </div>

    );
}

export default ListBox;