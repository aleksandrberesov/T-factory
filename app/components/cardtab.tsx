import React from "react";
import Image from "next/image";
import { TCardTabProps } from "./types"

function CardTab(cardprops: TCardTabProps) {
    return (
        <div className='grid grid-rows-2 grid-flow-col gap-1 m-1'>
            <div
                className=""
            >
                <p>
                    {cardprops.title}
                </p>
            </div>
            <div
                className="row-span-2"
            >
                <p>
                    {cardprops.description}
                </p>
            </div>
            <div>

            </div>
        </div>
    );
};

export default CardTab;