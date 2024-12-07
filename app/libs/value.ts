import { useRef } from 'react'; 
import { IValue } from './interfaces'; 

const useRefValue = <T,>(initialValue: T): IValue<T> => { 
    const valueRef = useRef<T>(initialValue); 
    const get = (): T => { return valueRef.current; }; 
    const set = (newValue: T): void => { valueRef.current = newValue; }; 
    return { get, set }; 
};

export default useRefValue;