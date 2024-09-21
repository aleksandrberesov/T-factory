import { ISeriesApi, Time, UTCTimestamp } from 'lightweight-charts';
import { ITrade, TMarket, TMarketPoint } from './types';

const Initialdata = [  
    { value: 10, open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 as UTCTimestamp}, 
    { value: 9.55, open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 as UTCTimestamp}, 
    { value: 9.94, open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 as UTCTimestamp}, 
    { value: 10.93, open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 as UTCTimestamp},
];

let NextTime = 1645205476;

const Trade : ITrade = {
    state : undefined,
    series : undefined,
};

const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function InitialMarket(){
    let result : TMarketPoint[] = [];
    for (let i = 0; i < 50; i++) { // Example loop to push 10 points
        NextTime = NextTime + 1000; // Increment time by 1 second
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

let Market: TMarket = {
    data: InitialMarket(),
};

function Step(){
    NextTime = NextTime + 1000; //Trade.series?.data().at(-1)?.time.valueOf() as number +1000; //
    const RV = randomNumberInRange(-20, 20);
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

export { Initialdata, Trade, Market}; 
export { SetUpdateSeries };
export { Step, Play, Pause, Stop };
export { Sell, Buy};