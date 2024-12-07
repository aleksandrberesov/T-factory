import { useState, useRef, useEffect } from "react";
import { IProfile, TProfile  } from "./types"; 
import { TUpdateObjectProc } from "../libs/lib.types";
import { defaultUser } from "./defaults" 

const useProfile = (updFunc: TUpdateObjectProc | undefined): IProfile => {
    console.log('use Profile');
    const [data, acceptData] = useState<TProfile>(defaultUser); 
    //const profileDataRef = useRef(data);
    
    const setData = (newData: object) => {
        acceptData({...data, ...newData});
    };

    useEffect(() => { 
        if (updFunc !== undefined){
            updFunc(data);    
        } 
        //profileDataRef.current = data;
    }, [data]);

    return {
        data,
        setData
    };
};

export default useProfile;