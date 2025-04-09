import { useState } from "react";
import { IValue } from '../libs/data-hooks/interfaces';
import  useRefValue from '../libs/data-hooks/value';
import { useTimer } from "../libs/useTimer";
import { TPattern, TMarketPoint, TPatternPoint } from "../models/types"; 
import { IMarket, IMarketDataManager, IMarketView } from "./interfaces";
import { CreateMarketPoint } from "../models/utils";
import { defaultMarket } from "../models/defaults";
import { defaultSpeeds } from '../models/consts';
import { stepTime } from '../models/consts';
import { SpeedTitleToNumber } from '../models/utils';

const useMarket = (): IMarket => {
    const [managers, setManagers] = useState<IMarketDataManager[]>([]);
    const [views, setViews] = useState<IMarketView[]>([]);
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
        managers.forEach(element => {
            element.setPoints(initialPoints(init_pattern.pre_points));    
        });       
    };

    function addManager(manager: IMarketDataManager){
        setManagers(prevItems => [...prevItems, manager]);
    };

    function addView(view: IMarketView){
        setViews(prevItems => [...prevItems, view]);    
    };

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
        points.set([...points.get(), ...[newPoint]]); 
        managers.forEach(element => {
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
        views.forEach(element => {
            element.update({
                isActive: isActive,
                speed: getSpeedTitle(),
            });    
        }); 
    };

    const getSpeedTitle = (): string => {
        return defaultSpeeds[speedID.get()].element;
    };

    return {
        init,
        step,
        stop,
        pause,
        start,

        currentPoint: currentPatternPoint.get(),

        isActive,
        setSpeed,
        speed: getSpeedTitle(),
        addManager,
        addView,
    };
};

export default useMarket;