import { useRef, useState, useCallback } from "react";
import useRefValue from "../libs/data-hooks/value";
import { IValue } from "../libs/data-hooks/interfaces";
import { TMarketPoint, TDeal } from "./types";
import { IMarket, ITrade, IProfile, IAccount, IMarketDataManager, IStatistics } from "./interfaces";
import useAccount from "./account";
import useStatistics from "./statistics";
import { defaultDeal, defaultMarketPoint } from "./defaults";

const useTrade = (): ITrade & IMarketDataManager => {
    const [changed, setChanged] = useState(false);
    const account: IAccount = useAccount();
    const marketPoint: IValue<TMarketPoint> = useRefValue(defaultMarketPoint);
    const statistics: IStatistics = useStatistics();
    const deal: IValue<TDeal> = useRefValue(defaultDeal);

    const marketPlace = useRef<IMarket | undefined>(undefined);

    const init = (profile: IProfile, market: IMarket) => {
        marketPlace.current=market;
        account.depositFiat(profile.data.balance);
        setChanged(!changed);
    };
    const buy = () => {
        if (deal.get().status){ return; }
        if (account.money.fiat < 0){ return; }
        const volume = account.money.fiat;
        const currency = volume / marketPoint.get().value;
        account.withdrawFiat(volume);
        account.depositCurrency(currency);
        deal.set({...deal.get(), ...{volume: volume, amount: currency, openPrice: marketPoint.get().value, openTime: marketPoint.get().time, status: true}});
        setChanged(!changed);
    };
    const sell = () => {
        if (deal.get().status===undefined || !deal.get().status){ return; }
        if (account.money.currency < 0){ return; }
        const amount = account.money.currency;
        const fiat = amount * marketPoint.get().value;
        account.withdrawCurrency(amount);
        account.depositFiat(fiat);
        deal.set({...deal.get(), ...{closePrice: marketPoint.get().value, closeTime: marketPoint.get().time, profitLoss: fiat-deal.get().volume, status: false}});
        statistics.pushDeal(deal.get());
        deal.set(defaultDeal);
        setChanged(!changed);
    };
    const close = () => {
        marketPlace.current?.stop();
    };
    const getBalance = (): number => {
        return Math.round(account.getBalance(marketPoint.get().value));
    };
    const getAverageCost = (): number => {
        return Math.round(deal.get().openPrice);
    };
    const setPoints = useCallback((points: TMarketPoint[]) => {
    }, []);
    const appendPoint =useCallback((point: TMarketPoint) => {
        marketPoint.set(point);
    },[marketPoint]);

    return {
        init,
        buy,
        sell,
        close,
        balance: getBalance(),
        deal: deal.get(),
        averageCost: getAverageCost(),
        statistics,
        changed,
        setPoints,
        appendPoint, 
    }
};

export default useTrade;
