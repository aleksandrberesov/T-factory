import { TUser, TProfile, TStatisticItem, TCard, TStar } from "../models/types";
import { TOnSelectedFunction, TNumberToStringFunc, TStringProc } from "../libs/lib.types";

type TLocalizedFrameProps = {
    getWord : TNumberToStringFunc;
    setLanguage?: TStringProc;
};

type TNavigationProps = TLocalizedFrameProps & {
    onselected ?: TOnSelectedFunction;
    lang ?: string;
};

type TTradingFrameProps = TLocalizedFrameProps & {
    
};

type TProfileProps = {
    profile: TProfile;
//    user : TUser;
//    cards : TCard[];
//    stars : TStar[];
};

type TStatisticProps = {
    profile: TProfile;
//    id : number;
//    data : TStatisticItem[];
};

type TSettingsProps = {
    callBack() : void;
};

export type { TProfileProps, TNavigationProps, TTradingFrameProps, TStatisticProps, TSettingsProps } ;