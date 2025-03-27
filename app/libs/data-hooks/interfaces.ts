export interface IValue<T> { 
    get: () => T; 
    set: (newValue: T) => void;
};

export interface IArray<T> {
    get: () => T[]; 
    set: (newArray: T[]) => void;
    push: (newValue: T | IValue<T>) => void;
    clear: () => void;
    count: number;
};

export interface IObject extends IValue<object> {
    update: (upd: object) => object;
}; 

