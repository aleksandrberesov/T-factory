import { useRef, useCallback, useId } from "react";
import useRefValue, { IValue } from "../libs/data-hooks/value";
import { TMarketPoint, TDeal } from "../models/types";
import { IMarket, ITrade, IProfile, IAccount, IStatistics } from "./interfaces";
import useAccount from "./account";
import useStatistics from "./statistics";
import { defaultDeal, defaultMarketPoint } from "../models/defaults";
import { TTradeState } from "../models/types";
import useViewsManager from "./viewsManager"; 

const useTrade = (): ITrade => {
    const viewsManager = useViewsManager<TTradeState>();
    const uniqueId = useId(); 
    const account: IAccount = useAccount();
    const marketPoint: IValue<TMarketPoint> = useRefValue(defaultMarketPoint);
    const deal: IValue<TDeal> = useRefValue(defaultDeal);
    const marketPlace = useRef<IMarket | undefined>(undefined);
    const statistics: IStatistics = useStatistics();

    const init = (profile: IProfile, market: IMarket) => {
        marketPlace.current=market;
        market.addManager({id: uniqueId, push, set});
        account.init({fiat: profile.data.balance, currency: 0});
        viewsManager.updateAll(getCurrentState());
    };
    const buy = () => {
        if (deal.get().status){ return; }
        if (account.money.fiat < 0){ return; }
        const volume = account.money.fiat;
        const currency = volume / marketPoint.get().value;
        account.withdrawFiat(volume);
        account.depositCurrency(currency);
        deal.set({...deal.get(), ...{volume: volume, amount: currency, openPrice: marketPoint.get().value, openTime: marketPoint.get().time, status: true}});
        viewsManager.updateAll(getCurrentState());
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
        viewsManager.updateAll(getCurrentState());
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
    const getCurrentState = (): TTradeState => {
        return {
            balance: getBalance(),
            deal: deal.get(),
            averageCost: getAverageCost(),
        };
    };
    const set = useCallback((points: TMarketPoint[]) => {
        if (points.length === 0) { return; }
        const point = points[points.length - 1];
        marketPoint.set(point);
        viewsManager.updateAll(getCurrentState());
    }, []);
    const push =useCallback((point: TMarketPoint) => {
        marketPoint.set(point);
        if (deal.get().status===undefined || !deal.get().status){ return; }
        viewsManager.updateAll(getCurrentState());
    },[]);

    return {
        init,
        buy,
        sell,
        close,

        statistics,
        state: getCurrentState(),

        addView: viewsManager.add,
    };
};

export default useTrade;
