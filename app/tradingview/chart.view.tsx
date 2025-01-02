import React, { useEffect, useId, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { chartStyle } from "./styles"
import { TChartViewProps } from './types';
import { removeElementById } from '../libs/lib.utils';

function ChartView( chartviewprops: TChartViewProps) {
    const chart_id = useRef(useId()); 

    useEffect(() => {
        const chartContainer = document.getElementById(chart_id.current);
        chartviewprops.setChartApi(createChart(chart_id.current, chartStyle));
        if (chartContainer) {
            removeElementById('tv-attr-logo', chartContainer);
        }
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