import { useEffect, useState } from "react";
import { IValue } from '../libs/data-hooks/interfaces';
import  useRefValue from '../libs/data-hooks/value';
import useRefArray from '../libs/data-hooks/array';
import { useTimer } from "../libs/useTimer";
import { TMarketState } from "../models/types";
import { IViewController } from "./viewController";
import { TPattern, TMarketPoint, TPatternPoint } from "../models/types"; 
import { IMarket, IMarketDataManager } from "./interfaces";
import { CreateMarketPoint } from "../models/utils";
import { defaultMarket } from "../models/defaults";
import { defaultSpeeds } from '../models/consts';
import { stepTime } from '../models/consts';
import { SpeedTitleToNumber } from '../models/utils';

const useMarket = (): IMarket => {
    const [managers, setManagers] = useState<IMarketDataManager[]>([]);
    const views = useRefArray<IViewController<TMarketState>>([]);
    const { setDuration, isActive, toggle, reset } = useTimer({
        callback:  () => { step(); }, 
        state: false,
        duration: 1000,    
    });
    const pattern = useRefValue<TPatternPoint[]>(defaultMarket.pattern);
    const points = useRefValue<TMarketPoint[]>([]); 
    const currentTime: IValue<number> = useRefValue(0);
    const count: IValue<number> = useRefValue(0);
    const current: IValue<number> = useRefValue(0);
    const currentPatternPoint: IValue<TPatternPoint> = useRefValue(defaultMarket.pattern[0]);
    const speedID: IValue<number> = useRefValue(0);

    const MoveTime = ()=> {
        currentTime.set(currentTime.get() + stepTime);     
    };

    const initialPoints = (init_pattern: TPatternPoint[]): TMarketPoint[] => {
        let result : TMarketPoint[] = [];
        init_pattern.filter((item)=>item.count>0)
                    .forEach(element => {
                        for (let i = 0; i < element.count; i++){
                            result.push(CreateMarketPoint(currentTime.get(), element));
                            MoveTime();
                        }
                    });
        return result;
    };

    const init = (init_pattern: TPattern) =>{
        currentTime.set(Date.now()/1000); 
        count.set(0);
        current.set(0);
        pattern.set([... init_pattern.points]);
        currentPatternPoint.set(pattern.get()[0]);
        console.log('Market managers', managers);
        managers.forEach(element => {
            element.setPoints(initialPoints(init_pattern.pre_points));    
        });       
    };

    function addManager(manager: IMarketDataManager){
        setManagers(prevItems => [...prevItems, manager]);
        console.log('manager is added to Market managers', manager);
    };

    function addView(view: IViewController<TMarketState>){
        views.push(view);  
        console.log('____________________view is added to Market views', view);
    };

    function updateViews(){
        views.get().forEach(element => {
            element.update({
                isActive: isActive,
                speed: getSpeedTitle(),
            });    
        }); 
    };

    function start(){
        toggle(); 
        updateViews();   
    };
    
    function stop(){
        reset(); 
        updateViews();      
    };
    
    function pause(){
        toggle();  
        updateViews();
    };
    
    function step(){
        const newPoint: TMarketPoint = CreateMarketPoint(currentTime.get(), currentPatternPoint.get());
        points.set([...points.get(), ...[newPoint]]); 
        managers.forEach(element => {
            console.log('Market manager element', element);
            element.appendPoint(newPoint);
        });
        if (currentPatternPoint.get().count!==0){
            if(count.get() < currentPatternPoint.get().count){
                count.set(count.get()+1);
            }else{
                count.set(0);
                if (current.get()<pattern.get().length){
                    current.set(current.get()+1);
                }
                currentPatternPoint.set(pattern.get()[current.get()])
            }            
        } 
        MoveTime();
    };

    const setSpeed = (ID: number) => {
        speedID.set(ID);
        setDuration(1000 / SpeedTitleToNumber(defaultSpeeds[ID].element));
        updateViews(); 
    };

    const getSpeedTitle = (): string => {
        return defaultSpeeds[speedID.get()].element;
    };


    useEffect(() => {
        console.log('Market views updatyed', views);
    }, [views]);

    return {
        init,
        step,
        stop,
        pause,
        start,

        lastPoint: currentPatternPoint.get(),
        state: {isActive, speed: getSpeedTitle()} as TMarketState,

        isActive,
        setSpeed,
        speed: getSpeedTitle(),
        addManager,
        addView,
    };
};

export default useMarket;