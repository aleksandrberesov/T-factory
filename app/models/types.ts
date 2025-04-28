
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

type TStatValue = {
    value: number;
    percentage: number;
};

type TStatRange = {
    min: number;
    max: number;
    average: number;
};

type TDeal = {
    openPrice: number;
    closePrice: number;
    openTime: number;
    closeTime: number;
    volume: number;
    amount: number;
    profitLoss: number;
    status: boolean | undefined;
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
    [key: string]: number | string;
};

type TMarketState = {
    isActive: boolean;
    speed: string;
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
    lang: string;
    user: TUser;
    balance: number;
    status: string;
    position: string;
    level: number;
    statistics: TStatisticItem[];
    cards : TCard[];
    stars : TStar[]
};

type TTradeState = {
    balance: number,
    deal: TDeal,
    averageCost: number,
    statistics: TStatistics,
};

type TStatistics = {
    dealsCount: number;
    currentResult: TStatValue;
    totalResult: TStatValue;
    profitDeals: TStatValue
    lossDeals: TStatValue;
    profit: TStatRange;
    loss: TStatRange;
    averageProfitLoss: TStatValue;    
};

export type { TUser, TStatisticItem, TCard, TStar };
export type { TMarketPoint, TMarketState, TPatternPoint };
export type { TProfile, TMarket, TPattern };
export type { TMoney, TDeal};
export type { TStatRange, TStatValue };
export type { TTradeState };
export type { TStatistics };	