import React, { useEffect, useState, useId } from 'react';
import SelectedTab from "../components/button";
import ChartView from "../tradingview/chart.view";
import InputTab from "../components/edit";
import LabelBox from '../components/label';
import { Trade } from "../models/trading";
  
function TradingFrame(){
    const [Trading, SetTrading] = useState(Trade);
    return (
        <div
            className="h-screen w-screen bg-transparent flex-col gap-y-10"
        >
            <div
                className="h-4/6 m-2"
            > 
                <ChartView trade={Trading}/>
            </div>
            <div
                className=' grid grid-rows-2 grid-flow-col gap-2 m-2'    
            >
                <div
                    className='bg-gray-500 flex-col gap-y-1 row-span-3'
                >
                    <LabelBox title='Position' value={1}/>
                    <LabelBox title='Avarage cost' value={1}/>
                    <LabelBox title='Money' value={1}/>
                    <LabelBox title='Capital' value={1}/>
                </div>
                <div
                    className='bg-gray-500 flex-col gap-y-1 col-span-2'
                >
                    <LabelBox title='Current' value={1}/>
                    <LabelBox title='All' value={1}/>
                </div>
                <div
                    className='bg-gray-500 flex-col gap-y-1 row-span-2 col-span-2'
                >
                    <LabelBox title='Center' value={1}/>
                    <LabelBox title='Max/Min' value={1}/>
                </div>
            </div>
            <div
                className=' grid grid-cols-4 gap-1 m-2'
            >
                <SelectedTab title="Sell" backgroundcolor="green" onclick={Trading.Sell}/> 
                <InputTab title="1000"/>
                <SelectedTab title="Buy" backgroundcolor="red" onclick={Trading.Buy}/>  
                <SelectedTab title="Close" backgroundcolor="blue" onclick={Trading.Close}/>
            </div>
            <div
                className=' grid grid-cols-6 gap-1'
            >
                <SelectedTab icon_image="/icons/play.svg" onclick={Trade.Play}/> 
                <SelectedTab icon_image="/icons/pause.svg" onclick={Trade.Pause}/> 
                <InputTab title="1x"/>
                <SelectedTab icon_image="/icons/next.svg" onclick={Trading.Next}/> 
                <SelectedTab icon_image="/icons/stop.svg" onclick={Trade.Stop}/> 
                <SelectedTab icon_image="/icons/settings.svg" />
            </div>                
        </div>
    );
}

export default TradingFrame;