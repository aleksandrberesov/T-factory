import { useState, useEffect } from "react";
import { IProfile, TProfile  } from "./types"; 
import { TUpdateObjectProc } from "../libs/lib.types";
import { defaultProfile } from "./defaults" 

const useProfile = (updFunc: TUpdateObjectProc | undefined): IProfile => {
    
    const [data, acceptData] = useState<TProfile>(defaultProfile); 
    
    const setData = (newData: object) => {
        acceptData({...data, ...newData});
    };

    useEffect(() => { 
        if (updFunc !== undefined){
            updFunc(data);    
        } 
    }, [data]);

    return {
        data,
        setData
    };
};

export default useProfile;