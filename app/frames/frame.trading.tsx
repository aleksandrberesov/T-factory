import React, { useEffect, useState, useId } from 'react';
import SelectedTab from "../components/button";
import ChartView from "../tradingview/chartview";
import InputTab from "../components/edit";
import LabelBox from '../components/label';
import {} from "../models/trading"

const DoSellclick = () => {
    alert("button Sell clicked");
}
const DoBuyclick = () => {
    alert("button Buy clicked");
}
  
function TradingFrame(){
    
    return (
        <div
            className="h-screen w-screen bg-transparent flex-col gap-y-10"
        >
            <div
                className="h-3/6 m-2"
            > 
                <ChartView />
            </div>
            <div
                className='grid grid-rows-3 grid-flow-col gap-2 m-2'    
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
                className='grid grid-cols-4 gap-1 m-2'
            >
                <SelectedTab title="Sell" backgroundcolor="green" onclick={DoSellclick}/> 
                <InputTab title="1000"/>
                <SelectedTab title="Buy" backgroundcolor="red" onclick={DoBuyclick}/>  
                <SelectedTab title="Close" backgroundcolor="blue"/>
            </div>
            <div
                className='grid grid-cols-6 gap-1'
            >
                <SelectedTab icon_image="/icons/play.svg" /> 
                <SelectedTab icon_image="/icons/pause.svg"/> 
                <InputTab title="1x"/>
                <SelectedTab icon_image="/icons/next.svg" /> 
                <SelectedTab icon_image="/icons/stop.svg" /> 
                <SelectedTab icon_image="/icons/settings.svg" />
            </div>                
        </div>
    );
}

export default TradingFrame;