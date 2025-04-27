import useRefArray from '../libs/data-hooks/array';

interface IDataManager<T> {
    id: string;
    push: (data: T) => void;
    set: (data: T[]) => void;
};

interface IDataController<T> {
    add: (manager: IDataManager<T>) => void;
    updateAll: (data: T) => void;
    setAll: (data: T[]) => void;
};

const useDataController = <T, >(): IDataController<T> => {
    const managers = useRefArray<IDataManager<T>>([]);

    const add = (manager: IDataManager<T>) => {
        const existingView = managers.get().find(existing => existing.id === manager.id); // Check by unique ID
        if (!existingView) {
            managers.push(manager);
        }
    };	

    const updateAll = (data: T) => {
        managers.get().forEach(element => {
            element.push(data);
        });
    };

    const setAll = (data: T[]) => {
        managers.get().forEach(element => {
            element.set(data);
        });
    };
    
    return {
        add,
        updateAll,
        setAll,
    };
};

export default useDataController;
export type { IDataManager, IDataController };