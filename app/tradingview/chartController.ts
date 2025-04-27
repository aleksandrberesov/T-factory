import { useEffect, useState, useCallback, useRef, useId } from 'react';
import IChartController  from './types';
import { IChartApi, ISeriesApi, Time, UTCTimestamp } from 'lightweight-charts';
import { createChart } from 'lightweight-charts';
import { chartStyle } from "./options"
import { lineStyle } from './options';
import { TMarketPoint } from '../models/types';
import { IDataManager } from '../controllers/dataController';
import { removeElementById } from '../libs/utils';

const useChart = (addModelProc: (manager: IDataManager<TMarketPoint>) => void): IChartController =>{
    const uniqueId = useId();
    const [isCleared, setIsCleared] = useState(false);
    const [chart, setChart] = useState<IChartApi | undefined>(undefined);
    const [line, setLine] = useState<ISeriesApi<"Line", Time> | undefined>(undefined);
    const lineRef = useRef(line);
    const set = useCallback((points: TMarketPoint[]) => {
        lineRef.current?.setData(points.map((item)=>({value: item.value, time: item.time as UTCTimestamp})));       
        chart?.timeScale().fitContent(); 
    }, [chart, line]);
    const push = useCallback((point: TMarketPoint) => {
        lineRef.current?.update({value: point.value, time: point.time as UTCTimestamp});
    },[chart, line]);

    useEffect(() => {
        setChart(createChart(uniqueId, chartStyle));
    },[]);

    useEffect(() => {
        if (!chart) return;
        chart.timeScale().applyOptions({
            barSpacing: 20, // Adjust spacing between bars
            timeVisible: true, // Show time on the axis
            secondsVisible: false, // Hide seconds
            borderColor: '#D6DCDE', // Set border color  
        });
        setLine(chart.addLineSeries(lineStyle));
    }, [chart]);
    
    useEffect(() => { 
        lineRef.current = line; 
    }, [line]);

    useEffect(()=>{
        if (chart && lineRef.current) {
            addModelProc({
                id: uniqueId,
                push,
                set,
            });
            setIsCleared(true);
        }
    },[chart, line]);

    useEffect(() => {
        const chartContainer = document.getElementById(uniqueId);
        if (chartContainer) {
            removeElementById('tv-attr-logo', chartContainer);
        }
    }, [isCleared]);

    return {
        id: uniqueId,
    };
};

export default useChart;