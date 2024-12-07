import { useState, useCallback, useEffect } from "react";
import { TPatternParameter, IPattern } from "./types";

const usePattern = (fetch: (name: string)=> Promise<object>, init_fetch: ()=> Promise<object>): IPattern => {
    console.log("use patterns");
    
    const [patterns, setPatterns] = useState<string[]>([]);
    const [selectedPattern, setSelectedPattern] = useState<string>('');
    const [pre_points, setPre_points] = useState<TPatternParameter[]>([]);
    const [points, setPoints] = useState<TPatternParameter[]>([]);

    const setDefaultPattern = ()=> {
        console.log("set default Pattern data");

    };

    const select = useCallback(async (name: string) => { 
        console.log("select pattern ", name);
        try { 
            const data = await fetch(name); 
            console.log("fetch pattern", JSON.stringify(data, null, 2)); 
            setSelectedPattern(name);

        } catch (error) { 
            console.error("Error during fetch", error); 
        } 
    }, [fetch]);

    const init = useCallback(async () => { 
        try { 
            const data = await init_fetch(); 
            //console.log("init fetch patterns", data, JSON.stringify(data, null, 2)); 
            if (data && Array.isArray(data) && data.every(item => typeof item === 'string')) { 
                setPatterns(data); 
            } 
            
            console.log("patterns array length", patterns.length);
            if (patterns.length !== 0) { 
                select(patterns[0]); 
            } else { 
                setDefaultPattern();  
            } 
        } catch (error) { 
            console.error("Error during init fetch:", error); 
        }     
    }, [init_fetch]);

    useEffect(()=>{
        select(patterns[0]);
    },[patterns]);

    return {
        patterns,
        pre_points,
        points,
        select,
        init
    };
};

export default usePattern;