import React, { useState, useMemo, useEffect } from 'react';
import SelectedTab from "../components/button";
import ChartView from "../tradingview/chart.view";
import LabelBox from '../components/label';
import DropMenu from '../components/drop-menu';
import { Trade, Market, SetUpdateSeries,  Step, Play, Pause, Stop, Buy, Sell } from "../models/trading";
import { useTimer } from "../libs/lib.timer";
import { defaultAmounts, defaultSpeeds } from '../models/consts';
import SettingsFrame from './frame.settings';
import { TTradingFrameProps } from './types';

function SpeedTitleToNumber(str: string){
    return (Number(str.replace("x", '')));
};

function TradingFrame(tradeprops: TTradingFrameProps){
    const timerinitprops = {
        callback :  () => { Step(); }, 
        state : Trade.state=="started",
        duration : 1000/SpeedTitleToNumber(defaultSpeeds[0].element),
    };
    const { setDuration, isActive, toggle, reset } = useTimer( timerinitprops );
    const [ isSettingsShow, SetIsSettingsShow ] = useState(false);
    const content = useMemo(() => (
        <ChartView setUpdateSeries={SetUpdateSeries} initData={Market.data}/>
    ), []);
    const HideShowSettings = ()=>{
        SetIsSettingsShow(!isSettingsShow)
    }; 
    const Toggle = ()=>{
        toggle();
        if (!isActive) {
            Play();
        } else {
            Pause();
        }
    };
    const CloseSession = ()=>{
        reset();
        Stop();
    };
    const ChangeSpeed = (speedID: number)=>{
        setDuration(1000/SpeedTitleToNumber(defaultSpeeds[speedID].element));
    };

    return (
        <div
            className="h-screen w-screen bg-transparent flex-col gap-y-10"
        >
            <div
                className="h-3/5 m-2"
            > 
                {isSettingsShow && <SettingsFrame callBack={HideShowSettings}/>} 
                {!isSettingsShow && content}
            </div>
            <div
                className='h-1/10 grid grid-rows-2 grid-flow-col gap-2 m-2'    
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
                className='h-1/10 grid grid-cols-4 gap-2 m-2'
            >
                <SelectedTab title={tradeprops.getWord(4)}/*"Sell"*/ backgroundcolor="green" textcolor='white' onclick={Sell}/> 
                <DropMenu elements={defaultAmounts} selected={0} title='' backgroundcolor='white' textcolor='black'/>
                <SelectedTab title={tradeprops.getWord(3)}/*"Buy"*/ backgroundcolor="red" textcolor='white' onclick={Buy}/>  
                <SelectedTab title={tradeprops.getWord(5)}/*"Close"*/ backgroundcolor="blue" textcolor='white' onclick={CloseSession}/>
            </div>
            <div
                className='h-1/10 grid grid-cols-5 gap-2'
            >
                {!isActive ? <SelectedTab icon_image="/icons/play.svg" onclick={Toggle}/> : <SelectedTab icon_image="/icons/pause.svg" onclick={Toggle}/>}
                <DropMenu elements={defaultSpeeds} selected={0} title='' backgroundcolor='white' onselected={ChangeSpeed}/>
                {<SelectedTab icon_image="/icons/next.svg" onclick={Step}/>}
                <SelectedTab icon_image="/icons/stop.svg" onclick={CloseSession}/> 
                <SelectedTab icon_image="/icons/settings.svg" onclick={HideShowSettings}/>
            </div>             
        </div>
    );
}

export default TradingFrame;