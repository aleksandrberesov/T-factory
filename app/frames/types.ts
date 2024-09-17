import { TUser, TStatisticItem, TCard, TStar } from "../models/types";
import { TOnSelectedFunction } from "../libs/lib.types";

type TNavigationProps = {
    onselected ?: TOnSelectedFunction;
    lang : string;
};

type TProfileProps = {
    user : TUser;
    cards : TCard[];
    stars : TStar[];
};

type TStatisticProps = {
    id : number;
    data : TStatisticItem[];
};

type TSettingsProps = {
    callBack() : void;
};

export type { TProfileProps, TNavigationProps, TStatisticProps, TSettingsProps } ;