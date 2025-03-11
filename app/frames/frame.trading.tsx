import React, { useState, useMemo } from 'react';
import ChartView from "../tradingview/chart.view";
import { defaultSpeeds } from '../models/consts';
import SettingsFrame from './frame.settings';
import { TTradingFrameProps } from './types';
import useChart from '../tradingview/chart.controller';
import { SpeedTitleToNumber } from './utils';
import IChartController from '../tradingview/types';
import GridBox from '../components/gridbox';
import './frame.trading.css';
import TradeStatisticGroup from '../composite-components/TradeStatisticGroup';
import TradeControlPanel from '../composite-components/TradeControlPanel';
import MarketControlPanel from '../composite-components/MarketControlPanel';

const height = 20;
const chartHeight = 12;
const statisticsHeight = 6;

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
        <div id='trading-frame' className="h-full w-full bg-gray-800">
            {isSettingsShow && (
                <div className="modal">
                    <div className="modal-content">
                        {settings}
                    </div>
                </div>
            )}
            <GridBox
                columns={1}
                rows={height}
                showBorders={true}
                elements={[
                    {
                        element: chart,
                        column: 1, row: 1, rowSpan: chartHeight, columnSpan: 1
                    },
                    {
                        element: <TradeStatisticGroup
                                    trader={tradeprops.trader}
                                    getWord={tradeprops.getWord}
                                 />,
                        row: 1+chartHeight, column: 1, rowSpan: statisticsHeight, columnSpan: 1
                    },
                    {
                        element: <TradeControlPanel
                                    trader={tradeprops.trader}
                                    getWord={tradeprops.getWord}
                                 />,
                    },
                    {
                        element: <MarketControlPanel
                                    market={tradeprops.market}
                                    HideShowSettings={HideShowSettings}
                                    ChangeSpeed={ChangeSpeed}
                                 />,
                    }, 
                ]}          
            />
        </div>
    );
}

export default TradingFrame;