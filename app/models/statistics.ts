import useRefArray from "../libs/array";
import { IArray, IValue } from "../libs/interfaces";
import { TDeal, TStatValue, TStatRange } from './types';
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
    };

    function currentResult(): TStatValue {
        const last = lastDeal();
        return {
            value: last.profitLoss,
            percentage: (last.profitLoss / last.volume) * 100,
        };
    }

    function totalResult(): TStatValue {
        const totalProfitLoss = deals.get().reduce((total, deal) => total + deal.profitLoss, 0);
        const totalVolume = deals.get().reduce((total, deal) => total + deal.volume, 0);
        return {
            value: totalProfitLoss,
            percentage: totalVolume > 0 ? (totalProfitLoss / totalVolume) * 100 : 0,
        };
    }

    function profitDeals(): TStatValue {
        const profitDeals = deals.get().filter(deal => deal.profitLoss > 0).length;
        return {
            value: profitDeals,
            percentage: (profitDeals / deals.count) * 100,
        };
    }

    function lossDeals(): TStatValue {
        const lossDeals = deals.get().filter(deal => deal.profitLoss < 0).length;
        return {
            value: lossDeals,
            percentage: (lossDeals / deals.count) * 100,
        };
    }

    function profit(): TStatRange {
        const profits = deals.get().filter(deal => deal.profitLoss > 0).map(deal => deal.profitLoss);
        return {
            min: Math.min(...profits),
            max: Math.max(...profits),
            average: profits.reduce((total, profit) => total + profit, 0) / profits.length,
        };
    }

    function loss(): TStatRange {
        const losses = deals.get().filter(deal => deal.profitLoss < 0).map(deal => deal.profitLoss);
        return {
            min: Math.min(...losses),
            max: Math.max(...losses),
            average: losses.reduce((total, loss) => total + loss, 0) / losses.length,
        };
    }

    function averageProfitLoss(): TStatValue {
        const totalProfitLoss = deals.get().reduce((total, deal) => total + deal.profitLoss, 0);
        const average = deals.count > 0 ? totalProfitLoss / deals.count : 0;
        return {
            value: average,
            percentage: (average / totalProfitLoss) * 100,
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
