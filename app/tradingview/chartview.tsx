//'use client';

import React, { useEffect, useState, useId } from 'react';
import { createChart, DeepPartial, ChartOptions, ColorType, WhitespaceData, BaselineData } from 'lightweight-charts';
import { data } from "../models/trading"

function ChartView() {
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const chart_id = useId(); 

    useEffect(() => {
        if (isChartLoaded){ return ()=>{ setIsChartLoaded(true); }; }

        const chartOptions: DeepPartial<ChartOptions> = { layout: { textColor: 'white', background: { type: ColorType.Solid , color: 'black' } } };                                    
        const chart = createChart(chart_id, chartOptions);
        const candlestickSeries = chart.addCandlestickSeries({
                                                              upColor: '#26a69a', 
                                                              downColor: '#ef5350', 
                                                              borderVisible: false, 
                                                              wickUpColor: '#26a69a', 
                                                              wickDownColor: '#ef5350'
                                                             });
        candlestickSeries.setData(data);
        chart.timeScale().fitContent();
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