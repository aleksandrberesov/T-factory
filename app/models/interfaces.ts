import { TDeal } from './types';

interface IStatistics {
    currentDeal: TDeal | null;
    allDeals: TDeal[];
    setCurrentDeal: (deal: TDeal) => void;
    addDeal: (deal: TDeal) => void;
}

interface IApplication {

};

export type { IApplication, IStatistics };