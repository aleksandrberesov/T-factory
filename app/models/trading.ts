import { ISeriesApi, Time, UTCTimestamp } from 'lightweight-charts';
import { ITrade } from './types';

const Initialdata = [  
    { value: 10, open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 as UTCTimestamp}, 
    { value: 9.55, open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 as UTCTimestamp}, 
    { value: 9.94, open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 as UTCTimestamp}, 
    { value: 10.93, open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 as UTCTimestamp},
    { value: 12, time: 1645205476 as UTCTimestamp}
];

const Trade : ITrade = {
    state : undefined,
    series : undefined,
    SetSeries(seriesRef: ISeriesApi<"Line", Time>){
        //alert("set series"+seriesRef);
        console.log(seriesRef);
        
        this.series = seriesRef;
    },
    Sell (){
        this.state = "Sell";
        //alert(this.state);
    },
    Buy (){

    },
    Close(){

    },
    Play(){

    },
    Pause(){

    },
    Next(){
        //alert("next bitton click");
        if (this.series !== undefined){
            this.series.setData([{value: 2, time: 1645505476 as UTCTimestamp}]);
            //alert("next value: "+ 2);
        }
    },
    Stop(){
        this.Close();
    },
    
};

export { Initialdata, Trade };