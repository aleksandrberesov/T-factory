import { TUpdateObjectProc } from '../libs/types';
import { ILocalizator } from './localization';
import { TStatus } from './types';
import { IViewController } from './viewController';
import { TDeal, TProfile, TMoney, TPatternPoint, TPattern, TMarketPoint, TStatValue, TStatRange, TMarket, TMarketState } from '../models/types';
import { TTradeState } from '../models/types';
import { IDataManager } from './dataController';
import { TStatistics, TStatisticsItem } from '../models/types';


interface IPattern {
    patterns : string[];
    pattern: TPattern;
    select : (name: string) => void;
    save : (points: TPattern) => void;
    init : () => Promise<TPattern>;    
};

interface IProfile {
    data: TProfile;
    setData: TUpdateObjectProc;
};

interface IAccount {
    init: (money: TMoney) => void;
    depositFiat: (value: number)=> void;
    withdrawFiat: (value: number)=> void;
    depositCurrency: (value: number)=> void;
    withdrawCurrency: (value: number)=> void;
    getBalance: (currencyRate: number) =>number;
    showMoney: () => TMoney;
};

interface IStatistics {
    init: (data: TStatisticsItem[]) => void;
    save: (user_id: number, timestamp: number) => void;
    push: (deal: TDeal) => void;
    clear: () => void;
    addView: (view: IViewController<TStatistics>) => void;
    getCurrent: ()=> TStatistics;
    getAll: () => TStatisticsItem[],
}

interface IMarket {
    init: (pattern: TPattern) => void;
    step: ()=> void;
    start: ()=> void;
    stop: ()=> void;
    pause: ()=> void;
    setSpeed: (speedID: number)=> void;
    addManager: (manager: IDataManager<TMarketPoint>) => void;
    addView: (view: IViewController<TMarketState>) => void;
};

interface ITrade {
    init: (profile: IProfile, market: IMarket, statistics: IStatistics)=> void;
    buy: ()=> void;
    sell: ()=> void;
    close: ()=> void;
    addView: (view: IViewController<TTradeState>) => void;
};

interface IApplication {
    status: TStatus; 
    statusInfo: string;

    localizer: ILocalizator;
    profile: IProfile; 
    pattern: IPattern;
    market: IMarket;
    trader: ITrade;
    statistics: IStatistics;
};

export type { IPattern, IProfile, IMarket, ITrade };
export type { IAccount, IStatistics };
export type { IApplication };