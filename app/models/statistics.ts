import useRefArray from "../libs/array";
import { IArray, IValue } from "../libs/interfaces";
import { TDeal } from './types';
import { IStatistics } from './interfaces';

const useStatistics = (): IStatistics => {
    const deals: IArray<TDeal> = useRefArray();

    function pushDeal(deal: TDeal) {
        deals.push(deal);
    };

    function clear() {
        deals.clear();
    };

    function lastDeal(): TDeal {
        return deals.get()[deals.count - 1];
    }

    return {
        deals: deals.get(),
        lastDeal: lastDeal(),
        pushDeal,
        clear,
        count: deals.count,
    };
};

export default useStatistics;
