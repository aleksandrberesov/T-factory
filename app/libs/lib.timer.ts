import { useState, useEffect, useCallback } from 'react';

type TVoidFunc = () => void;

interface ITimer {
    seconds: number;
    isActive: boolean;
    toggle: () => void;
    reset: () => void;
}

type TTimerProps = {
    callback: TVoidFunc;
    initstate: boolean;
};

const useTimer = (callback: TVoidFunc): ITimer => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const memoizedCallback = useCallback(callback, [callback]);
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                memoizedCallback();
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isActive, seconds, memoizedCallback]);

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
        toggle,
        reset
    };
};

export { useTimer };