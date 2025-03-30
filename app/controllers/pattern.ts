import { useState, useCallback, useEffect } from "react";
import { IPattern } from "./interfaces";
import { TPattern } from "../models/types";
import { defaultPattern } from "../models/defaults";

const usePattern = (fetch: (name: string)=> Promise<object>, init_fetch: ()=> Promise<object>, commit : (data: object)=>void): IPattern => {
    const [patterns, setPatterns] = useState<string[]>([]);
    const [selectedPattern, setSelectedPattern] = useState<string>('');
    const [pattern, setPattern] = useState<TPattern>(defaultPattern);
    
    const select = useCallback(async (name: string) => {     
        try { 
            const data = await fetch(name); 
            
            setSelectedPattern(name);
            setPattern({...pattern, ...data});
        } catch (error) { 
            console.error("Error during fetch", error); 
        } 
    }, [fetch]);

    const init = useCallback(async () => { 
        try { 
            const data = await init_fetch(); 
            if (data && Array.isArray(data) && data.every(item => typeof item === 'string')) { 
                setPatterns(data); 
            } 
            if (patterns.length !== 0) { 
                select(patterns[0]); 
            }
        } catch (error) { 
            console.error("Error during init fetch:", error); 
        }     
    }, [init_fetch]);

    const save = useCallback((points: TPattern) => {
        console.log("Save pattern");
        setPattern({...pattern, ...points});
        commit({...{name: selectedPattern}, ...points});
    },[]);

   /*useEffect(()=>{
        select(patterns[0]);
    },[patterns]);
*/
    return {
        patterns,
        pattern,
        select,
        save,
        init
    };
};

export default usePattern;