import { TMarketPoint, TPatternPoint } from "./types"; 
import { UTCTimestamp } from "lightweight-charts";

function generateNormalRandom(mean: number, stdDev: number) {
    let u1 = Math.random();
    let u2 = Math.random();
    let randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    let randNormal = mean + stdDev * randStdNormal;
    return randNormal;
}

const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function CreateMarketPoint(time: number, pattern: TPatternPoint): TMarketPoint{
    return {
        value: Math.abs(generateNormalRandom(pattern.expectation, pattern.volatility)),
        open: 10,
        high: 10.63,
        low: 9.49,
        close: 9.55,
        time: time as UTCTimestamp
    };
};

export { CreateMarketPoint };