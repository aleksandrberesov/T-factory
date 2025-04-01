import { IPattern, IProfile, IMarket, ITrade } from "../controllers/interfaces";
import { TStringToStringFunc } from "../libs/types";
import { IDictionary } from "../libs/useLocalization";

type TLocalizedFrameProps = {
    dictionary : IDictionary;
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

export type { TProfileFrameProps, TTradingFrameProps, TStatisticFrameProps, TLocalizedFrameProps }; ;