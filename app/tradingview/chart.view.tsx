//'use client';

import React, { useEffect, useState, useId, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { Initialdata } from "../models/trading"
import { lineStyle, candleStickStyle, chartStyle } from "./chart.styles"
import { TChartViewProps } from './types';

function ChartView( chartviewprops: TChartViewProps) {
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    
    const chart_id = useId(); 

    useEffect(() => {
        if (isChartLoaded){ return () => { setIsChartLoaded(true); }; }
        
        const chart = createChart(chart_id, chartStyle);
        const lineSeries = chart.addLineSeries(lineStyle);

        chart.timeScale().fitContent();

        lineSeries.setData(Initialdata);
        chartviewprops.setUpdateSeries(lineSeries);
    }, [chart_id, isChartLoaded]);

    return (
        <div
            id = {chart_id}
            className="left-0 top-0 flex h-full w-full justify-center"
        >
        </div>
    );
}

export default ChartView;