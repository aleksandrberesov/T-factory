import { IPattern, IProfile } from "../models/types";
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
    profile: IProfile;   
    pattern: IPattern,
};

type TProfileFrameProps = {
    profile: IProfile;
};

type TStatisticFrameProps = {
    profile: IProfile;
};

type TSettingsFrameProps = {
    callBack() : void;
    data: IPattern;
};

export type { TProfileFrameProps, TNavigationFrameProps, TTradingFrameProps, TStatisticFrameProps, TSettingsFrameProps } ;