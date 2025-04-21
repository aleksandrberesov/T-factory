import { useCallback } from "react";
import { IPattern } from "./interfaces";
import { TPattern } from "../models/types";
import { defaultPattern } from "../models/defaults";
import useRefArray from "../libs/data-hooks/array";
import useRefValue from "../libs/data-hooks/value";

const usePattern = (fetch: (name: string)=> Promise<object>, init_fetch: ()=> Promise<object>, commit : (data: object)=>void): IPattern => {
    const patterns = useRefArray<string>([]);
    const selectedPattern = useRefValue<string>('');
    const pattern = useRefValue<TPattern>(defaultPattern);
    
    const select = useCallback(async (name: string) => {     
        try { 
            const data = await fetch(name); 
            selectedPattern.set(name);
            pattern.set({...pattern.get(), ...data});
        } catch (error) { 
            console.error("Error during fetch", error); 
        } 
    }, [fetch]);

    const init = useCallback(async () => { 
        try { 
            const data = await init_fetch(); 
            if (data && Array.isArray(data) && data.every(item => typeof item === 'string')) { 
                patterns.set(data); 
            } 
            if (patterns.getCount() !== 0) { 
                await select(patterns.get()[0]); 
            }
        } 
        catch (error) { 
            console.error("Error during init fetch:", error); 
        } 
        finally {
            return pattern.get();
        }    
    }, [init_fetch]);

    const save = useCallback((points: TPattern) => {
        pattern.set({...pattern.get(), ...points});
        commit({...{name: selectedPattern}, ...points});
    },[]);

    return {
        patterns: patterns.get(),
        pattern: pattern.get(),
        select,
        save,
        init
    };
};

export default usePattern;