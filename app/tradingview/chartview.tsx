'use client';

import React, { useEffect, useState, useId } from 'react';
import { createChart, DeepPartial, ChartOptions, ColorType, WhitespaceData, BaselineData, UTCTimestamp} from 'lightweight-charts';

function ChartView() {
    //const ref = useRef(null);  
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const chart_id = useId(); 

    useEffect(() => {
        let ignore = false; 
        if (!ignore){
            const chartOptions: DeepPartial<ChartOptions> = { layout: { textColor: 'black', background: { type: ColorType.Solid , color: 'white' } } };
//            const data: (WhitespaceData<UTCTimestamp> | BaselineData<UTCTimestamp>)[] = [{ value: 1, time: 1642425322 as UTCTimestamp}, 
    ///                                                                                     { value: 8, time: 1642511722 as UTCTimestamp},
  //                                                                                       { value: 18, time: 1642711722 as UTCTimestamp},
       //                                                                                  { value: 28, time: 1642911722 as UTCTimestamp},
         //                                                                                ];
                                                                                         
const data = [{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 as UTCTimestamp}, 
                { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 as UTCTimestamp}, 
                { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 as UTCTimestamp}, 
                { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 as UTCTimestamp}, 
                { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 as UTCTimestamp},
                 { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 as UTCTimestamp}, 
                 { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 as UTCTimestamp}, 
                 { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 as UTCTimestamp}, 
                 { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 as UTCTimestamp}, 
                 { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 as UTCTimestamp}];

            const chart = createChart(chart_id, chartOptions);
            const candlestickSeries = chart.addCandlestickSeries({upColor: '#26a69a', 
                                                                  downColor: '#ef5350', 
                                                                  borderVisible: false, 
                                                                  wickUpColor: '#26a69a', 
                                                                  wickDownColor: '#ef5350' });
    //        const baselineSeries = chart.addBaselineSeries({ baseValue: { type: 'price', price: 25 }, 
    //                                                         topLineColor: 'rgba( 38, 166, 154, 1)', 
    //                                                         topFillColor1: 'rgba( 38, 166, 154, 0.28)', 
     //                                                        topFillColor2: 'rgba( 38, 166, 154, 0.05)', 
       //                                                      bottomLineColor: 'rgba( 239, 83, 80, 1)', 
         //                                                    bottomFillColor1: 'rgba( 239, 83, 80, 0.05)', 
           //                                                  bottomFillColor2: 'rgba( 239, 83, 80, 0.28)' });
           candlestickSeries.setData(data);
            chart.timeScale().fitContent();
            return ()=>{
                ignore = true;
            };            
        }
    }, [chart_id]);

    return (
        <div
            id = {chart_id}
            className="left-0 top-0 flex h-full w-full justify-center"
        >
        </div>
    );
}

export default ChartView;