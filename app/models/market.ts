import { useState } from "react";
import { IValue } from '../libs/interfaces';
import  useRefValue from '../libs/value';
import { useTimer } from "../libs/lib.timer";
import { IMarket, TPattern, TMarketPoint, TPatternPoint, IMarketDataManager } from "./types"; 
import { CreateMarketPoint } from "./utils";
import { defaultMarket } from "./defaults";
import { startTime, stepTime } from './consts';

const useMarket = (): IMarket=> {
    const [changed, setChanged] = useState(false);
    const [managers, setManagers] = useState<IMarketDataManager[]>([]);
    const { setDuration, isActive, toggle, reset } = useTimer({
        callback :  () => { step(); }, 
        state : false,
        duration : 1000,    
    });
    const pattern = useRefValue<TPatternPoint[]>(defaultMarket.pattern);
    const points = useRefValue<TMarketPoint[]>(defaultMarket.points); 
    const currentTime: IValue<number> = useRefValue(0);
    const count: IValue<number> = useRefValue(0);
    const current: IValue<number> = useRefValue(0);
    const currentPatternPoint: IValue<TPatternPoint> = useRefValue(pattern.get()[0]);

 /*   useEffect(() => { 
        currentPatternPoint.set(pattern[0]);
        patternRef.current=pattern;
    }, [pattern]);
*/
    const MoveTime = ()=> {
        currentTime.set(currentTime.get() + stepTime);     
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
        return result;
    };

    const init = (init_pattern: TPattern) =>{
        currentTime.set(startTime);
        count.set(0);
        current.set(0);
        pattern.set([...pattern.get(), ... init_pattern.points]);
        currentPatternPoint.set(pattern.get()[0]);
        points.set([...points.get(), ...initialPoints(init_pattern.pre_points)]); 
        managers.forEach(element => {
            element.setPoints(initialPoints(init_pattern.pre_points));    
        });  
        setChanged(!changed);     
    };

    function addManager(manager: IMarketDataManager){
        setManagers(prevItems => [...prevItems, manager]);
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

    return {
        init,
        //points: points.get(),
        step,
        stop,
        pause,
        start,

        isActive,
        setDuration,
        addManager,
        changed,
    };
};

export default useMarket;