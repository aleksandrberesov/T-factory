type TOnClickFunction = () => void;
type TOnSelectedFunction = (id: number) => void;

type TButtonProps = {
    id  ?: number;
    title ?: string;
    icon_image ?: string;
    backgroundcolor ?: string;
    onclick ?: TOnClickFunction;
    onselected ?: TOnSelectedFunction;
    style ?: string;
};

type TNavigationProps = {
    onselected ?: TOnSelectedFunction;
    lang : string;
};

type TLabelProps ={
    title : string;
    value ?: string | number;
    symbol ?: string;    
};

export type { TButtonProps, TLabelProps, TNavigationProps } ;