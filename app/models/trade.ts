import { useRef } from "react";
import useRefValue from "../libs/value";
import { IValue } from "../libs/interfaces";
import { IMarket, ITrade, IProfile } from "./types";

const useTrade = ():ITrade =>{
    const currentBalance: IValue<number> = useRefValue(0);
    const marketPlace = useRef<IMarket | undefined>(undefined);
    const init = (profile: IProfile, market: IMarket)=>{
        currentBalance.set(profile.data.balance);
        marketPlace.current=market;
    };
    const buy = ()=>{

    };
    const sell = ()=>{

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
