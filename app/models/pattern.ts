import { useState, useCallback } from "react";
import { TPatternParameter } from "./types";

interface IPattern {
    patterns : string[];
    pre_points : TPatternParameter[];
    points : TPatternParameter[];
    select : (name: string) => void;
    init : ()=>void;    
};

const usePatterns = (fetch: (name: string)=> Promise<object>, init_fetch: ()=> Promise<object>): IPattern => {
    console.log("use patterns");
    
    const [patterns, setPatterns] = useState<string[]>([]);
    const [pre_points, setPre_points] = useState<TPatternParameter[]>([]);
    const [points, setPoints] = useState<TPatternParameter[]>([]);

    const setDefaultPattern = ()=> {

    };

    const select = useCallback(async (name: string) => { 
        try { 
            const data = await fetch(name); 
            console.log("fetch patterns", data); 
        } catch (error) { 
            console.error("Error during fetch", error); 
        } 
    }, [fetch]);

    const init = useCallback(async () => { 
        try { 
            const data = await init_fetch(); 
            console.log("init fetch patterns", data, JSON.stringify(data, null, 2)); 
            if (data && Array.isArray(data) && data.every(item => typeof item === 'string')) { 
                setPatterns(data); 
            } 
            if (patterns.length !== 0) { 
                select(patterns[0]); 
            } else { 
                setDefaultPattern();  
            } 
        } catch (error) { 
            console.error("Error during init fetch:", error); 
        }     
    }, [init_fetch]);

    return {
        patterns,
        pre_points,
        points,
        select,
        init
    };
};

export default usePatterns;
export type { IPattern };