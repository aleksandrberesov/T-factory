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
            const data: (WhitespaceData<UTCTimestamp> | BaselineData<UTCTimestamp>)[] = [{ value: 1, time: 1642425322 as UTCTimestamp}, 
                                                                                         { value: 8, time: 1642511722 as UTCTimestamp},
                                                                                         { value: 18, time: 1642711722 as UTCTimestamp},
                                                                                         { value: 28, time: 1642911722 as UTCTimestamp},
                                                                                         ];
            const chart = createChart(chart_id, chartOptions);
            const baselineSeries = chart.addBaselineSeries({ baseValue: { type: 'price', price: 25 }, topLineColor: 'rgba( 38, 166, 154, 1)', topFillColor1: 'rgba( 38, 166, 154, 0.28)', topFillColor2: 'rgba( 38, 166, 154, 0.05)', bottomLineColor: 'rgba( 239, 83, 80, 1)', bottomFillColor1: 'rgba( 239, 83, 80, 0.05)', bottomFillColor2: 'rgba( 239, 83, 80, 0.28)' });
            
            baselineSeries.setData(data);
            chart.timeScale().fitContent();

            return ()=>{
                console.log(ignore);
                ignore = true;
            };            
        }
    }, [chart_id]);

    //
    return (
        <div
            id = {chart_id}
            className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
            
        >
        
        </div>
    );
}

export default ChartView;