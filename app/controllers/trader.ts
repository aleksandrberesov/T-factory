import { useRef, useId } from "react";
import useRefValue, { IValue } from "../libs/data-hooks/value";
import { TMarketPoint, TDeal } from "../models/types";
import { IMarket, ITrade, IProfile, IAccount, IStatistics } from "./interfaces";
import useAccount from "./account";
import { defaultDeal, defaultMarketPoint } from "../models/defaults";
import { TTradeState } from "../models/types";
import useViewsManager from "./viewsManager"; 
import { IViewController } from "./viewController";
import { TProfile } from "../models/types";

const useTrader = (): ITrade => {
    const viewsManager = useViewsManager<TTradeState>({});
    const uniqueId = useId(); 
    const account: IAccount = useAccount();
    const marketPoint: IValue<TMarketPoint> = useRefValue(defaultMarketPoint);
    const deal: IValue<TDeal> = useRefValue(defaultDeal);
    const trader = useRef<TProfile | undefined>(undefined);
    const marketPlace = useRef<IMarket | undefined>(undefined);
    const statisticsStorage = useRef<IStatistics | undefined>(undefined);

    const init = (profile: IProfile, market: IMarket, statistics: IStatistics) => {
        marketPlace.current=market;
        statisticsStorage.current=statistics;
        trader.current = profile.data;
        market.addManager({id: uniqueId, push, set});
        account.init({fiat: profile.data.balance, currency: 0});
        viewsManager.updateAll(getCurrentState());
    };
    const buy = () => {
        if (deal.get().status){ return; }
        if (account.showMoney().fiat < 0){ return; }
        const volume = account.showMoney().fiat;
        const currency = volume / marketPoint.get().value;
        account.withdrawFiat(volume);
        account.depositCurrency(currency);
        deal.set({  
                    ...deal.get(), 
                    ...{
                            volume: volume, 
                            amount: currency, 
                            openPrice: marketPoint.get().value, 
                            openTime: marketPoint.get().time, 
                            status: true,
                        }
        });
        viewsManager.updateAll(getCurrentState());
    };
    const sell = () => {
        if (deal.get().status===undefined || !deal.get().status){ return; }
        if (account.showMoney().currency < 0){ return; }
        const amount = account.showMoney().currency;
        const fiat = amount * marketPoint.get().value;
        account.withdrawCurrency(amount);
        account.depositFiat(fiat);
        deal.set({  
                    ...deal.get(), 
                    ...{
                            closePrice: marketPoint.get().value, 
                            closeTime: marketPoint.get().time, 
                            profitLoss: fiat-deal.get().volume, 
                            status: false,
                        }
        });
        statisticsStorage.current?.push(deal.get());
        deal.set(defaultDeal);
        viewsManager.updateAll(getCurrentState());
    };
    const close = () => {
        statisticsStorage.current?.save(trader.current?.id || 0, Date.now());
        statisticsStorage.current?.clear();
        marketPlace.current?.stop();
    };
    const getCurrentState = (): TTradeState => {
        return {
            balance: Math.round(account.getBalance(marketPoint.get().value)),
            volume: deal.get().volume,
            amount: Math.round(deal.get().amount*10)/10,
            averageCost: Math.round(deal.get().openPrice),
        };
    };
    const set = (points: TMarketPoint[]) => {
        if (points.length === 0) { return; }
        const point = points[points.length - 1];
        marketPoint.set(point);
        viewsManager.updateAll(getCurrentState());
    };
    const push = (point: TMarketPoint) => {
        marketPoint.set(point);
        if (deal.get().status === undefined || !deal.get().status) { return; }
        viewsManager.updateAll(getCurrentState());
    };
    const addView = (view: IViewController<TTradeState>) => {
        viewsManager.add(view);
        view.update(getCurrentState());
    };

    return {
        init,
        buy,
        sell,
        close,
        addView,
    };
};

export default useTrader;
