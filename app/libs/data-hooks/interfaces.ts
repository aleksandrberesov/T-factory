interface IValue<T> {
    get: () => T;
    set: (newValue: T) => void;
};

interface IArray<T> {
    get: () => T[];
    set: (newArray: T[]) => void;
    push: (newValue: T | IValue<T>) => void;
    clear: () => void;
    getCount: () => number;
};

export type { IArray, IValue };