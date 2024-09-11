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



export type { TUser, TProfile, TStatisticItem, TCard, TStar };