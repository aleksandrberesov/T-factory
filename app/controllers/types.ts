import { ILocalizator } from '../libs/useLocalization';

type TStatus = 'loading' | 'error' | 'done' | 'init';

interface IApplication {
    changed: boolean;

    status: string; 
    statusInfo: string;

    localizer: ILocalizator;
    profile: any; 
    pattern: any;
    market: any;
    trader: any;
};

export type { IApplication, TStatus };