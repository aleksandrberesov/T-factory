import React from "react";
import { TOnClickFunction, TOnSelectedFunction } from "../libs/lib.types"

type TStyleProps = {
    style ?: string;
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
    elements : {id: number; element: React.JSX.Element}[];
};

export interface TGridBoxProps {
    title?: string;
    elements: { element: React.ReactNode }[];
    columns?: number;
    rows?: number | 'auto';
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

export type { TButtonProps, TLabelProps, TCheckBoxProps, TIconTabProps } ;
export type { TCircleProps, TRectangleProps };
export type { TListBoxProps, TTableBoxProps, TDropMenuProps };
export type { TCardTabProps };