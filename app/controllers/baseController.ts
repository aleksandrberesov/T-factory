import { useState } from "react";

interface IController {
    isChanged: boolean;
    applyChanges: ()=> void;
};

const useBaseController = (): IController => {
    const [changed, setChanged] = useState<boolean>(false);

    const getIsChanged = ()=>{
       return changed; 
    }; 

    const applyChanges = ()=>{
        setChanged(!changed);
    };

    return {
        isChanged: getIsChanged(),
        applyChanges,
    };
};

export default useBaseController;
export type { IController };