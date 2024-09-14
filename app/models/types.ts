import { ISeriesApi, Time } from 'lightweight-charts';

type TUser = {
    first_name: string;
    last_name: string;    
};

type TStatisticItem = {
    title: string;
    isDone: boolean;    
};

type TCard = {
    title : string;
    description : string;
};

type TStar = {
    title : string;
};

type TProfile = {
    id: number;
    lang: string;
    user: TUser;
    status: string;
    position: string;
    level: number;
    statistics: TStatisticItem[];
    cards : TCard[];
    stars : TStar[]
};

interface ITrade {
    state : string | undefined;
    series ?: ISeriesApi<"Line", Time> | undefined;
    Sell() : void;
    Buy() : void;
    Close() : void;
    Play() : void;
    Pause() : void;
    Next() : void;
    Stop() : void;
    SetSeries(seriesRef: ISeriesApi<"Line", Time>) : void;
};


export type { TUser, TProfile, TStatisticItem, TCard, TStar };
export type { ITrade };