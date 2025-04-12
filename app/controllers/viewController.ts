import { useCallback, useEffect, useRef, useState, MutableRefObject } from 'react';

type TAddViewProcedure = (view: IViewController<any>) => void;
type TReturnValue = any | null;

interface IViewController<T> {
    update: (state: TReturnValue) => void;
};

const useViewController = <T, >(subscribeFunc: TAddViewProcedure, initState: TReturnValue): TReturnValue => { 
    const [state, setState] = useState(initState);
    const update = (updatedState: TReturnValue): void => {	
        setState(updatedState);
    };
    useEffect(() => {
        subscribeFunc({
            update,
        });
    },[subscribeFunc]);

    return state; 
};

export type { IViewController };
export default useViewController;