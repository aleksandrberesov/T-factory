import { ISeriesApi, Time, UTCTimestamp } from 'lightweight-charts';
import { ITrade, TMarket, TMarketPoint, TPatternPoint } from './types';
import { randomNumberInRange, generateNormalRandom } from './utils';

let NextTime = 1645205476;

const Trade : ITrade = {
    state : undefined,
    series : undefined,
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

let InitialPattern : TPatternPoint[] = [
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