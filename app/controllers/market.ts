import { IValue } from '../libs/data-hooks/interfaces';
import useRefValue from '../libs/data-hooks/value';
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
    const managers = useRefArray<IMarketDataManager>([]);
    const views = useRefArray<IViewController<TMarketState>>([]);
    const timer = useTimer({
        callback:  () => { step(); }, 
        state: false,
        duration: 1000,    
    });
    const initPattern = useRefArray<TPatternPoint>(defaultMarket.pattern);
    const pattern = useRefArray<TPatternPoint>(defaultMarket.pattern);
    const points = useRefArray<TMarketPoint>([]); 
    const currentTime: IValue<number> = useRefValue(0);
    const count: IValue<number> = useRefValue(0);
    const current: IValue<number> = useRefValue(0);
    const currentPatternPoint: IValue<TPatternPoint> = useRefValue(defaultMarket.pattern[0]);
    const speedID: IValue<number> = useRefValue(0);

    const MoveTime = ()=> {
        currentTime.set(currentTime.get() + stepTime);   
    };

    const getCurrentState = (): TMarketState => {
        return {
            isActive: timer.getIsActive(),
            speed: getSpeedTitle(),
        };
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
        currentTime.set(Math.round(Date.now()/1000)); 
        count.set(0);
        current.set(0);
        initPattern.set(init_pattern.pre_points);
        pattern.set(init_pattern.points);
        currentPatternPoint.set(pattern.get()[0]);  
    };

    function addManager(manager: IMarketDataManager){
        const existingView = managers.get().find(existing => existing.id === manager.id); // Check by unique ID
        if (!existingView) {
            managers.push(manager);
        }
        updateManagers(null, initialPoints(initPattern.get()));
    };

    function addView(view: IViewController<TMarketState>) {
        const existingView = views.get().find(existing => existing.id === view.id); // Check by unique ID
        if (!existingView) {
            views.push(view);
        }
    };

    function updateManagers(point: TMarketPoint | null, points: TMarketPoint[] | null){
        if (point !== null){
            managers.get().forEach(element => {
                element.appendPoint(point);
            });
        };
        if (points !== null){
            managers.get().forEach(element => {
                element.setPoints(points);    
            });
        };
    };

    function updateViews(){
        views.get().forEach(element => {
            element.update(getCurrentState());    
        }); 
    };

    function start(){
        timer.toggle(); 
        updateViews();   
    };
    
    function stop(){
        timer.reset(); 
        updateViews();      
    };
    
    function pause(){
        timer.toggle();  
        updateViews();
    };
    
    function step(){
        MoveTime();
        const newPoint: TMarketPoint = CreateMarketPoint(currentTime.get(), currentPatternPoint.get());
        points.push(newPoint); 
        updateManagers(newPoint, null);
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
    };

    const setSpeed = (ID: number) => {
        speedID.set(ID);
        timer.setDuration(1000 / SpeedTitleToNumber(defaultSpeeds[ID].element));
        updateViews(); 
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
        state: getCurrentState(),
        setSpeed,
        addManager,
        addView,
    };
};

export default useMarket;