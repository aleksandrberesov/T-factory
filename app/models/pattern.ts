import { useState, useCallback, useEffect } from "react";
import { TPattern, IPattern } from "./types";
import { defaultPattern } from "./defaults";

const usePattern = (fetch: (name: string)=> Promise<object>, init_fetch: ()=> Promise<object>): IPattern => {
    console.log("use patterns");
    
    const [patterns, setPatterns] = useState<string[]>([]);
    const [selectedPattern, setSelectedPattern] = useState<string>('');
    const [pattern, setPattern] = useState<TPattern>(defaultPattern);
    
    const select = useCallback(async (name: string) => { 
        console.log("select pattern ", name);
        try { 
            const data = await fetch(name); 
            console.log("fetch pattern", JSON.stringify(data, null, 2)); 
            setSelectedPattern(name);
            setPattern({...pattern, ...data});
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
        pattern,
        select,
        init
    };
};

export default usePattern;