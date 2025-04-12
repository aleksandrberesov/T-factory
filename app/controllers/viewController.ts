import { useEffect, useId, useState } from 'react';

interface IViewController<T> {
    update: (state: T) => void;
    id: string;
};

const useViewController = <T, >(subscribeFunc: (view: IViewController<T>) => void, initState: T): T => { 
    const [state, setState] = useState(initState);
    const uniqueId = useId(); 
    const update = (updatedState: T): void => {	
        setState(updatedState);
    };
    useEffect(() => {
        subscribeFunc({
            update,
            id: uniqueId,
        });
    },[subscribeFunc]);

    return state; 
};

export type { IViewController };
export default useViewController;