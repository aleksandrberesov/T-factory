import { useRef } from 'react'; 
import { IArray, IValue } from './interfaces';

const useRefArray = <T>(initialArray: T[] = []): IArray<T> => { 
    const arrayRef = useRef<T[]>(initialArray); 
    const get = ():T[] => { return arrayRef.current; }; 
    const set = (newArray: T[]):void => { arrayRef.current = newArray; }; 
    const push = (newValue: T | IValue<T>):void => {
        if (newValue!==null && typeof  newValue === "object" && "get" in newValue) {
            arrayRef.current = [...arrayRef.current, {...newValue.get()}]; 
        } else { 
            arrayRef.current = [...arrayRef.current, newValue]; 
        }
    };
    const clear = ():void => { arrayRef.current = []; };
    const getCount = ():number => {return arrayRef.current.length;};
    const remove = (index: number): void => {
        arrayRef.current = arrayRef.current.filter((element, i) => i !== index);
    };
    const isEmpty = (): boolean => {
        return arrayRef.current.length === 0;
    };
    return { 
        get, 
        set, 
        push, 
        clear,
        getCount,
        remove,
        isEmpty,
    }; 
};

export type { IArray, IValue };
export default useRefArray;