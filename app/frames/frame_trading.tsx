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
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 justify-center">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                        <div >
                            <div className="flex space-x-3 justify-center">
                                <SelectedTab title="Sell" backgroundcolor="green" onclick={DoSellclick}/> 
                                <InputTab title="1000"/>
                                <SelectedTab title="Buy" backgroundcolor="red" onclick={DoBuyclick}/>  
                                <SelectedTab title="Close" backgroundcolor="blue" onclick={DoBuyclick}/>    
                            </div>
                        </div>
                    </div>
                </div>
            </nav>  
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 justify-center">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                        <div >
                            <div className="flex space-x-3 justify-center">
                            <SelectedTab icon_image="/icons/play.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
                            <SelectedTab icon_image="/icons/pause.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
                            <InputTab title="1x"/>
                            <SelectedTab icon_image="/icons/next.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
                            <SelectedTab icon_image="/icons/stop.svg" backgroundcolor="gray" onclick={DoBuyclick}/> 
                            <SelectedTab icon_image="/icons/settings.svg" backgroundcolor="gray" onclick={DoBuyclick}/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>    
        </div>
    );
}

export default TradingFrame;