import { TUpdateObjectProc } from '../libs/lib.types';
import { TDeal, TProfile, TMoney, TPatternPoint, TPattern, TMarketPoint } from './types';

interface IPattern {
    patterns : string[];
    pattern: TPattern;
    select : (name: string) => void;
    init : () => void;    
};

interface IProfile {
    data: TProfile;
    setData: TUpdateObjectProc;
};

interface IAccount {
    depositFiat: (value: number)=> void;
    withdrawFiat: (value: number)=> void;
    depositCurrency: (value: number)=> void;
    withdrawCurrency: (value: number)=> void;
    getBalance: (currencyRate: number) =>number;
    money: TMoney;
};

interface IMarketDataManager {
    setPoints : (points: TMarketPoint[]) => void;
    appendPoint: (point: TMarketPoint) => void;
};

interface IMarket {
    init: (pattern: TPattern) => void;
    step: ()=> void;
    start: ()=> void;
    stop: ()=> void;
    pause: ()=> void;
    isActive: boolean;
    setDuration: (duration: number) => void;
    addManager: (manager: IMarketDataManager) => void;
    changed: boolean;
};

interface ITrade {
    init: (profile: IProfile, market: IMarket)=> void;
    buy: ()=> void;
    sell: ()=> void;
    close: ()=> void;
    
    balance: number,
    deal: TDeal,
    count: number,

    changed: boolean,
};

interface IStatistics {

}

interface IApplication {

};

export type { IPattern, IProfile, IMarket, ITrade };
export type { IMarketDataManager };
export type { IAccount, IStatistics };
export default IApplication;