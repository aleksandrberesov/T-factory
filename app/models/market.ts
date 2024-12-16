import { useState, useEffect, useRef } from "react";
import { IValue } from '../libs/interfaces';
import  useRefValue from '../libs/value';
import { useTimer } from "../libs/lib.timer";
import { IMarket, TMarket, TPattern, TMarketPoint, TPatternPoint, IMarketDataManager } from "./types"; 
import { CreateMarketPoint, CreateMarketPoints } from "./utils";
import { defaultMarket } from "./defaults";
import { startTime, stepTime } from './consts';

const useMarket = (): IMarket=> {
    console.log('use Market');
    const [managers, setManagers] = useState<IMarketDataManager[]>([]);
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

    function addManager(manager: IMarketDataManager){
        setManagers(prevItems => [...prevItems, manager]);
    };

    const initialPoints = (init_pattern: TPatternPoint[])=> {
        let result : TMarketPoint[] = [];
        init_pattern.filter((item)=>item.count>0)
                    .forEach(element => {
                        for (let i = 0; i < element.count; i++){
                            result.push(CreateMarketPoint(currentTime.get(), element));
                            MoveTime();
                        }
                    });
                    console.log('init market: ', JSON.stringify(result, null, 2));
        return result;
    };

    const init = (init_pattern: TPattern) =>{
        currentTime.set(startTime);
        count.set(0);
        current.set(0);
        setData({...data, ...{pattern: init_pattern.points, data: initialPoints(init_pattern.pre_points)}}); 
        managers.forEach(element => {
            element.setPoints(initialPoints(init_pattern.pre_points));    
        });       
    };

    useEffect(() => { 
        currentPatternPoint.set(data.pattern[0]);
        dataRef.current=data;
    }, [data]);

    function start(){
        toggle();    
    };
    
    function stop(){
        reset();       
    };
    
    function pause(){
        toggle();  
    };
    
    function step(){
        const newPoint: TMarketPoint = CreateMarketPoint(currentTime.get(), currentPatternPoint.get());
        managers.forEach(element => {
            element.appendPoint(newPoint);
        });
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
        addManager,
    };
};

export default useMarket;