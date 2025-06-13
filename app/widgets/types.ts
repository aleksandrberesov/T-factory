import { ILocalizator } from "../controllers/localization";
import { ITrade, IStatistics, IPattern } from '../controllers/interfaces';

type TLocalizedWidgetProps = {
    localizer : ILocalizator;
};

type TradeControlPanelProps = TLocalizedWidgetProps & {
    trader: ITrade;
};

type StatisticPanelProps = TLocalizedWidgetProps & {
    statistics: IStatistics;
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