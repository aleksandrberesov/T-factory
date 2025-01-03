import useRefValue from "../libs/value";
import useRefArray from "../libs/array";
import { IArray, IValue } from "../libs/interfaces";
import { TDeal } from './types';
import { defaultDeal } from "./defaults";
import { IStatistics } from './interfaces';

const useStatistics = (): IStatistics => {
    const deal: IValue<TDeal> = useRefValue(defaultDeal);
    const deals: IArray<TDeal> = useRefArray();


    return {

    };
};

export { useStatistics };
