type TOnClickFunction = () => void;
type TOnSelectedFunction = (id: number) => void;

type TUser = {
    first_name: string;
    last_name: string;    
};

type TStatisticItem = {
    title: string;
    isDone: boolean;    
};

type TProfile = {
    id: number;
    statistics: TStatisticItem[];
};

export type { TUser, TProfile, TOnClickFunction, TOnSelectedFunction, TStatisticItem };