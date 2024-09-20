import { ISeriesApi, Time, UTCTimestamp } from 'lightweight-charts';

type TUser = {
    first_name: string;
    last_name: string;    
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

type TProfile = {
    id: number;
    lang: string;
    user: TUser;
    status: string;
    position: string;
    level: number;
    statistics: TStatisticItem[];
    cards : TCard[];
    stars : TStar[]
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

type TMarket = {
    data : TMarketPoint[];
};


export type { TUser, TProfile, TStatisticItem, TCard, TStar };
export type { ITrade, TMarketPoint, TMarket };