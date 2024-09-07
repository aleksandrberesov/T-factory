import React, { useEffect, useState, useId } from 'react';
import SelectedTab from "../components/button";
import ChartView from "../tradingview/chartview";
import InputTab from "../components/edit";
import LabelItem from '../components/label_item';

const DoSellclick = () => {
    alert("button Sell clicked");
}
const DoBuyclick = () => {
    alert("button Buy clicked");
}
  
function TradingFrame(){
    
    return (
        <div
            className="h-dvh w-dvh bg-black flex-col gap-y-10"
        >
            <div
                className="h-1/2 m-2"
            > 
                <ChartView />
            </div>
            <div
                className='grid grid-rows-3 grid-flow-col gap-4'    
            >
                <div
                    className='bg-gray-500 flex-col gap-y-1 row-span-3'
                >
                    <LabelItem title='Position' value={1}/>
                    <LabelItem title='Avarage cost' value={1}/>
                    <LabelItem title='Money' value={1}/>
                    <LabelItem title='Capital' value={1}/>
                </div>
                <div
                    className='bg-gray-500 flex-col gap-y-1 col-span-2'
                >
                    <LabelItem title='Current' value={1}/>
                    <LabelItem title='All' value={1}/>
                </div>
                <div
                    className='bg-gray-500 flex-col gap-y-1 row-span-2 col-span-2'
                >
                    <LabelItem title='Center' value={1}/>
                    <LabelItem title='Max/Min' value={1}/>
                </div>
            </div>
            <div
                className='grid grid-cols-4 gap-1 m-2'
            >
                <SelectedTab title="Sell" backgroundcolor="green" onclick={DoSellclick}/> 
                <InputTab title="1000"/>
                <SelectedTab title="Buy" backgroundcolor="red" onclick={DoBuyclick}/>  
                <SelectedTab title="Close" backgroundcolor="blue" onclick={DoBuyclick}/>
            </div>
            <div
                className='grid grid-cols-6 gap-1'
            >
                <SelectedTab icon_image="/icons/play.svg" onclick={DoBuyclick}/> 
                <SelectedTab icon_image="/icons/pause.svg" onclick={DoBuyclick}/> 
                <InputTab title="1x"/>
                <SelectedTab icon_image="/icons/next.svg" onclick={DoBuyclick}/> 
                <SelectedTab icon_image="/icons/stop.svg" onclick={DoBuyclick}/> 
                <SelectedTab icon_image="/icons/settings.svg" onclick={DoBuyclick}/>
            </div>                
        </div>
    );
}

export default TradingFrame;