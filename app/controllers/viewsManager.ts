import { IViewController } from './viewController';
import useRefArray from '../libs/data-hooks/array';

interface IViewsManager<T> {
    add: (view: IViewController<T>) => void;
    remove: (id: number) => void;
    update: (id: number, state: T) => void;
    updateAll: (state: T) => void;
    clear: () => void;
};

type TViewsManagerProps<T> = {
    initState ?: T;
    updateFunction ?: (state: T) => void;
};

const useViewsManager = <T, >( props: TViewsManagerProps<T> ): IViewsManager<T>  => {
    const views = useRefArray<IViewController<T>>([]);

    const add = (view: IViewController<T>) => {
        if (!views.get().some(existingView => existingView === view)) {
            views.push(view);
            if (props.initState) {
                view.update(props.initState);
            }
        }
    };
    const remove = (id: number) => {
        if (id >= 0 && id < views.get().length) {
            views.remove(id);
        } else {
            console.warn(`Attempted to remove a view with an invalid id: ${id}`);
        }
    };
    const update = (id: number, state: T) => {
        const view = views.get()[id];
        if (view) {
            view.update(state);
        } else {
            console.warn(`No view found with id: ${id}`);
        }
    };
    const updateAll = (state: T) => {
        const allViews = views.get();
        if (allViews.length > 0) {
            allViews.forEach(element => {
                element.update(state);
            });
        } else {
            console.warn("No views available to update.");
        }
    };
    const clear = () => {
        views.set([]);
    };
    return {
        add,
        remove,
        update,
        updateAll,
        clear,
    };
};

export default useViewsManager;
export type { IViewsManager, TViewsManagerProps };