import { useRef, useState, useCallback } from "react";
import useRefValue from "../libs/value";
import { IArray, IValue } from "../libs/interfaces";
import { IMarket, ITrade, IProfile, IAccount, TMarketPoint, IMarketDataManager, TDeal } from "./types";
import useAccount from "./account";
import { defaultDeal, defaultMarketPoint } from "./defaults";
import useRefArray from "../libs/array";

const useTrade = (): ITrade & IMarketDataManager => {
    const [changed, setChanged] = useState(false);
    const account: IAccount = useAccount();
    const marketPoint: IValue<TMarketPoint> = useRefValue(defaultMarketPoint);
    const deal: IValue<TDeal> = useRefValue(defaultDeal);
    const deals: IArray<TDeal> = useRefArray();

    const marketPlace = useRef<IMarket | undefined>(undefined);

    const init = (profile: IProfile, market: IMarket) => {
        marketPlace.current=market;
        account.depositFiat(profile.data.balance);
    };
<<<<<<< HEAD
    const buy = () => {
        const volume = account.money.fiat;
        const currency = volume / marketPoint.get().value;
=======
    const buy = ()=>{
        const volume = account.money.fiat;
        const currency = volume/marketPoint.get().value;
>>>>>>> e7ea7ac6cb65c0f7752c89a0f5868c29e062a9d0
        if (volume<=0){ return; }
        account.withdrawFiat(volume);
        account.depositCurrency(currency);
        deal.set({...deal.get(), ...{volume: volume, amount: currency, openPrice: marketPoint.get().value, openTime: marketPoint.get().time}});
        setChanged(!changed);
    };
    const sell = () => {
        const amount = account.money.currency;
        const fiat = amount * marketPoint.get().value;
        if (amount <= 0){ return; }
        account.withdrawCurrency(amount);
        account.depositFiat(fiat);
        deal.set({...deal.get(), ...{closePrice: marketPoint.get().value, closeTime: marketPoint.get().time}});
        deals.push(deal);
        setChanged(!changed);
    };
    const close = () => {
        marketPlace.current?.stop();
    };
    const getBalance = (): number => {
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
