import React from "react";
import { TOnClickFunction, TOnSelectedFunction } from "../models/function.types"

type TButtonProps = {
    id  ?: number;
    title ?: string;
    icon_image ?: string;
    backgroundcolor ?: string;
    onclick ?: TOnClickFunction;
    onselected ?: TOnSelectedFunction;
    style ?: string;
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

export type { TButtonProps, TLabelProps, TCheckBoxProps, TListBoxProps, TCircleProps, TRectangleProps, TIconTabProps, TCardTabProps } ;