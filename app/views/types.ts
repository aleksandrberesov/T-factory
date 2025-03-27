import { IPattern, IProfile, IMarket, ITrade } from "../models/interfaces";
import { TOnSelectedFunction, TNumberToStringFunc, TStringProc } from "../libs/types";

type TLocalizedFrameProps = {
    getWord : TNumberToStringFunc;
    setLanguage?: TStringProc;
};

type TNavigationFrameProps = TLocalizedFrameProps & {
    onselected ?: TOnSelectedFunction;
    lang ?: string;
};

type TTradingFrameProps = TLocalizedFrameProps & {  
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

export type { TProfileFrameProps, TNavigationFrameProps, TTradingFrameProps, TStatisticFrameProps, TLocalizedFrameProps }; ;