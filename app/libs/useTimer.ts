import { useRef, useEffect, useCallback, useState } from 'react';
import { TVoidFunc } from './types';
import useRefValue from './data-hooks/value';

interface ITimer {
    getIsActive: () => boolean;
    setDuration: (duration: number) => void;
    toggle: () => void;
    reset: () => void;
};

type TTimerProps = {
    callback: TVoidFunc;
    state : boolean;
    duration: number;
};

const useTimer = (props: TTimerProps): ITimer => {
    const [changed, setChanged] = useState<boolean>(false);
    const seconds = useRef(0); 
    const isActive = useRefValue<boolean>(props.state);
    const duration = useRefValue<number>(props.duration);
    const memoizedCallback = useCallback(() => { props.callback(); }, [props]);

    useEffect(() => {
        let interval = null;
        if (isActive.get()) {
            interval = setInterval(() => {
                seconds.current += 1; 
                memoizedCallback();
            }, duration.get());
        } else if (!isActive.get() && seconds.current !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [changed]); 

    const toggle = () => {
        isActive.set(!isActive.get());
        seconds.current += 1;
        setChanged(prev => !prev); 
    };

    const reset = () => {
        seconds.current = 0; // Reset seconds
        isActive.set(false);
        setChanged(prev => !prev);
    };

    const getIsActive = (): boolean => {
        return isActive.get();
    };

    const setDuration = (newDuration: number) => {
        duration.set(newDuration);
        setChanged(prev => !prev);
    };

    return {
        getIsActive,
        setDuration,
        toggle,
        reset
    };
};

export { useTimer };