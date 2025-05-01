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
    clear: () => void;
};

const useDataController = <T, >(): IDataController<T> => {
    const managers = useRefArray<IDataManager<T>>([]);

    const add = (manager: IDataManager<T>) => {
        const existingManager = managers.get().find(existing => existing.id === manager.id); // Check by unique ID
        if (!existingManager) {
            managers.push(manager);
        } else {
            console.warn(`Manager with id: ${manager.id} already exists.`);
        }
    };	

    const updateAll = (data: T) => {
        const allManagers = managers.get();
        if (allManagers.length > 0) {
            allManagers.forEach(element => {
                element.push(data);
            });
        } else {
            console.warn("No managers available to update.");
        }
    };

    const setAll = (data: T[]) => {
        const allManagers = managers.get();
        if (allManagers.length > 0) {
            allManagers.forEach(element => {
                element.set(data);
            });
        } else {
            console.warn("No managers available to set data.");
        }
    };

    const clear = () => {
        managers.set([]);
    };
    
    return {
        add,
        updateAll,
        setAll,
        clear,
    };
};

export default useDataController;
export type { IDataManager, IDataController };