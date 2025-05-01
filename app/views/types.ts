import { IPattern, IProfile, IMarket, ITrade, IStatistics } from "../controllers/interfaces";
import { ILocalizator } from "../controllers/localization";

type TLocalizedFrameProps = {
    localizer : ILocalizator;
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

export type { TProfileFrameProps, TTradingFrameProps, TStatisticFrameProps};
//export type { TLocalizedFrameProps }; 