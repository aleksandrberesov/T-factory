import React from "react";
import { TOnClickFunction, TOnSelectedFunction } from "../models/types"

type TButtonProps = {
    id  ?: number;
    title ?: string;
    icon_image ?: string;
    backgroundcolor ?: string;
    onclick ?: TOnClickFunction;
    onselected ?: TOnSelectedFunction;
    style ?: string;
};

type TLabelProps = {
    title : string;
    value ?: string | number;
    symbol ?: string;    
};

type TCheckBoxProps = {
   title : string;
   description ?: string;
   is_checked ?: boolean;
};

type TListBoxProps = {
    title : string;
    elements : {id: number; element: React.JSX.Element}[]
};

export type { TButtonProps, TLabelProps, TCheckBoxProps, TListBoxProps } ;