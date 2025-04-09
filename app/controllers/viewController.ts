import { useCallback, useEffect, useState } from 'react';

interface IViewController<T> {

};

const useViewController = <T, >(subcrubeFunc: (view: T)=>{}): IViewController<T> => { 
    const [isChanged, setIsChanged] = useState(false);
    const update = (): void => {
        setIsChanged(!isChanged);
    };
    useEffect(() => {
        subcrubeFunc({
            update,
        });
    });
    const applyChanges = ()=>{
            
    };
    return applyChanges; 
};

export type { IViewController };
export default useViewController;