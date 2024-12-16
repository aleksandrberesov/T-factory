import React, { useEffect, useId, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { chartStyle } from "./styles"
import { TChartViewProps } from './types';

function ChartView( chartviewprops: TChartViewProps) {
    const chart_id = useRef(useId()); 

    useEffect(() => {
        chartviewprops.setChartApi(createChart(chart_id.current, chartStyle));
    }, [chartviewprops]);

    return (
        <div
            id = {chart_id.current}
            className="left-0 top-0 flex h-full w-full justify-center"
        >
        </div>
    );
}

export default ChartView;