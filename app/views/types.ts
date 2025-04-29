import { IPattern, IProfile, IMarket, ITrade, IStatistics } from "../controllers/interfaces";
import { IDictionary } from "../libs/useLocalization";

type TLocalizedFrameProps = {
    dictionary : IDictionary;
};

type TTradingFrameProps = TLocalizedFrameProps & {  
    pattern: IPattern,
    market: IMarket;
    trader: ITrade,
    statistics: IStatistics;
};

type TProfileFrameProps = TLocalizedFrameProps & {
    profile: IProfile;
};

type TStatisticFrameProps = TLocalizedFrameProps & {
    profile: IProfile;
};

export type { TProfileFrameProps, TTradingFrameProps, TStatisticFrameProps, TLocalizedFrameProps }; ;