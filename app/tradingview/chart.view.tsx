import React, { useEffect, useState, useId } from 'react';
import { createChart, UTCTimestamp } from 'lightweight-charts';
import { lineStyle  , chartStyle } from "./chart.styles"
import { TChartViewProps, TPoints } from './types';

function ChartView( chartviewprops: TChartViewProps) {
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const chart_id = useId(); 

    useEffect(() => {
        if (isChartLoaded){ return () => { setIsChartLoaded(true); }; }
        const initdata : TPoints = (chartviewprops.initData??[]).map((item)=>({value: item.value, time: item.time as UTCTimestamp}));
        const chart = createChart(chart_id, chartStyle);
        const line = chart.addLineSeries(lineStyle);
        line.setData(initdata);
        chartviewprops.setUpdateSeries(line);
        if (initdata.length > 10) {
            const from = initdata[initdata.length - 10].time;
            const to = initdata[initdata.length - 1].time;
            chart.timeScale().setVisibleRange({ from, to });
        }else{
            chart.timeScale().fitContent();    
        }
    }, []);

    return (
        <div
            id = {chart_id}
            className="left-0 top-0 flex h-full w-full justify-center"
        >
        </div>
    );
}

export default ChartView;