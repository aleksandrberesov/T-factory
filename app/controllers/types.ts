import { ILocalizator } from '../libs/useLocalization';
import { IPattern, IProfile, IMarket, ITrade } from './interfaces';

type TStatus = 'loading' | 'error' | 'done' | 'init';

interface IApplication {
    isChanged: boolean;
    
    status: string; 
    statusInfo: string;

    localizer: ILocalizator;
    profile: IProfile; 
    pattern: IPattern;
    market: IMarket;
    trader: ITrade;
};

export type { IApplication, TStatus };