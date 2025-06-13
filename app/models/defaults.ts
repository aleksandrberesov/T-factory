import { TProfile, TMarket, TPattern, TMarketPoint, TDeal } from './types'

const defaultProfile : TProfile = {
    id : -1,
    user : {
        first_name: "default",
        last_name: "user"
    },
    lang : "en",
    status: "unknown",
    balance: 100000,
    position: "hamster",
    level: 80,
    cards : [
        {title: "first card", description: "some about first card"},
        {title: "second card", description: "some about second card"},
        {title: "third card", description: "some about second card"},
        {title: "fourth card", description: "some about second card"},
        {title: "fifth card", description: "some about second card"},
    ],
    stars : [
        {title: "first star"},
        {title: "second star"}
    ]
};

const defaultPattern: TPattern = {
    points: [
        {
            count: 1,
            expectation: 0,
            volatility: 20
        },
        {
            count: 2,
            expectation: 0,
            volatility: 30
        },
        {
            count: 0,
            expectation: 0,
            volatility: 30
        }
    ],
    pre_points: [
        {
            count: 5,
            expectation: 0,
            volatility: 20
        }
    ]
};

const defaultMarket: TMarket = {
    pattern: [
        {
            count: 1,
            expectation: 0,
            volatility: 0,
        }
    ],
    points: [],
}; 

const defaultMarketPoint: TMarketPoint = {
    value: 10,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    time: 0,
};

const defaultDeal: TDeal = {
    openPrice: 0,
    closePrice: 0,
    openTime: 0,
    closeTime: 0,
    amount: 0,
    profitLoss: 0,
    volume: 0,
    status: undefined, 
};

export { defaultProfile, defaultPattern, defaultMarket, defaultMarketPoint, defaultDeal };