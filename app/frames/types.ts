import { IPattern, IProfile, IMarket, ITrade } from "../models/types";
import { TOnSelectedFunction, TNumberToStringFunc, TStringProc } from "../libs/lib.types";

type TLocalizedFrameProps = {
    getWord : TNumberToStringFunc;
    setLanguage?: TStringProc;
};

type TNavigationFrameProps = TLocalizedFrameProps & {
    onselected ?: TOnSelectedFunction;
    lang ?: string;
};

type TTradingFrameProps = TLocalizedFrameProps & {
//    profile: IProfile;   
    pattern: IPattern,
    market: IMarket;
    trader: ITrade,
};

type TProfileFrameProps = TLocalizedFrameProps & {
    profile: IProfile;
};

type TStatisticFrameProps = TLocalizedFrameProps & {
    profile: IProfile;
};

type TSettingsFrameProps = TLocalizedFrameProps & {
    callBack() : void;
    data: IPattern;
};

export type { TProfileFrameProps, TNavigationFrameProps, TTradingFrameProps, TStatisticFrameProps, TSettingsFrameProps } ;