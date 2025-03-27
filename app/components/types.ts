import React from "react";
import { TOnClickFunction, TOnSelectedFunction } from "../libs/types"

type TStyledElementProps = {
    backgroundColor ?: string;
};

type TStyleProps = {
    style ?: string;
    extraClasses ?: string;
};

type TTextProps = {
    backgroundcolor ?: string;
    textcolor ?: string;
};

type TButtonProps = TStyleProps & TTextProps & {
    id  ?: number | string;
    title ?: string;

    onclick ?: TOnClickFunction;
    onselected ?: TOnSelectedFunction;
    
    icon_image ?: string;
    content ?: React.JSX.Element;
};

type TIconTabProps = TButtonProps & {

};

type TLabelProps = TStyleProps & TTextProps &{
    title ?: string;
    shortTitle ?: string;
    value ?: string | number;
    symbol ?: string;    
};

type TCheckBoxProps = {
   title : string;
   description ?: string;
   is_checked ?: boolean;
};

type TListBoxProps = TStyledElementProps & {
    title ?: string;
    rowslimit ?: number; 
    elements : React.JSX.Element[];
};

type TGridBoxElement = TStyledElementProps & {
    element: React.ReactNode;
    column?: number;
    row?: number;
    columnSpan?: number;
    rowSpan?: number;
};

type TGridBoxProps = TStyledElementProps & {
    title?: string;
    elements?: TGridBoxElement[];
    columns?: number;
    rows?: number;
    showBorders?: boolean;
}

type TTableBoxProps ={
    elements: (React.JSX.Element | null)[][];
};

type TDropMenuProps = TButtonProps & {
    elements : {id: number; element: string}[]
    selected : number;
    dropDirection ?: "down" | "up" | undefined; 
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

export type { TButtonProps, TLabelProps, TCheckBoxProps, TIconTabProps };
export type { TCircleProps, TRectangleProps };
export type { TListBoxProps, TTableBoxProps, TDropMenuProps, TGridBoxProps, TGridBoxElement };