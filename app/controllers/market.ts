import { IValue } from '../libs/data-hooks/interfaces';
import useRefValue from '../libs/data-hooks/value';
import useRefArray from '../libs/data-hooks/array';
import { useTimer } from "../libs/useTimer";
import { TMarketState } from "../models/types";
import { TPattern, TMarketPoint, TPatternPoint } from "../models/types"; 
import { IMarket } from "./interfaces";
import { CreateMarketPoint } from "../models/utils";
import { defaultMarket } from "../models/defaults";
import { defaultSpeeds } from '../models/consts';
import { stepTime } from '../models/consts';
import { SpeedTitleToNumber } from '../models/utils';
import useViewsManager from "./viewsManager"; 
import useDataController from './dataController';
import { IDataManager } from './dataController';
import { IViewController } from "./viewController";

const useMarket = (): IMarket => {
    const dataController = useDataController<TMarketPoint>();
    const viewsManager = useViewsManager<TMarketState>({});
    const timer = useTimer({
        callback:  () => { step(); }, 
        state: false,
        duration: 1000,    
    });
    const initPattern = useRefArray<TPatternPoint>(defaultMarket.pattern);
    const pattern = useRefArray<TPatternPoint>(defaultMarket.pattern);
    const currentTime: IValue<number> = useRefValue(0);
    const count: IValue<number> = useRefValue(0);
    const current: IValue<number> = useRefValue(0);
    const currentPatternPoint: IValue<TPatternPoint> = useRefValue(defaultMarket.pattern[0]);
    const speedID: IValue<number> = useRefValue(0);
    const isRunning = useRefValue<boolean>(false);

    const MoveTime = ()=> {
        currentTime.set(currentTime.get() + stepTime);   
    };

    const getCurrentState = (): TMarketState => {
        return {
            isRunning: isRunning.get(),
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

    function addManager(manager: IDataManager<TMarketPoint>) {
        dataController.add(manager);
        dataController.setAll(initialPoints(initPattern.get()));
    };

    function start(){
        isRunning.set(true);
        timer.toggle(); 
        viewsManager.updateAll(getCurrentState());  
    };
    
    function stop(){
        isRunning.set(false);   
        timer.reset(); 
        viewsManager.updateAll(getCurrentState());     
    };
    
    function pause(){
        timer.toggle();  
        viewsManager.updateAll(getCurrentState());
    };
    
    function step(){
        isRunning.set(true);
        MoveTime();
        const newPoint: TMarketPoint = CreateMarketPoint(currentTime.get(), currentPatternPoint.get());
        dataController.updateAll(newPoint);
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
        viewsManager.updateAll(getCurrentState()); 
    };

    const getSpeedTitle = (): string => {
        return defaultSpeeds[speedID.get()].element;
    };

    const addView = (view: IViewController<TMarketState>) => {
        viewsManager.add(view);
        view.update(getCurrentState());
    };

    return {
        init,
        step,
        stop,
        pause,
        start,
        setSpeed,
        addManager,
        addView,
        getCurrentState,	
    };
};

export default useMarket;