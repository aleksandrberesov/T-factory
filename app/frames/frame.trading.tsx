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
import TableBox from '../components/table';
import IChartController from '../tradingview/types';
import GridBox from '../components/gridbox';
import './frame.trading.css';

function TradingFrame(tradeprops: TTradingFrameProps){
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
        <div id='trading-frame' className="h-full w-screen bg-transparent gap-y-2 grid grid-rows-12 grid-cols-1">
            {isSettingsShow && (
                <div className="modal">
                    <div className="modal-content">
                        {settings}
                    </div>
                </div>
            )}
            <div className="row-span-8 col-span-2">
                {chart}
            </div>
            <div className="row-span-3 col-span-2">
                <GridBox
                    columns={3}
                    rows={5}
                    showBorders={true} // Added to show borders
                    elements={[
                        {element: <div className='bg-slate-300 w-full h-full'></div>, row: 1, column: 1, rowSpan: 5, columnSpan: 1},
                        {element: <div className='bg-slate-300 w-full h-full'></div>, row: 1, column: 2, rowSpan: 2, columnSpan: 2},
                        {element: <div className='bg-slate-300 w-full h-full'></div>, row: 3, column: 2, rowSpan: 3, columnSpan: 2},
                    ]}
                />
            </div>
            <div id='trade-control-panel' className='grid grid-cols-4 gap-x-2 col-span-2'>
                <SelectedTab title={tradeprops.getWord(4)} backgroundcolor="green" textcolor='white' onclick={tradeprops.trader.sell}/> 
                <SelectedTab title={String(tradeprops.trader.balance)} backgroundcolor='white' textcolor='black'/>
                <SelectedTab title={tradeprops.getWord(3)} backgroundcolor="red" textcolor='white' onclick={tradeprops.trader.buy}/>  
                <SelectedTab title={tradeprops.getWord(5)} backgroundcolor="blue" textcolor='white' onclick={tradeprops.trader.close}/>
            </div>
            <div id='market-control-panel' className='grid grid-cols-5 gap-2 col-span-2'>
                {!tradeprops.market.isActive ? <SelectedTab icon_image="/icons/play.svg" onclick={tradeprops.market.start}/> : <SelectedTab icon_image="/icons/pause.svg" onclick={tradeprops.market.pause}/>}
                <DropMenu 
                    elements={defaultSpeeds} 
                    selected={0} 
                    title='' 
                    backgroundcolor='grey' 
                    onselected={ChangeSpeed}
                    style="rounded-md px-3 py-2 text-sm font-medium"
                />
                <SelectedTab icon_image="/icons/next.svg" onclick={tradeprops.market.step}/>
                <SelectedTab icon_image="/icons/stop.svg" onclick={tradeprops.market.stop}/> 
                <SelectedTab icon_image="/icons/settings.svg" onclick={HideShowSettings}/>
            </div>             
        </div>
    );
}

export default TradingFrame;