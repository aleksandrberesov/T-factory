import React from "react";

type TOnClickFunction = () => void;
type TOnSelectedFunction = (id: number | string) => void;

type TStyleProps = {
    backgroundColor ?: string;
};

type TLayoutProps = TStyleProps & {
    id ?: string;
    children ?: React.ReactNode;
};  

type TTextProps = {
    textColor ?: string;
};

type TButtonProps = TStyleProps & TTextProps & {
    id  ?: number | string;
    title ?: string;

    onClick ?: TOnClickFunction;
    onSelected ?: TOnSelectedFunction;
    
    icon_image ?: string;
    content ?: React.JSX.Element;
};

type TModalProps = TLayoutProps & {
    content ?: React.JSX.Element;
};  

type TLabelProps = TStyleProps & TTextProps &{
    title ?: string;
    shortTitle ?: string;
    value ?: string | number;
    symbol ?: string;    
};

type TInputProps = TLabelProps & {
    id ?: string;
    type ?: string; 
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type TListProps = TStyleProps & {
    title ?: string;
    rowslimit ?: number; 
    elements : React.JSX.Element[];
};

type TGridElement = TStyleProps & {
    element: React.ReactNode;
    column?: number;
    row?: number;
    columnSpan?: number;
    rowSpan?: number;
};

type TGridProps = TStyleProps & {
    title?: string;
    elements?: TGridElement[];
    columns?: number;
    rows?: number;
    showBorders?: boolean;
}


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

export type { TButtonProps, TGridProps, TListProps, TLayoutProps, TLabelProps, TModalProps, TInputProps };