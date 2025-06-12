import { useEffect } from "react";
import useRefValue from "../libs/data-hooks/value";
import { TProfile  } from "../models/types"; 
import { IProfile } from "./interfaces";
import { TUpdateObjectProc } from "../libs/types";
import { defaultProfile } from "../models/defaults" 

const useProfile = (updFunc: TUpdateObjectProc | undefined): IProfile => {
    const data = useRefValue<TProfile>(defaultProfile); 
    const setData = (newData: object) => {
        data.set({...data.get(), ...newData});
    };
    return {
        data: data.get(),
        setData
    };
};

export default useProfile;