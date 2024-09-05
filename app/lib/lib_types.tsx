type TOnClickFunction = () => void;
type TOnSelectedFunction = (id: number) => void;

type TTitle = string | number;

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

export type { TButtonProps, TNavigationProps } ;