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
        <div className="h-full w-screen bg-transparent gap-y-2 grid grid-rows-12 grid-cols-1">
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
            <div className='gap-2 grid col-span-2 row-span-3 grid-rows-3 grid-flow-col'>
                <div className='bg-gray-500 flex-col gap-y-2 row-span-3'>
                    <TableBox elements={[
                        [
                            <LabelBox key="position" title={tradeprops.getWord(6)}/*'Position'*/ value={tradeprops.trader.deal.volume} symbol={currencySymbol}/>
                        ],
                        [
                            null,
                            <LabelBox key="amount" value={tradeprops.trader.deal.amount} symbol='lot'/>
                        ],
                        [
                            <LabelBox key="average-cost" title={tradeprops.getWord(7)}/*'Average cost'*/ value={tradeprops.trader.averageCost}/>
                        ],
                        [
                            <LabelBox key="capital" title={tradeprops.getWord(9)}/*'Capital'*/ value={tradeprops.trader.balance} symbol={currencySymbol}/>
                        ]
                    ]}/>
                </div>
                <div className='bg-gray-500 flex-col gap-y-2 col-span-2'>
                    <TableBox elements={[
                        [
                            <LabelBox key="current-title" title={tradeprops.getWord(11)}/*'Current'*//>,
                            <LabelBox key="current-value" value={NumberToSignedString(tradeprops.trader.statistics.currentResult.value)} symbol={currencySymbol} textcolor='green-200'/>,
                            <LabelBox key="current-percent" value={NumberToSignedString(tradeprops.trader.statistics.currentResult.percentage)} symbol='%' textcolor='blue-500'/>
                        ],
                        [
                            <LabelBox key="all-title" title={tradeprops.getWord(12)}/*'All'*//>,
                            <LabelBox key="all-value" value={NumberToSignedString(tradeprops.trader.statistics.totalResult.value)} symbol={currencySymbol} textcolor='red-500'/>,
                            <LabelBox key="all-percent" value={NumberToSignedString(tradeprops.trader.statistics.totalResult.percentage)} symbol='%' textcolor='blue-500'/>
                        ]
                    ]}/>
                </div>
                <div className='bg-gray-500 flex-col gap-y-2 row-span-2 col-span-2'>
                    <TableBox elements={[
                        [
                            <LabelBox key="transactions-title" title={tradeprops.getWord(15)}/*'Transactions'*//>,
                            <LabelBox key="transactions-count-1" value={tradeprops.trader.statistics.count}/>,

                            <LabelBox key="transactions-count-2" value={tradeprops.trader.statistics.profitDeals.value+'('+tradeprops.trader.statistics.profitDeals.percentage.toString()+'%'+')'}/>,

                            <LabelBox key="transactions-count-3" value={tradeprops.trader.statistics.lossDeals.value+'('+tradeprops.trader.statistics.lossDeals.percentage.toString()+'%'+')'}/>
                        ],
                        [
                            <LabelBox key="all-title" title={tradeprops.getWord(16)}/>, 
                            <LabelBox key="all-value-1" value={NumberToSignedString(tradeprops.trader.statistics.averageProfitLoss.percentage)} symbol='%'/>,
                            <LabelBox key="all-value-2" value={NumberToSignedString(tradeprops.trader.statistics.profit.average)} symbol='%'/>,
                            <LabelBox key="all-value-3" value={NumberToSignedString(tradeprops.trader.statistics.loss.average)} symbol='%'/>

                        ],
                        [
                            <LabelBox key="combined-title" title={tradeprops.getWord(17)+"/"+tradeprops.getWord(18)}/>,

                            null,
                            <LabelBox key="combined-value-1" value={tradeprops.trader.statistics.profit.min+"/"+tradeprops.trader.statistics.profit.max} symbol='%'/>,
                            <LabelBox key="combined-value-2" value={tradeprops.trader.statistics.loss.min+"/"+tradeprops.trader.statistics.loss.max} symbol='%'/>

                        ]
                    ]}/>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-x-2 col-span-2'>
                <SelectedTab title={tradeprops.getWord(4)}/*"Sell"*/ backgroundcolor="green" textcolor='white' onclick={tradeprops.trader.sell}/> 
                <SelectedTab title={String(tradeprops.trader.balance)} backgroundcolor='white' textcolor='black'/>
                <SelectedTab title={tradeprops.getWord(3)}/*"Buy"*/ backgroundcolor="red" textcolor='white' onclick={tradeprops.trader.buy}/>  
                <SelectedTab title={tradeprops.getWord(5)}/*"Close"*/ backgroundcolor="blue" textcolor='white' onclick={tradeprops.trader.close}/>
            </div>
            <div className='grid grid-cols-5 gap-2 col-span-2'>
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