import { useState, useRef, useEffect } from "react";
import { TStatisticItem, TUser, TCard, TStar } from "./types"; 

type TProfileUpdateFunc = (upd: object) => void;

type TProfile = {
    id: number;
    lang?: string;
    user: TUser;
    balance: number;
    status: string;
    position: string;
    level: number;
    statistics: TStatisticItem[];
    cards : TCard[];
    stars : TStar[]
};

interface IProfile{
    data: TProfile;
    setData: (profileData: object) => void;
};

const defaultUser : TProfile = {
    id : 0,
    user : {
        first_name: "default",
        last_name: "user"
    },
    lang : "en",
    status: "unknown",
    balance: 100000,
    position: "hamster",
    level: 80,
    statistics : [
        {title: "first stat item", isDone: true }, 
        {title: "second stat item", isDone: true}, 
        {title: "third stat item", isDone: false}
    ],
    cards : [
        {title: "first card", description: "some about first card"},
        {title: "second card", description: "some about second card"},
        {title: "third card", description: "some about second card"},
        {title: "fourth card", description: "some about second card"},
        {title: "fifth card", description: "some about second card"},
    ],
    stars : [
        {title: "first star"},
        {title: "second star"}
    ]
};

const useProfile = (updFunc: TProfileUpdateFunc | undefined): IProfile => {
    console.log('use Profile');
    const [data, acceptData] = useState<TProfile>(defaultUser); 
    const profileDataRef = useRef(data);
    
    const setData = (newData: object) => {
        acceptData({...data, ...newData});
    };

    useEffect(() => { 
        if (updFunc !== undefined){
            updFunc(data);    
        } 
        profileDataRef.current = data;
    }, [data]);

    return {
        data,
        setData
    };
};
export type { TProfile, IProfile };
export { defaultUser }; 
export default useProfile;