import useRefArray from "../libs/array";
import useRefValue from "../libs/value";
import { IArray, IValue } from "../libs/interfaces";
import { TDeal, TStatValue, TStatRange } from './types';
import { IStatistics } from './interfaces';
import { defaultDeal } from "./defaults";

const useStatistics = (): IStatistics => {
    const deals: IArray<TDeal> = useRefArray([defaultDeal]);
    
    function pushDeal(deal: TDeal) {
        deals.push(deal);
    };

    function clear() {
        deals.clear();
    };

    function lastDeal(): TDeal {
        return deals.get()[deals.count - 1];
    };

    function currentResult(): TStatValue {
        const last = lastDeal();
        return {
            value: Math.round(last.profitLoss),
            percentage: Math.round(last.profitLoss / last.volume * 100),
        };
    }

    function totalResult(): TStatValue {
        const totalProfitLoss = deals.get().reduce((total, deal) => total + deal.profitLoss, 0);
        const totalVolume = deals.get().reduce((total, deal) => total + deal.volume, 0);
        return {
            value: Math.round(totalProfitLoss),
            percentage: Math.round(totalVolume > 0 ? (totalProfitLoss / totalVolume) * 100 : 0),
        };
    }

    function profitDeals(): TStatValue {
        const profitDeals = deals.get().filter(deal => deal.profitLoss > 0).length;
        return {
            value: Math.round(profitDeals),
            percentage: Math.round(profitDeals / deals.count * 100),
        };
    }

    function lossDeals(): TStatValue {
        const lossDeals = deals.get().filter(deal => deal.profitLoss < 0).length;
        return {
            value: Math.round(lossDeals),
            percentage: Math.round(lossDeals / deals.count * 100),
        };
    }

    function profit(): TStatRange {
        const profits = deals.get().filter(deal => deal.profitLoss > 0).map(deal => deal.profitLoss);
        return {
            min: Math.round(Math.min(...profits)),
            max: Math.round(Math.max(...profits)),
            average: Math.round(profits.reduce((total, profit) => total + profit, 0) / profits.length),
        };
    }

    function loss(): TStatRange {
        const losses = deals.get().filter(deal => deal.profitLoss < 0).map(deal => deal.profitLoss);
        return {
            min: Math.round(Math.min(...losses)),
            max: Math.round(Math.max(...losses)),
            average: Math.round(losses.reduce((total, loss) => total + loss, 0) / losses.length),
        };
    }

    function averageProfitLoss(): TStatValue {
        const totalProfitLoss = deals.get().reduce((total, deal) => total + deal.profitLoss, 0);
        const average = deals.count > 0 ? totalProfitLoss / deals.count : 0;
        return {
            value: Math.round(average),
            percentage: Math.round(average / totalProfitLoss * 100),
        };
    }
    
    return {
        deals: deals.get(),
        lastDeal: lastDeal(),
        pushDeal,
        clear,
        count: deals.count,
        currentResult: currentResult(),
        totalResult: totalResult(),
        profitDeals: profitDeals(),
        lossDeals: lossDeals(),
        profit: profit(),
        loss: loss(),
        averageProfitLoss: averageProfitLoss(), 
    };
};

export default useStatistics;
