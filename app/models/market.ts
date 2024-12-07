import { useState, useEffect } from "react";
import { IValue } from '../libs/interfaces';
import  useRefValue from '../libs/value';
import { IMarket, TMarket, TPattern, TMarketPoint, TPatternPoint } from "./types"; 
import { generateNormalRandom } from "./utils";
import { defaultMarket, defaultPattern } from "./defaults";
import { startTime } from './consts';
import {UTCTimestamp} from 'lightweight-charts';

const useMarket = (): IMarket=> {
    console.log('use Market');
    const [data, acceptData] = useState<TMarket>(defaultMarket); 
    const currentTime: IValue<number> = useRefValue(startTime);
    const currentPattern: IValue<TPattern> = useRefValue(defaultPattern);

    const setData = (newData: object) => {
        acceptData({...data, ...newData});
    };

    const init = (pattern: TPattern) =>{
        console.log('market: ', JSON.stringify(pattern, null, 2));
        currentPattern.set(pattern);  
        setData(data); 
    };

    const initialPoints = ()=> {
        let result : TMarketPoint[] = [];
        currentPattern.get().pre_points.filter((item)=>item.count>0).forEach(element => {
            for (let i = 0; i < element.count; i++){
                currentTime.set(currentTime.get() + 1000); 
                result.push({
                    value: generateNormalRandom(element.expectation, element.volatility),
                    open: 10,
                    high: 10.63,
                    low: 9.49,
                    close: 9.55,
                    time: currentTime.get() as UTCTimestamp
                });  
            }
        });
        return result;
    };

    useEffect(() => { 

    }, [data]);

    return {
        init,
        initialPoints,
    };
};

export default useMarket;