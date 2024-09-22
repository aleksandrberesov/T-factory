import { ISeriesApi, Time, UTCTimestamp } from 'lightweight-charts';
import { ITrade, TMarket, TMarketPoint, TPatternParameter } from './types';

let NextTime = 1645205476;

const Trade : ITrade = {
    state : undefined,
    series : undefined,
};

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
    for (let i = 0; i < 50; i++) { 
        NextTime = NextTime + 1000; 
        let RV = randomNumberInRange(-20, 20);
        result.push({
            value: RV,
            open: 10,
            high: 10.63,
            low: 9.49,
            close: 9.55,
            time: NextTime as UTCTimestamp
        });
      }
    return result;
};

let InitialPattern : TPatternParameter[] = [
    {expectation: 0, volatility: 30, count: 10},
    {expectation: 0, volatility: 30, count: 10}
];

let Market: TMarket = {
    pattern: InitialPattern,
    data: InitialMarket(),
};

function Step(){
    NextTime = NextTime + 1000; 
    const RV = generateNormalRandom(Market.pattern[0].expectation, Market.pattern[0].volatility);
    const newPoint = {value: RV, open: 10, high: 10.63, low: 9.49, close: 9.55, time: NextTime as UTCTimestamp};
    Market.data.push(newPoint);
    Trade.series?.update(newPoint);    
};

function Play(){
    Trade.state = 'started';      
};

function Stop(){
    Trade.state = 'stopped';   
    alert("stop");    
};

function Pause(){
    Trade.state = 'paused';  
};

function SetUpdateSeries(seriesRef: ISeriesApi<"Line", Time>){
    Trade.series=seriesRef;
};

function Buy(){

};
function Sell(){

};

export { Trade, Market}; 
export { SetUpdateSeries };
export { Step, Play, Pause, Stop };
export { Sell, Buy};