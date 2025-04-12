import { useEffect, useState, useCallback, useRef, useId } from 'react';
import IChartController  from './types';
import { TMarketPoint } from '../models/types';
import { IMarketDataManager } from '../controllers/interfaces';
import { IChartApi, ISeriesApi, Time, UTCTimestamp } from 'lightweight-charts';
import { lineStyle } from './options';

const useChart = (addModelProc: (manager: IMarketDataManager) => void): IChartController =>{
    const uniqueId = useId();
    const [chart, setChart] = useState<IChartApi | undefined>(undefined);
    const [line, setLine] = useState<ISeriesApi<"Line", Time> | undefined>(undefined);
    const lineRef =useRef(line);
    const setPoints = useCallback((points: TMarketPoint[]) => {
        console.log("setPoints", points);
        console.log("lineRef", lineRef.current);
        console.log("chart", chart);
        lineRef.current?.setData(points.map((item)=>({value: item.value, time: item.time as UTCTimestamp})));       
        chart?.timeScale().fitContent(); 
    }, [chart, line]);
    const appendPoint =useCallback((point: TMarketPoint) => {
        lineRef.current?.update({value: point.value, time: point.time as UTCTimestamp});
    },[chart, line]);

    useEffect(() => {
        chart?.timeScale().applyOptions({
            barSpacing: 10, // Adjust spacing between bars
            timeVisible: true, // Show time on the axis
            secondsVisible: false, // Hide seconds
            borderColor: '#D6DCDE', // Set border color  
        });
        setLine(chart?.addLineSeries(lineStyle));
        addModelProc({
            setPoints,
            appendPoint,
            id: uniqueId,
        });
    }, [chart]);
    
    useEffect(() => { 
        lineRef.current = line; 
    }, [line]);

    return {
        assignChart: setChart,  
    };
};

export default useChart;