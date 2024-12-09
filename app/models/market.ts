import { useState, useEffect, useRef } from "react";
import { IValue } from '../libs/interfaces';
import  useRefValue from '../libs/value';
import { useTimer } from "../libs/lib.timer";
import { IMarket, TMarket, TPattern, TMarketPoint, TPatternPoint } from "./types"; 
import { generateNormalRandom } from "./utils";
import { defaultMarket } from "./defaults";
import { startTime, stepTime } from './consts';
import {UTCTimestamp} from 'lightweight-charts';
import {Trade} from "./trading";

const useMarket = (): IMarket=> {
    console.log('use Market');
    const { setDuration, isActive, toggle, reset } = useTimer({
        callback :  () => { step(); }, 
        state : false,
        duration : 1000,    
    });
    const [data, setData] = useState<TMarket>(defaultMarket); 
    const dataRef = useRef<TMarket>(data);
    const currentTime: IValue<number> = useRefValue(0);
    const count: IValue<number> = useRefValue(0);
    const current: IValue<number> = useRefValue(0);
    const currentPatternPoint: IValue<TPatternPoint> = useRefValue(data.pattern[0]);

    const MoveTime = ()=> {
        currentTime.set(currentTime.get() + stepTime);     
    };

    function getMarketPoint(time: number, pattern: TPatternPoint): TMarketPoint{
        return {
            value: generateNormalRandom(pattern.expectation, pattern.volatility),
            open: 10,
            high: 10.63,
            low: 9.49,
            close: 9.55,
            time: time as UTCTimestamp
        };
    };
    const initialPoints = (init_pattern: TPatternPoint[])=> {
        let result : TMarketPoint[] = [];
        init_pattern.filter((item)=>item.count>0)
                    .forEach(element => {
                        for (let i = 0; i < element.count; i++){
                            result.push(getMarketPoint(currentTime.get(), element));
                            MoveTime();
                        }
                    });
                    console.log('init market: ', JSON.stringify(result, null, 2));
        return result;
    };

    const init = (init_pattern: TPattern) =>{
        //console.log('market: ', JSON.stringify(init_pattern, null, 2));
        currentTime.set(startTime);
        count.set(0);
        current.set(0);
        //currentPatternPoint.set(data.pattern[0]);
        setData({...data, ...{pattern: init_pattern.points, data: initialPoints(init_pattern.pre_points)}}); 
        Trade.series?.setData(initialPoints(init_pattern.pre_points).map((item)=>({value: item.value, time: item.time as UTCTimestamp})));
        
    };

    useEffect(() => { 
        currentPatternPoint.set(data.pattern[0]);
        dataRef.current=data;
        console.log('data pattern: ', JSON.stringify(data, null, 2));
    }, [data]);

    
    
    function start(){
        Trade.state = 'started';  
        toggle();    
    };
    
    function stop(){
        Trade.state = 'stopped';
        reset();       
    };
    
    function pause(){
        Trade.state = 'paused';
        toggle();  
    };
    


    function step(){
        console.log('step: ', count.get(), current.get(), JSON.stringify(dataRef.current, null, 2));
        console.log('step patternPoint: ', count.get(), current.get(), JSON.stringify(currentPatternPoint.get(), null, 2));
        const newPoint: TMarketPoint = getMarketPoint(currentTime.get(), currentPatternPoint.get());
        Trade.series?.update(newPoint); 
        if (currentPatternPoint.get().count!==0){
            if(count.get() < currentPatternPoint.get().count){
                count.set(count.get()+1);
            }else{
                count.set(0);
                if (current.get()<dataRef.current.pattern.length){
                    current.set(current.get()+1);
                }
                currentPatternPoint.set(dataRef.current.pattern[current.get()])
            }            
        } 
        MoveTime();
    };
    return {
        init,
        points: data.points,
        step,
        stop,
        pause,
        start,

        isActive,
        setDuration,
    };
};

export default useMarket;