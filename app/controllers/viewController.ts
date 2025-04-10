import { useCallback, useEffect, useRef, useState, MutableRefObject } from 'react';

type TAddViewProc = (view: IViewController<any>) => void;
type TReturnValue = any | null;

interface IViewController<T> {
    update: (state: T) => void;
};

const useViewController = <T, >(subcrubeFunc: (view: IViewController<T>)=>void, initState: T | null): T | null => { 
    const [isChanged, setIsChanged] = useState(false);
    const data = useRef<T>(initState) as MutableRefObject<T>;
    const update = (state: T): void => {
        data.current = state;
        setIsChanged(!isChanged);
    };
    useEffect(() => {
        subcrubeFunc({
            update,
        });
    });

    return data.current; 
};

export type { IViewController };
export default useViewController;