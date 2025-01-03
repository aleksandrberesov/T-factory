
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

type TMoney = {
    fiat: number;
    currency: number;
};

type TDeal = {
    openPrice: number;
    closePrice: number;
    openTime: number;
    closeTime: number;
    volume: number;
    amount: number;
    profitLoss: number;
};

type TMarketPoint = {
    value: number;
    open: number;
    high: number;
    low: number;
    close: number;
    time: number;
};

type TPatternPoint = {
    expectation: number; 
    volatility: number;
    count: number;
};

type TMarket = {
    pattern: TPatternPoint[];
    points : TMarketPoint[];
};

type TPattern = {
    pre_points : TPatternPoint[];
    points : TPatternPoint[];
};

type TProfile = {
    id: number;
    lang?: string;
    user: TUser;
    balance: number;
    status: string;
    position: string;
    level: number;
    statistics: TStatisticItem[];
    cards : TCard[];
    stars : TStar[]
};

export type { TUser, TStatisticItem, TCard, TStar };
export type { TMarketPoint, TPatternPoint };
export type { TProfile, TMarket, TPattern };
export type { TMoney, TDeal };