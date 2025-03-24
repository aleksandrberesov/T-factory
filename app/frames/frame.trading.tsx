import React, { useState, useMemo, useCallback } from 'react';
import ChartView from "../tradingview/chart.view";
import SettingsFrame from './frame.settings';
import { TTradingFrameProps } from './types';
import useChart from '../tradingview/chart.controller';
import IChartController from '../tradingview/types';
import SelectedTab from '../components/button';
import ModalWindow from '../components/modal-window';
import GridBox from '../components/gridbox';
import './frame.trading.css';
import TradeStatisticGroup from '../widgets/TradeStatisticGroup';
import TradeControlPanel from '../widgets/TradeControlPanel';
import MarketControlPanel from '../widgets/MarketControlPanel';
import SpeedChangePanel from '../widgets/SpeedChangePanel';

const height = 25;
const chartHeight = 8;
const statisticsHeight = 4;

const TradingFrame: React.FC<TTradingFrameProps> = (tradeprops) => {
    const HideShowSettings = () => {
        console.log(isSettingsShow);
		SetIsSettingsShow(!isSettingsShow);
	};
    const HideShowStatistics = () => {
        SetIsStatisticShow(!isStatisticShow);   
    };
    const HideShowSpeedChange = () => {
        SetIsSpeedChangeShow(!isSpeedChangeShow);
    };
    const ChangeSpeed = (speedID: number) => {
        tradeprops.market.setSpeed(speedID);
        SetIsSpeedChangeShow(false);
    };
    const [isSettingsShow, SetIsSettingsShow] = useState(false);
    const [isStatisticShow, SetIsStatisticShow] = useState(true);  
    const [isSpeedChangeShow, SetIsSpeedChangeShow] = useState(false);
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
    ), [tradeprops.getWord]);
    const grid = useMemo(() => (
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
                    element:   
                        <div className='bg-slate-300 w-full'>
                            <SelectedTab
                                //icon_image={(isStatisticShow ? "/icons/down_left_arrow.svg" : "/icons/up_right_arrow.svg")}
                                title={(isStatisticShow ? 'Hide Statistics' : 'Show Statistics')}    
                                textcolor='white'
                                backgroundcolor='grey'
                                onclick={HideShowStatistics}
                            />
                        </div>
                     ,   
                },
                {
                    element: isStatisticShow ? 
                             (<TradeStatisticGroup
                                trader={tradeprops.trader}
                                getWord={tradeprops.getWord}
                             />) : null,
                    row: isStatisticShow ? 2+chartHeight : -1, 
                    column: 1, 
                    rowSpan: isStatisticShow ? statisticsHeight : -1, 
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
                                HideShowSpeed={HideShowSpeedChange}
                             />,
                }, 
            ]}          
        />
    ),[isStatisticShow, isSettingsShow, tradeprops.market.changed, tradeprops.getWord]);

    return (
        <div id='trading-frame' className="h-full w-full">
            {isSettingsShow && (<ModalWindow content={<SettingsFrame 
            callBack={HideShowSettings}
            data={tradeprops.pattern}
            getWord={tradeprops.getWord}
        />}/>)}
            {isSpeedChangeShow && (<ModalWindow content={<SpeedChangePanel ChangeSpeed={ChangeSpeed}/>}/>)}
            {grid}
        </div>
    );
}

export default TradingFrame;