import { useState, useEffect } from "react";
import useRefValue from "../libs/data-hooks/value";
import { TProfile  } from "./types"; 
import { IProfile } from "./interfaces";
import { TUpdateObjectProc } from "../libs/types";
import { defaultProfile } from "./defaults" 

const useProfile = (updFunc: TUpdateObjectProc | undefined): IProfile => {
    
    const data = useRefValue<TProfile>(defaultProfile); 
    
    const setData = (newData: object) => {
        data.set({...data.get(), ...newData});
    };

    useEffect(() => { 
        if (updFunc !== undefined){
            updFunc(data);    
        } 
    }, [data]);

    return {
        data: data.get(),
        setData
    };
};

export default useProfile;