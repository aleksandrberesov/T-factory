import React, { useState, useMemo } from 'react';
import SelectedTab from "../components/button";
import ChartView from "../tradingview/chart.view";
import LabelBox from '../components/label';
import DropMenu from '../components/drop-menu';
import { currencySymbol, defaultSpeeds } from '../models/consts';
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
            className="h-full w-screen bg-transparent gap-y-2 grid grid-rows-12 grid-cols-1"
        >
            <div
                className="row-span-7 col-span-2"
            > 
                {isSettingsShow ? settings : chart}
            </div>
            <div
                className='gap-2 grid col-span-2 row-span-3 grid-rows-3 grid-flow-col'    
            >
                <div
                    className='bg-gray-500 flex-col gap-y-2 row-span-3'
                >
                    <LabelBox title={tradeprops.getWord(6)}/*'Position'*/ value={tradeprops.trader.deal.volume} symbol={currencySymbol}/>
                    <LabelBox value={tradeprops.trader.deal.amount} symbol='lot'/>
                    <LabelBox title={tradeprops.getWord(7)}/*'Avarage cost'*/ value={tradeprops.trader.deal.openPrice}/>
                    <LabelBox title={tradeprops.getWord(9)}/*'Capital'*/ value={tradeprops.trader.balance} symbol={currencySymbol}/>
                </div>
                <div
                    className='bg-gray-500 flex-col gap-y-2 col-span-2'
                >
                    <div className='flex justify-between'>
                        <LabelBox title={tradeprops.getWord(11)}/*'Current'*//>
                        <LabelBox title='' value={tradeprops.trader.deal.profitLoss} symbol={currencySymbol} textcolor='green-200'/>
                        <LabelBox value={tradeprops.trader.deal.profitLoss} symbol='%' textcolor='blue-500'/>    
                    </div>
                    <div className='flex justify-between'>
                        <LabelBox title={tradeprops.getWord(12)}/*'All'*//>
                        <LabelBox title='' value={tradeprops.trader.deal.profitLoss} symbol={currencySymbol} textcolor='red-500'/>
                        <LabelBox value={tradeprops.trader.deal.profitLoss} symbol='%' textcolor='blue-500'/>
                    </div>            
                </div>
                <div
                    className='bg-gray-500 flex-col gap-y-2 row-span-2 col-span-2'
                >
                    <table className='min-w-full h-full bg-white'>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th><LabelBox title={tradeprops.getWord(13)}/></th>
                                <th><LabelBox title={tradeprops.getWord(14)}/></th>
                            </tr>
                        </thead>
                        <tr>
                            <td><LabelBox title={tradeprops.getWord(15)}/*'Transactions'*//></td>
                            <td><LabelBox value={tradeprops.trader.statistics.count}/></td>
                            <td><LabelBox value={tradeprops.trader.statistics.count}/></td>
                            <td><LabelBox value={tradeprops.trader.statistics.count}/></td>
                        </tr>
                        <tr>
                            <td><LabelBox title={tradeprops.getWord(16)}/></td>
                            <td><LabelBox value={1}/></td>
                            <td><LabelBox value={1}/></td>
                            <td><LabelBox value={1}/></td>
                        </tr>
                        <tr>
                            <td><LabelBox title={tradeprops.getWord(17)+"/"+tradeprops.getWord(18)}/></td>
                            <td></td>
                            <td><LabelBox value={1}/></td>
                            <td><LabelBox value={1}/></td>
                        </tr>
                    </table>
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