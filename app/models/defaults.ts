import { TProfile, TMarket, TPattern, TMarketPoint } from './types'

const defaultProfile : TProfile = {
    id : 0,
    user : {
        first_name: "default",
        last_name: "user"
    },
    lang : "en",
    status: "unknown",
    balance: 100000,
    position: "hamster",
    level: 80,
    statistics : [
        {title: "first stat item", isDone: true }, 
        {title: "second stat item", isDone: true}, 
        {title: "third stat item", isDone: false}
    ],
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
            count: 10,
            expectation: 0,
            volatility: 20
        },
        {
            count: 20,
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
            count: 10,
            expectation: 0,
            volatility: 20
        }
    ]
};

const defaultMarket: TMarket = {
    pattern: [
        {
            count: 10,
            expectation: 0,
            volatility: 20
        }
    ],
    points: [],
}; 

const defaultMarketPoint: TMarketPoint = {
    value: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    time: 0,
};

export { defaultProfile, defaultPattern, defaultMarket, defaultMarketPoint };