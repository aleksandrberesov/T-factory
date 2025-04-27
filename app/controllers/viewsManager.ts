import { IViewController } from './viewController';
import useRefArray from '../libs/data-hooks/array';

interface IViewsManager<T> {
    add: (view: IViewController<T>) => void;
    remove: (id: number) => void;
    update: (id: number, state: T) => void;
    updateAll: (state: T) => void;
};

type TViewsManagerProps<T> = {

};

const useViewsManager = <T, >(): IViewsManager<T>  => {
    const views = useRefArray<IViewController<T>>([]);

    const add = (view: IViewController<T>) => {
        views.push(view);
    };
    const remove = (id: number) => {
       views.remove(id);
    };
    const update = (id: number, state: T) => {
        const view = views.get()[id];
        if (view) {
            view.update(state);
        }
    };
    const updateAll = (state: T) => {
        views.get().forEach(element => {
            element.update(state);    
        });
    };
    return {
        add,
        remove,
        update,
        updateAll,
    };
};

export default useViewsManager;
export type { IViewsManager, TViewsManagerProps };