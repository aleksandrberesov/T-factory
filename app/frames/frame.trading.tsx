import React, { useState, useMemo } from 'react';
import ChartView from "../tradingview/chart.view";
import { defaultSpeeds } from '../models/consts';
import SettingsFrame from './frame.settings';
import { TTradingFrameProps } from './types';
import useChart from '../tradingview/chart.controller';
import { SpeedTitleToNumber } from './utils';
import IChartController from '../tradingview/types';
import SelectedTab from '../components/button';
import GridBox from '../components/gridbox';
import './frame.trading.css';
import TradeStatisticGroup from '../composite-components/TradeStatisticGroup';
import TradeControlPanel from '../composite-components/TradeControlPanel';
import MarketControlPanel from '../composite-components/MarketControlPanel';

const height = 20;
const chartHeight = 12;
const statisticsHeight = 5;

const TradingFrame: React.FC<TTradingFrameProps> = (tradeprops) => {
    const HideShowSettings = () => {
        SetIsSettingsShow(!isSettingsShow);
    }; 
    const HideShowStatistics = () => {
        SetIsStatisticShow(!isStatisticShow);   
    };
    const ChangeSpeed = (speedID: number) => {
        tradeprops.market.setDuration(1000 / SpeedTitleToNumber(defaultSpeeds[speedID].element));
    };
    const [isSettingsShow, SetIsSettingsShow] = useState(false);
    const [isStatisticShow, SetIsStatisticShow] = useState(true);  
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
        <div id='trading-frame' className="h-full w-full">
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
                showBorders={false}
                elements={[
                    {
                        element: chart,
                        column: 1, row: 1, 
                        rowSpan: isStatisticShow ? chartHeight : chartHeight+statisticsHeight, 
                        columnSpan: 1
                    },
                    {
                        element: <SelectedTab
                                    title={(isStatisticShow ? 'Hide Statistics' : 'Show Statistics')}    
                                    textcolor='white'
                                    backgroundcolor='grey'
                                    onclick={HideShowStatistics}
                                 />,   
                    },
                    {
                        element: isStatisticShow ? (<TradeStatisticGroup
                                    trader={tradeprops.trader}
                                    getWord={tradeprops.getWord}
                                 />) : null,
                        row: isStatisticShow ? 2+chartHeight : -1, 
                        column: 1, 
                        rowSpan: statisticsHeight, 
                        columnSpan: 1
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