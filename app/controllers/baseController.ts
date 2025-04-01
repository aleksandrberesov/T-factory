import { useState } from "react";

interface IController {
    isChanged: boolean;
    applyChanges: () => void;
}

const useBaseController = (): IController => {
    const [isChanged, setIsChanged] = useState<boolean>(false);

    const applyChanges = () => {
        setIsChanged(!isChanged);
    };

    return {
        isChanged,
        applyChanges,
    };
};

export default useBaseController;
export type { IController };