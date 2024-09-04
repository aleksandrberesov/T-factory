

import React, { useEffect, useState, useId } from 'react';
import SelectedTab from "../lib/button";
import ChartView from "../lib/chart";
import InputTab from "../lib/input";

const DoSellclick = () => {
    alert("button Sell clicked");
}
const DoBuyclick = () => {
    alert("button Buy clicked");
}
  
function TradingFrame(){
    
    return (
        <div
            className="h-dvh w-dvh bg-gray-500 flex-col"
        >
            <div
                className="h-1/2"
            > 
                <ChartView />
            </div>  
            <div className ="flex flex-row w-full justify-left">
                <SelectedTab title="Sell" backgroundcolor="green" onclick={DoSellclick}/> 
                <InputTab title="1000"/>
                <SelectedTab title="Buy" backgroundcolor="red" onclick={DoBuyclick}/>  
                <SelectedTab title="Close" backgroundcolor="blue" onclick={DoBuyclick}/> 
            </div>  
            <div className="flex flex-row w-full justify-left">
                <SelectedTab icon_image="/icons/play.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
                <SelectedTab icon_image="/icons/pause.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
                <InputTab title="1x"/>
                <SelectedTab icon_image="/icons/next.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
                <SelectedTab icon_image="/icons/stop.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
                <SelectedTab icon_image="/icons/settings.svg" backgroundcolor="gray" onclick={DoBuyclick}/>  
            </div>
        </div>
    );
}

export default TradingFrame;