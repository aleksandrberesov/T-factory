import { TMarketPoint } from "./types"; 
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

function InitialMarket(){
    let result : TMarketPoint[] = [];
    return result;
};

export { generateNormalRandom, randomNumberInRange, InitialMarket };