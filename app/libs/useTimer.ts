import { useState, useEffect, useCallback } from 'react';
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
    const [seconds, setSeconds] = useState(0);
    const isActive = useRefValue<boolean>(props.state);
    const duration = useRefValue<number>(props.duration);
    const memoizedCallback = useCallback(()=>{props.callback()}, [props]);
    useEffect(() => {
        let interval = null;
        if (isActive.get()) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);
                memoizedCallback();
            }, duration.get());
        } else if (!isActive.get() && seconds !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [seconds, duration, memoizedCallback]);

    const toggle = () => {
        isActive.set(!isActive.get());
        setSeconds(s => s + 1);
    };

    const reset = () => {
        setSeconds(0);
        isActive.set(false);
    };

    const getIsActive = (): boolean => {
        return isActive.get();
    };

    const setDuration = (newDuration: number) => {
        duration.set(newDuration);
    };

    return {
        getIsActive,
        setDuration,
        toggle,
        reset
    };
};

export { useTimer };