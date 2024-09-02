'use client';

import React from "react";

type TOnClickFunction = () => void;

type TButtonProps = {
    title : string | number;
    backgroundcolor ?: string;
    onclick ?: TOnClickFunction;
};

type TTitle = string | number;

function SelectedTab(buttonprops: TButtonProps) {
    return (
        <button
            style={{ backgroundColor: buttonprops.backgroundcolor, color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
            onClick={buttonprops.onclick}
        >
        {buttonprops.title}
        </button>
    );
}

export default SelectedTab;
