type TOnClickFunction = () => void;
type TOnSelectedFunction = (id: number) => void;

type TButtonProps = {
    id  ?: number;
    title ?: string | number;
    icon_image ?: string;
    backgroundcolor ?: string;
    onclick ?: TOnClickFunction;
    onselected ?: TOnSelectedFunction;
    style ?: string;
};

type TNavigationProps = {
    onselected ?: TOnSelectedFunction;
};

type TLabelProps ={
    title : string;
    value ?: string | number;
    unit ?: string;    
};

export type { TButtonProps, TLabelProps, TNavigationProps } ;