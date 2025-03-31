import { useRef, useCallback } from 'react'; 
import { IValue } from './interfaces'; 

const useRefValue = <T, >(initialValue: T): IValue<T> => { 
    const valueRef = useRef<T>(initialValue); 
    const get = useCallback((): T => { return valueRef.current; }, []); 
    const set = useCallback((newValue: T): void => { valueRef.current = newValue; }, []); 
    return { get, set }; 
};

export type { IValue };
export default useRefValue;