import { useRef, useState, useCallback } from "react";
import useRefValue from "../libs/value";
import { IArray, IValue } from "../libs/interfaces";
import { IMarket, ITrade, IProfile, IAccount, TMarketPoint,  IMarketDataManager, TDeal } from "./types";
import useAccount from "./account";
import { defaultDeal, defaultMarketPoint } from "./defaults";
import { exit } from "process";
import useRefArray from "../libs/array";

const useTrade = ():ITrade  & IMarketDataManager =>{
    const [changed, setChanged] = useState(false);
    const account: IAccount = useAccount();
    const marketPoint: IValue<TMarketPoint> = useRefValue(defaultMarketPoint);
    const deal: IValue<TDeal> = useRefValue(defaultDeal);
    const deals: IArray<TDeal> = useRefArray();

    const marketPlace = useRef<IMarket | undefined>(undefined);

    const init = (profile: IProfile, market: IMarket)=>{
        marketPlace.current=market;
        account.depositFiat(profile.data.balance);
    };
    const buy = ()=>{
        const amount = account.money.fiat;
        if (amount<=0){ exit; }
        account.withdrawFiat(amount);
        account.depositCurrency(amount/marketPoint.get().value);
        deal.set({...deal.get(), ...{openValue: amount, openTime: marketPoint.get().time}});
        setChanged(!changed);
    };
    const sell = ()=>{
        const amount = account.money.currency;
        const fiat = amount*marketPoint.get().value;
        if (amount<=0){ exit; }
        account.withdrawCurrency(amount);
        account.depositFiat(fiat);
        deal.set({...deal.get(), ...{closeValue: fiat, closeTime: marketPoint.get().time}});
        deals.push(deal);
        setChanged(!changed);
    };
    const close = ()=>{
        marketPlace.current?.stop();
    };
    const getBalance = (): number=>{
        return account.getBalance(marketPoint.get().value);
    };

    const setPoints = useCallback((points: TMarketPoint[]) => {
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
        deal: deal.get(),
        count: deals.count,

        changed,

        setPoints,
        appendPoint, 
    }
};

export default useTrade;
