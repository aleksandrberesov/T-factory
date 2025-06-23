import useRefValue from "../libs/data-hooks/value";
import { TProfile  } from "../models/types"; 
import { IProfile } from "./interfaces";
import { TUpdateObjectProc } from "../libs/types";
import { defaultProfile } from "../models/defaults" 

const useProfile = (updFunc: TUpdateObjectProc): IProfile => {
    const data = useRefValue<TProfile>(defaultProfile); 
    const save = (newData: object) => {
        data.set({...data.get(), ...newData});
        updFunc(data.get());
    };
    const init = (initData: TProfile) => {
        data.set({...data.get(), ...initData});
    };
    return {
        init,
        getCurrent: () => data.get(),
        save
    };
};

export default useProfile;