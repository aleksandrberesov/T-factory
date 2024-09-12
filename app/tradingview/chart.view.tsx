//'use client';

import React, { useEffect, useState, useId } from 'react';
import { createChart } from 'lightweight-charts';
import { data, values } from "../models/trading"
import { lineStyle, candleStickStyle, chartStyle } from "./chart.styles"

function ChartView() {
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const chart_id = useId(); 

    useEffect(() => {
        if (isChartLoaded){ return ()=>{ setIsChartLoaded(true); }; }

        const chart = createChart(chart_id, chartStyle);
        const candlestickSeries = chart.addCandlestickSeries(candleStickStyle);
        const lineSeries = chart.addLineSeries(lineStyle);
        candlestickSeries.setData(data);
        lineSeries.setData(values);
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