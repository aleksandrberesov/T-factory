import { ILocalizator } from "../controllers/localization";
import { ITrade, IStatistics, IPattern } from '../controllers/interfaces';
import { TStatistics } from "../models/types";

type TLocalizedWidgetProps = {
    localizer : ILocalizator;
};

type TradeControlPanelProps = TLocalizedWidgetProps & {
    trader: ITrade;
};

type StatisticPanelProps = TLocalizedWidgetProps & {
    statistics: TStatistics | undefined;
}

type TradeStatisticPanelProps = TLocalizedWidgetProps & {
    trader: ITrade;
    statistics: IStatistics;
};

type TSettingsWindowProps = TLocalizedWidgetProps & {
    callBack() : void;
    data: IPattern;
};

export type { TradeControlPanelProps, TradeStatisticPanelProps, TSettingsWindowProps, StatisticPanelProps };