import { useState, useEffect, useCallback } from 'react';
import { TVoidFunc } from './types';

interface ITimer {
    seconds: number;
    isActive: boolean;
    setDuration: (duration: number) => void;
    toggle: () => void;
    reset: () => void;
};

type TTimerProps = {
    callback: TVoidFunc;
    state : boolean;
    duration: number;
};

const useTimer = (timerprops: TTimerProps): ITimer => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(timerprops.state);
    const [duration, setDuration] = useState(timerprops.duration);
    const memoizedCallback = useCallback(()=>{timerprops.callback()}, [timerprops]);
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                memoizedCallback();
            }, duration);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isActive, seconds, duration, memoizedCallback]);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setSeconds(0);
        setIsActive(false);
    };

    return {
        seconds,
        isActive,
        setDuration,
        toggle,
        reset
    };
};

export { useTimer };