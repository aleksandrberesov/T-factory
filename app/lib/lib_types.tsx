type TOnClickFunction = () => void;

type TTitle = string | number;

type TButtonProps = {
    title ?: string | number;
    icon_image ?: string;
    backgroundcolor ?: string;
    onclick ?: TOnClickFunction;
};

export type { TButtonProps } ;