import React, { useEffect, useId } from 'react';
import { createChart } from 'lightweight-charts';
import { chartStyle } from "./styles"
import { TChartViewProps } from './types';

function ChartView( chartviewprops: TChartViewProps) {
    const chart_id = useId(); 

    useEffect(() => {
        const chart = createChart(chart_id, chartStyle);
        chartviewprops.setChartApi(chart);
    });

    return (
        <div
            id = {chart_id}
            className="left-0 top-0 flex h-full w-full justify-center"
        >
        </div>
    );
}

export default ChartView;