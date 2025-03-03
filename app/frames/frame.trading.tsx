import React, { useState, useMemo } from 'react';
import SelectedTab from "../components/button";
import ChartView from "../tradingview/chart.view";
import LabelBox from '../components/label';
import DropMenu from '../components/drop-menu';
import { currencySymbol, defaultSpeeds } from '../models/consts';
import SettingsFrame from './frame.settings';
import { TTradingFrameProps } from './types';
import useChart from '../tradingview/chart.controller';
import { SpeedTitleToNumber, NumberToSignedString } from './utils';
import IChartController from '../tradingview/types';
import GridBox from '../components/gridbox';
import './frame.trading.css';
import TradeStatisticGroup from '../composite-components/TradeStatisticGroup';
import TradeControlPanel from '../composite-components/TradeControlPanel';
import MarketControlPanel from '../composite-components/MarketControlPanel';

const TradingFrame: React.FC<TTradingFrameProps> = (tradeprops) => {
    const HideShowSettings = () => {
        SetIsSettingsShow(!isSettingsShow);
    }; 
    const ChangeSpeed = (speedID: number) => {
        tradeprops.market.setDuration(1000 / SpeedTitleToNumber(defaultSpeeds[speedID].element));
    };

    const [isSettingsShow, SetIsSettingsShow] = useState(false);
    const chartManager: IChartController = useChart(tradeprops.market.addManager);
    const chart = useMemo(() => (
        <ChartView 
            setChartApi={chartManager.assignChart} 
        />
    ), []);
    const settings = useMemo(() => (
        <SettingsFrame 
            callBack={HideShowSettings}
            data={tradeprops.pattern}
            getWord={tradeprops.getWord}
        />
    ), [tradeprops.getWord, isSettingsShow]);

    return (
        <div id='trading-frame' className="h-full w-full bg-transparent">
            {isSettingsShow && (
                <div className="modal">
                    <div className="modal-content">
                        {settings}
                    </div>
                </div>
            )}
            <GridBox
                    columns={1}
                    rows={20}
                    elements={[
                {
                    element: <div className="w-full h-full">{chart}</div>,
                    column: 1, row: 1, rowSpan: 10, columnSpan: 1
                },
                {
                    element: 
                        <div className="w-full h-full">
                            <TradeStatisticGroup 
                                getWord={tradeprops.getWord}
                                trader={tradeprops.trader}
                                market={tradeprops.market}
                                pattern={tradeprops.pattern}
                            />
                        </div>,
                    row: 11, column: 1, rowSpan: 5, columnSpan: 1
                },
                {
                    element: 
                        <div className="w-full h-full">
                            <TradeControlPanel 
                                getWord={tradeprops.getWord}
                                trader={tradeprops.trader}
                                market={tradeprops.market}
                                pattern={tradeprops.pattern}
                            />
                        </div>,
                    row: 16, column: 1, rowSpan: 2, columnSpan: 1
                },
                {
                    element: 
                        <div className="w-full h-full">
                            <MarketControlPanel 
                                getWord={tradeprops.getWord}
                                market={tradeprops.market}
                                trader={tradeprops.trader}
                                pattern={tradeprops.pattern}
                                HideShowSettings={HideShowSettings}
                                ChangeSpeed={ChangeSpeed}
                            />
                        </div>,
                    row: 18, column: 1, rowSpan: 2, columnSpan: 1
                }, 
            ]}          
        />
        </div>
    );
}

export default TradingFrame;