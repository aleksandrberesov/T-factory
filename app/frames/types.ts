import { TUser, TStatisticItem, TCard, TStar } from "../models/types"
import { TOnSelectedFunction } from "../models/function.types"

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


export type { TProfileProps, TNavigationProps, TStatisticProps } ;