import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import IChartController  from './types';
import { IMarket, TMarketPoint, IMarketDataManager } from '../models/types';
import { IChartApi, ISeriesApi, Time, UTCTimestamp } from 'lightweight-charts';
import { lineStyle } from './styles';

const useChart = (addModelProc: (manager: IMarketDataManager) => void): IChartController=>{
    const [chart, setChart] = useState<IChartApi | undefined>(undefined);
    const [line, setLine] = useState<ISeriesApi<"Line", Time> | undefined>(undefined);
    const lineRef =useRef(line);
    const setPoints = useCallback((points: TMarketPoint[]) => {
        lineRef.current?.setData(points.map((item)=>({value: item.value, time: item.time as UTCTimestamp})));       
        chart?.timeScale().fitContent(); 
    }, [chart, line]);
    const appendPoint =useCallback((point: TMarketPoint) => {
        lineRef.current?.update({value: point.value, time: point.time as UTCTimestamp});
    },[chart, line]);

    useEffect(() => {
        setLine(chart?.addLineSeries(lineStyle));
        addModelProc({
            setPoints,
            appendPoint,
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