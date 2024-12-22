import { useRef } from 'react'; 
import { IArray, IValue } from './interfaces'; 

const useRefArray = <T, >(): IArray<T> => { 
    const arrayRef = useRef<T[]>([]); 
    const get = ():T[] => { return arrayRef.current; }; 
    const set = (newArray: T[]):void => { arrayRef.current = newArray; }; 
    const push = (newValue: T | IValue<T>):void => {
        if (newValue!==null && typeof  newValue === "object" && "get" in newValue) {
             arrayRef.current = [...arrayRef.current, newValue.get()]; 
        } else { 
            arrayRef.current = [...arrayRef.current, newValue]; 
        }
    };
    const count = ():number => {return arrayRef.current.length;};
    return { 
        get, 
        set, 
        push, 
        count: count() 
    }; 
};

export default useRefArray;