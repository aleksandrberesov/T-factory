import { useRef, useState } from "react";
import useRefValue from "../libs/value";
import { IValue } from "../libs/interfaces";
import { IMarket, ITrade, IProfile, IAccount, TMarketPoint } from "./types";
import useAccount from "./account";
import { defaultMarketPoint } from "./defaults";

const useTrade = ():ITrade =>{
    const account: IAccount = useAccount();
    const marketPoint: IValue<TMarketPoint> = useRefValue(defaultMarketPoint);
    const currentBalance: IValue<number> = useRefValue(0);
    const [changed, setChanged] = useState(false);
    const marketPlace = useRef<IMarket | undefined>(undefined);

    const init = (profile: IProfile, market: IMarket)=>{
        currentBalance.set(profile.data.balance);
        marketPlace.current=market;
        account.depositFiat(profile.data.balance);
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
    const getBalance = (): number=>{
        //const rate = marketPlace.current ? marketPlace.current.points[0].value : 0;
        //marketPoint.get();
        return account.getBalance(marketPoint.get().value);
    };

    const setBalance = ()=>{

    };

    return {
        init,
        buy,
        sell,
        close,
        balance: getBalance(),

        changed,
    }
};

export default useTrade;
