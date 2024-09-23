import React from "react";
import { TOnClickFunction, TOnSelectedFunction } from "../libs/lib.types"

type TButtonProps = {
    id  ?: number | string;
    title ?: string;
    
    backgroundcolor ?: string;
    textcolor ?: string;
    style ?: string;

    onclick ?: TOnClickFunction;
    onselected ?: TOnSelectedFunction;
    
    icon_image ?: string;
    content ?: React.JSX.Element;
};

type TIconTabProps = TButtonProps & {

};

type TLabelProps = {
    title : string;
    value ?: string | number;
    symbol ?: string;    
};

type TCardTabProps = {
    title : string;
    description ?: string;
    iconURL ?: string;
};

type TCheckBoxProps = {
   title : string;
   description ?: string;
   is_checked ?: boolean;
};

type TListBoxProps = {
    title ?: string;
    rowslimit ?: number; 
    elements : {id: number; element: React.JSX.Element}[]
};

type TGridBoxProps = {
    title ?: string;
    columns ?: number;
    rows ?: number; 
    elements : {id: number; element: React.JSX.Element}[]
};

type TCircleProps = {
    cx: number;
    cy: number;
    r: number;
    stroke: string;
    fill: string;
    text: string;
};

type TRectangleProps = {
    x: number;
    y: number;
    height: number;
    width: number;
    stroke: string;
    fill: string;
    iconURL: string;
};

type TDropMenuProps = TButtonProps & {

};

export type { TButtonProps, TLabelProps, TCheckBoxProps, TIconTabProps } ;
export type { TCircleProps, TRectangleProps };
export type { TListBoxProps, TGridBoxProps, TDropMenuProps };
export type { TCardTabProps };