import { ISeriesApi, Time, UTCTimestamp } from 'lightweight-charts';

type TUser = {
    first_name: string;
    last_name?: string;    
};

type TStatisticItem = {
    title: string;
    isDone: boolean;    
};

type TCard = {
    title : string;
    description : string;
};

type TStar = {
    title : string;
};

interface ITrade {
    state : 'started' | 'paused' | 'stopped' | undefined;
    series ?: ISeriesApi<"Line", Time> | undefined;
};

type TMarketPoint = {
    value: number;
    open: number;
    high: number;
    low: number;
    close: number;
    time: UTCTimestamp;
};

type TPatternParameter = {
    expectation: number; 
    volatility: number;
    count: number;
};

type TMarketPattern = {
    pre_points : TPatternParameter[];
    points : TPatternParameter[];
};

type TMarket = {
    pattern: TPatternParameter[];
    data : TMarketPoint[];
};

export type { TUser, TStatisticItem, TCard, TStar };
export type { ITrade, TMarketPoint, TPatternParameter, TMarket };
export type { TMarketPattern };