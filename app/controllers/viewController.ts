import { useEffect, useId, useState } from 'react';

interface IViewController<T> {
    update: (state: T) => void;
    id: string;
};

const useViewController = <T, >(subscribe: (view: IViewController<T>) => void): T | undefined => { 
    const [state, setState] = useState<T>();
    const uniqueId = useId(); 
    const update = (updatedState: T): void => {	
        setState(updatedState);
    };
    useEffect(() => {
        subscribe({
            update,
            id: uniqueId,
        });
    },[]);

    return state; 
};

export type { IViewController };
export default useViewController;