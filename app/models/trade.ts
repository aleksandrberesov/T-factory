import { useRef, useState } from "react";
import useRefValue from "../libs/value";
import { IValue } from "../libs/interfaces";
import { IMarket, ITrade, IProfile } from "./types";

const useTrade = ():ITrade =>{
    const currentBalance: IValue<number> = useRefValue(0);
    const [changed, setChanged] = useState(false);
    const marketPlace = useRef<IMarket | undefined>(undefined);
    const init = (profile: IProfile, market: IMarket)=>{
        currentBalance.set(profile.data.balance);
        marketPlace.current=market;
    };
    const buy = ()=>{
        currentBalance.set(-30);
        setChanged(!changed);
    };
    const sell = ()=>{
        currentBalance.set(54387450);
        setChanged(!changed);
    };
    const close = ()=>{
        marketPlace.current?.stop();
    };

    return {
        init,
        buy,
        sell,
        close,
        balance: currentBalance.get(),
    }
};

export default useTrade;
