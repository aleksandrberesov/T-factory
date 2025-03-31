import { useMemo, useState } from "react";

interface IController {
    isChanged: boolean;
    applyChanges: () => void;
}

const useBaseController = (): IController => {
    const [isChanged, setIsChanged] = useState<boolean>(false);

    const applyChanges = () => {
        console.log("Controller changes applied");
        setIsChanged((prev) => !prev);
    };

    return useMemo(() => ({
        isChanged,
        applyChanges,
    }), []);
};

export default useBaseController;
export type { IController };