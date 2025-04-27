import { TUpdateObjectProc } from '../libs/types';
import { ILocalizator } from '../libs/useLocalization';
import { TStatus } from './types';
import { IViewController } from './viewController';
import { TDeal, TProfile, TMoney, TPatternPoint, TPattern, TMarketPoint, TStatValue, TStatRange, TMarket, TMarketState } from '../models/types';
import { TTradeState } from '../models/types';
import { IDataManager } from './dataController';


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
    money: TMoney;
};

interface IStatistics {
    deals: TDeal[];
    lastDeal: TDeal;
    pushDeal: (deal: TDeal) => void;
    clear: () => void;
    count: number;
    currentResult: TStatValue;
    totalResult: TStatValue;
    profitDeals: TStatValue
    lossDeals: TStatValue;
    profit: TStatRange;
    loss: TStatRange;
    averageProfitLoss: TStatValue;
}

interface IMarket {
    init: (pattern: TPattern) => void;
    step: ()=> void;
    start: ()=> void;
    stop: ()=> void;
    pause: ()=> void;
    setSpeed: (speedID: number)=> void;
    state: TMarketState;
    addManager: (manager: IDataManager<TMarketPoint>) => void;
    addView: (view: IViewController<TMarketState>) => void;
};

interface ITrade {
    init: (profile: IProfile, market: IMarket)=> void;
    buy: ()=> void;
    sell: ()=> void;
    close: ()=> void;
    
    statistics: IStatistics,
    state: TTradeState,
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
};

export type { IPattern, IProfile, IMarket, ITrade };
export type { IAccount, IStatistics };
export type { IApplication };