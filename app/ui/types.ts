import React from "react";

type TOnClickFunction = () => void;
type TOnSelectedFunction = (id: number | string) => void;

type TStyleProps = {
    backgroundColor ?: string;
};

type TLayoutProps = TStyleProps & {

};

type TTextProps = {
    textcolor ?: string;
};

type TButtonProps = TStyleProps & TTextProps & {
    id  ?: number | string;
    title ?: string;

    onClick ?: TOnClickFunction;
    onSelected ?: TOnSelectedFunction;
    
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

type TListProps = TStyleProps & {
    title ?: string;
    rowslimit ?: number; 
    elements : React.JSX.Element[];
};

type TGridBoxElement = TStyleProps & {
    element: React.ReactNode;
    column?: number;
    row?: number;
    columnSpan?: number;
    rowSpan?: number;
};

type TGridProps = TStyleProps & {
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
    elements : string[]
    selected : string;
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

export type { TButtonProps, TGridProps, TListProps, TLayoutProps, TLabelProps };