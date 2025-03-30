import { TNumberToStringFunc } from '../libs/types';

type TStatus = 'loading' | 'error' | 'done' | 'init';

interface IApplication {
    changed: boolean;

    status: string; 
    statusInfo: string;

    localizer: any;
    profile: any; 
    pattern: any;
    market: any;
    trader: any;
};

export type { IApplication, TStatus };