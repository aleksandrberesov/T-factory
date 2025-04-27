import React, { useState, useMemo } from 'react';
import './styles/trading.css';
import { TTradingFrameProps } from './types';
import ChartView from "../tradingview/chartView";
import PointsSettingPanel from '../widgets/PointsSettingPanel';
import useChart from '../tradingview/chartController';
import IChartController from '../tradingview/types';
import SelectedTab from '../components/button';
import ModalWindow from '../components/modal-window';
import GridBox from '../components/gridbox';
import TradeStatisticPanel from '../widgets/TradeStatisticPanel';
import TradeControlPanel from '../widgets/TradeControlPanel';
import MarketControlPanel from '../widgets/MarketControlPanel';
import SpeedChangePanel from '../widgets/SpeedChangePanel';

const height = 25;
const chartHeight = 8;
const statisticsHeight = 4;

const TradingFrame: React.FC<TTradingFrameProps> = (props) => {
    const HideShowSettings = () => {
		SetIsSettingsShow(!isSettingsShow);
	};
    const HideShowStatistics = () => {
        SetIsStatisticShow(!isStatisticShow);   
    };
    const HideShowSpeedChange = () => {
        SetIsSpeedChangeShow(!isSpeedChangeShow);
    };
    const ChangeSpeed = (speedID: number) => {
        props.market.setSpeed(speedID);
        SetIsSpeedChangeShow(false);
    };
    const [isSettingsShow, SetIsSettingsShow] = useState(false);
    const [isStatisticShow, SetIsStatisticShow] = useState(true);  
    const [isSpeedChangeShow, SetIsSpeedChangeShow] = useState(false);
    const chartManager: IChartController = useChart(props.market.addManager);
    const chart = useMemo(() => (
        <ChartView
            controller={chartManager} 
        />
    ), []);
    const statPanel = useMemo(() => (
        <TradeStatisticPanel
            trader={props.trader}
            dictionary={props.dictionary}
        />
    ), [props.dictionary.language]);
    const marketPanel = useMemo(() => {
        return (
            <MarketControlPanel 
                market={props.market}
                HideShowSettings={HideShowSettings}
                HideShowSpeed={HideShowSpeedChange}
            />
        );
    }, []);
    const tradePanel = useMemo(() => (
        <TradeControlPanel
            trader={props.trader}
            dictionary={props.dictionary} 
        />
    ), [props.dictionary.language]);
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
                                onClick={HideShowStatistics}
                            />
                        </div>
                     ,   
                },
                {
                    element: isStatisticShow ? (statPanel) : null,
                    row: isStatisticShow ? 2+chartHeight : -1, 
                    column: 1, 
                    rowSpan: isStatisticShow ? statisticsHeight : -1, 
                    columnSpan: 1
                },
                {
                    element: tradePanel,
                },
                {
                    element: marketPanel,
                }, 
            ]}          
        />
    ),[isStatisticShow, isSettingsShow, props.dictionary.language]);

    return (
        <div id='trading-frame' className="h-full w-full">
            {isSettingsShow && (<ModalWindow content={<PointsSettingPanel 
                                    callBack={HideShowSettings}
                                    data={props.pattern}
                                    dicrionary={props.dictionary}
                                />}
                                />)
            }
            {isSpeedChangeShow && (<ModalWindow content={<SpeedChangePanel ChangeSpeed={ChangeSpeed}/>}/>)}
            {grid}
        </div>
    );
}

export default TradingFrame;