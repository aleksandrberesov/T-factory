import { TUser, TStatisticItem } from "../models/types"
import { TOnSelectedFunction } from "../models/types"

type TNavigationProps = {
    onselected ?: TOnSelectedFunction;
    lang : string;
};

type TProfileProps = {
    user : TUser
};

type TStatisticProps = {
    id : number;
    data : TStatisticItem[];
};


export type { TProfileProps, TNavigationProps, TStatisticProps } ;