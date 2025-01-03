import { useState } from 'react';
import { TDeal } from './types';
import { IStatistics } from './interfaces';

const useStatistics = (): IStatistics => {
    const [currentDeal, setCurrentDeal] = useState<TDeal | null>(null);
    const [allDeals, setAllDeals] = useState<TDeal[]>([]);

    const addDeal = (deal: TDeal) => {
        setAllDeals([...allDeals, deal]);
    };

    return {
        currentDeal,
        allDeals,
        setCurrentDeal,
        addDeal,
    };
};

export { useStatistics };
