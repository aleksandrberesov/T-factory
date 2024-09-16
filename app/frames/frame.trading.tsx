import React, { useEffect, useState, useId } from 'react';
import SelectedTab from "../components/button";
import ChartView from "../tradingview/chart.view";
import InputTab from "../components/edit";
import LabelBox from '../components/label';
import { Trade, SetUpdateSeries, Step, Play, Pause, Stop } from "../models/trading";
import {useTimer} from "../libs/lib.simple-timer";

function TradingFrame(){
    
    const { seconds, isActive, toggle, reset } = useTimer( () => { Step(); } );

    return (
        <div
            className="h-screen w-screen bg-transparent flex-col gap-y-10"
        >
            <div
                className="h-3/5 m-2"
            > 
                <ChartView setUpdateSeries={Trade.SetSeries}/>
            </div>
            <div
                className=' grid grid-rows-2 grid-flow-col gap-2 m-2'    
            >
                <div
                    className='bg-gray-500 flex-col gap-y-2 row-span-3'
                >
                    <LabelBox title='Position' value={1}/>
                    <LabelBox title='Avarage cost' value={1}/>
                    <LabelBox title='Money' value={1}/>
                    <LabelBox title='Capital' value={1}/>
                </div>
                <div
                    className='bg-gray-500 flex-col gap-y-2 col-span-2'
                >
                    <LabelBox title='Current' value={1}/>
                    <LabelBox title='All' value={1}/>
                </div>
                <div
                    className='bg-gray-500 flex-col gap-y-2 row-span-2 col-span-2'
                >
                    <LabelBox title='Center' value={1}/>
                    <LabelBox title='Max/Min' value={1}/>
                </div>
            </div>
            <div
                className=' grid grid-cols-4 gap-2 m-2'
            >
                <SelectedTab title="Sell" backgroundcolor="green" /> 
                <InputTab title="1000"/>
                <SelectedTab title="Buy" backgroundcolor="red" />  
                <SelectedTab title="Close" backgroundcolor="blue" />
            </div>
            <div
                className=' grid grid-cols-6 gap-2'
            >
                {!isActive ? <SelectedTab icon_image="/icons/play.svg" onclick={toggle}/> : <SelectedTab icon_image="/icons/pause.svg" onclick={toggle}/>}
                <InputTab title="1x"/>
                {isActive ? <SelectedTab/> : <SelectedTab icon_image="/icons/next.svg" onclick={Step}/>}
                <SelectedTab icon_image="/icons/stop.svg" onclick={reset}/> 
                <SelectedTab icon_image="/icons/settings.svg" />
            </div>                
        </div>
    );
}

export default TradingFrame;