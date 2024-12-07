export interface IValue<T> { 
    get: () => T; 
    set: (newValue: T) => void;
};

