import React, { useState, useMemo } from 'react';
import SelectedTab from "../components/button";
import ChartView from "../tradingview/chart.view";
import LabelBox from '../components/label';
import DropMenu from '../components/drop-menu';
import { defaultSpeeds } from '../models/consts';
import SettingsFrame from './frame.settings';
import { TTradingFrameProps } from './types';
import useChart from '../tradingview/chart.controller';
import { SpeedTitleToNumber } from './utils';

function TradingFrame(tradeprops: TTradingFrameProps){
    const HideShowSettings = ()=>{
        SetIsSettingsShow(!isSettingsShow);
    }; 
    const ChangeSpeed = (speedID: number)=>{
        tradeprops.market.setDuration(1000/SpeedTitleToNumber(defaultSpeeds[speedID].element));
    };

    const [ isSettingsShow, SetIsSettingsShow ] = useState(false);
    const chartManager = useChart(tradeprops.market.addManager);
    const chart = useMemo(() => (
        <ChartView 
            setChartApi={chartManager.assignChart} 
        />
    ), []);
    const settings = useMemo(()=>(
        <SettingsFrame 
            callBack={HideShowSettings}
            data={tradeprops.pattern}
            getWord={tradeprops.getWord}
        />
    ), [tradeprops.getWord, isSettingsShow]);


    
    return (
        <div
            className="h-full w-screen bg-transparent gap-y-2 grid grid-rows-12 grid-cols-2"
        >
            <div
                className="row-span-7 col-span-2"
            > 
                {isSettingsShow ? settings : chart}
            </div>
            <div
                className='gap-2 grid grid-rows-2 grid-flow-col col-span-2 row-span-3'    
            >
                <div
                    className='bg-gray-500 flex-col gap-y-2 row-span-3'
                >
                    <LabelBox title={tradeprops.getWord(6)}/*'Position'*/ value={1}/>
                    <LabelBox title={tradeprops.getWord(7)}/*'Avarage cost'*/ value={1}/>
                    <LabelBox title={tradeprops.getWord(8)}/*'Money'*/ value={1}/>
                    <LabelBox title={tradeprops.getWord(9)}/*'Capital'*/ value={1}/>
                </div>
                <div
                    className='bg-gray-500 flex-col gap-y-2 col-span-2'
                >
                    <LabelBox title={tradeprops.getWord(10)}/*'Result'*//>
                    <LabelBox title={tradeprops.getWord(11)}/*'Current'*/ value={1}/>
                    <LabelBox title={tradeprops.getWord(12)}/*'All'*/ value={1}/>
                </div>
                <div
                    className='bg-gray-500 flex-col gap-y-2 row-span-2 col-span-2'
                >
                    <LabelBox title={tradeprops.getWord(13)+tradeprops.getWord(14)}/*'Profite'*//>
                    <LabelBox title={tradeprops.getWord(15)}/*'Transactions'*/ value={1}/>
                    <LabelBox title={tradeprops.getWord(16)}/*'Center'*/ value={1}/>
                    <LabelBox title={tradeprops.getWord(17)+"/"+tradeprops.getWord(18)}/*'Max/Min'*/ value={1}/>
                </div>
            </div>
            <div
                className=' grid grid-cols-4 gap-x-2 col-span-2 '
            >
                <SelectedTab title={tradeprops.getWord(4)}/*"Sell"*/ backgroundcolor="green" textcolor='white' onclick={tradeprops.trader.sell}/> 
                <SelectedTab title={String(tradeprops.trader.balance)} backgroundcolor='white' textcolor='black'/>
                <SelectedTab title={tradeprops.getWord(3)}/*"Buy"*/ backgroundcolor="red" textcolor='white' onclick={tradeprops.trader.buy}/>  
                <SelectedTab title={tradeprops.getWord(5)}/*"Close"*/ backgroundcolor="blue" textcolor='white' onclick={tradeprops.trader.close}/>
            </div>
            <div
                className=' grid grid-cols-5 gap-2 col-span-2'
            >
                {!tradeprops.market.isActive ? <SelectedTab icon_image="/icons/play.svg" onclick={tradeprops.market.start}/> : <SelectedTab icon_image="/icons/pause.svg" onclick={tradeprops.market.pause}/>}
                <DropMenu 
                    elements={defaultSpeeds} 
                    selected={0} 
                    title='' 
                    backgroundcolor='white' 
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