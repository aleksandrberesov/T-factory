import { TUser, TStatisticItem, TCard, TStar } from "../models/types";
import { TOnSelectedFunction, TNumberToStringFunc, TStringProc } from "../libs/lib.types";
import { IProfile } from "../models/profile";

type TLocalizedFrameProps = {
    getWord : TNumberToStringFunc;
    setLanguage?: TStringProc;
};

type TNavigationProps = TLocalizedFrameProps & {
    onselected ?: TOnSelectedFunction;
    lang ?: string;
};

type TTradingFrameProps = TLocalizedFrameProps & {
    profile: IProfile;   
};

type TProfileProps = {
    profile: IProfile;
//    user : TUser;
//    cards : TCard[];
//    stars : TStar[];
};

type TStatisticProps = {
    profile: IProfile;
//    id : number;
//    data : TStatisticItem[];
};

type TSettingsProps = {
    callBack() : void;
};

export type { TProfileProps, TNavigationProps, TTradingFrameProps, TStatisticProps, TSettingsProps } ;