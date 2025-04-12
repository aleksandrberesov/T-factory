import useRefArray, { IArray }  from "../libs/data-hooks/array";
import { TDeal, TStatValue, TStatRange } from '../models/types';
import { IStatistics } from './interfaces';
import { defaultDeal } from "../models/defaults";

const useStatistics = (): IStatistics => {
    const deals: IArray<TDeal> = useRefArray([defaultDeal]);
    
    function pushDeal(deal: TDeal) {
        deals.push(deal);
    };

    function clear() {
        deals.clear();
    };

    function lastDeal(): TDeal {
        return deals.get()[deals.getCount() - 1];
    };

    function currentResult(): TStatValue {
        const last = lastDeal();
        return {
            value: Math.round(last.profitLoss),
            percentage: last.volume>0 ? Math.round(last.profitLoss / last.volume * 100) : 0,
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
            percentage: Math.round(profitDeals / deals.getCount() * 100),
        };
    }

    function lossDeals(): TStatValue {
        const lossDeals = deals.get().filter(deal => deal.profitLoss < 0).length;
        return {
            value: Math.round(lossDeals),
            percentage: Math.round(lossDeals / deals.getCount() * 100),
        };
    }

    function profit(): TStatRange {
        const profits = deals.get().filter(deal => deal.profitLoss > 0).map(deal => deal.profitLoss);
        return {
            min: profits.length>0 ? Math.round(Math.min(...profits)) : 0,
            max: profits.length>0 ? Math.round(Math.max(...profits)) : 0,
            average: profits.length>0 ? Math.round(profits.reduce((total, profit) => total + profit, 0) / profits.length) : 0,
        };
    }

    function loss(): TStatRange {
        const losses = deals.get().filter(deal => deal.profitLoss < 0).map(deal => deal.profitLoss);
        return {
            min: losses.length>0 ? Math.round(Math.min(...losses)) : 0,
            max: losses.length>0 ? Math.round(Math.max(...losses)) : 0,
            average: losses.length>0 ? Math.round(losses.reduce((total, loss) => total + loss, 0) / losses.length) : 0,
        };
    }

    function averageProfitLoss(): TStatValue {
        const totalProfitLoss = deals.get().reduce((total, deal) => total + deal.profitLoss, 0);
        const average = deals.getCount() > 0 ? totalProfitLoss / deals.getCount() : 0;
        return {
            value: Math.round(average),
            percentage: totalProfitLoss>0 ? Math.round(average / totalProfitLoss * 100) : 0,
        };
    }

    function definedDealsCount(): number {
        return deals.get().filter(deal => deal.status !== undefined).length;
    }
    
    function closedDealsCount(): number {
        return deals.get().filter(deal => deal.status === false).length;
    }

    return {
        deals: deals.get(),
        lastDeal: lastDeal(),
        pushDeal,
        clear,
        count: closedDealsCount(),
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
