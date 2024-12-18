import { useRef, useState, useCallback } from "react";
import useRefValue from "../libs/value";
import { IValue } from "../libs/interfaces";
import { IMarket, ITrade, IProfile, IAccount, TMarketPoint,  IMarketDataManager, TDeal } from "./types";
import useAccount from "./account";
import { defaultMarketPoint } from "./defaults";
import { exit } from "process";

const useTrade = ():ITrade  & IMarketDataManager =>{
    const account: IAccount = useAccount();
    const marketPoint: IValue<TMarketPoint> = useRefValue(defaultMarketPoint);
    const position: IValue<TDeal> = useRefValue({});
    const [changed, setChanged] = useState(false);
    const marketPlace = useRef<IMarket | undefined>(undefined);

    const init = (profile: IProfile, market: IMarket)=>{
        //currentBalance.set(profile.data.balance);
        marketPlace.current=market;
        account.depositFiat(profile.data.balance);
    };
    const buy = ()=>{
        const amount = account.money.fiat;
        if (amount<=0){ exit; }
        account.withdrawFiat(amount);
        account.depositCurrency(amount/marketPoint.get().value);
        setChanged(!changed);
    };
    const sell = ()=>{
        const amount = account.money.currency;
        if (amount<=0){ exit; }
        account.withdrawCurrency(amount);
        account.depositFiat(amount*marketPoint.get().value);
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

    const setPoints = useCallback((points: TMarketPoint[]) => {
        //marketPoint.set(points[points.length-1]);
    }, []);
    const appendPoint =useCallback((point: TMarketPoint) => {
        marketPoint.set(point);
    },[]);

    return {
        init,
        buy,
        sell,
        close,
        balance: getBalance(),

        changed,

        setPoints,
        appendPoint, 
    }
};

export default useTrade;
