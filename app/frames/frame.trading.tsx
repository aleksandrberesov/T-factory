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
import IChartController from '../tradingview/types';
import GridBox from '../components/gridbox';
import './frame.trading.css';

const TradingFrame: React.FC<TTradingFrameProps> = (tradeprops) => {
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
        <div id='trading-frame' className="h-full w-screen bg-transparent">
            {isSettingsShow && (
                <div className="modal">
                    <div className="modal-content">
                        {settings}
                    </div>
                </div>
            )}
            <GridBox
                    columns={1}
                    rows={16}
                    elements={[
                {
                    element: <div className="w-full h-full">{chart}</div>,
                    column: 1, row: 1, rowSpan: 10, columnSpan: 1
                },
                {
                    element: <GridBox
                        columns={3}
                        rows={5}
                        elements={[
                            {element: <div className='bg-slate-300 w-full h-full'>
                                    <GridBox
                                        columns={2}
                                        rows={4}    
                                        elements={[
                                            {
                                                element: <LabelBox key="position" title={tradeprops.getWord(6)}/*'Position'*/ value={tradeprops.trader.deal.volume} symbol={currencySymbol}/>,
                                                row: 1, column: 1, rowSpan: 1, columnSpan: 2
                                            },
                                            {
                                                element: <LabelBox key="amount" value={tradeprops.trader.deal.amount} symbol='lot'/>,
                                                row: 2, column: 2, rowSpan: 1, columnSpan: 1    
                                            },
                                            {
                                                element: <LabelBox key="average-cost" title={tradeprops.getWord(7)}/*'Average cost'*/ value={tradeprops.trader.averageCost}/>,
                                                row: 3, column: 1, rowSpan: 1, columnSpan: 2},
                                            {
                                                element: <LabelBox key="capital" title={tradeprops.getWord(9)}/*'Capital'*/ value={tradeprops.trader.balance} symbol={currencySymbol}/>,
                                                row: 4, column: 1, rowSpan: 1, columnSpan: 2
                                            },  
                                        ]}
                                    />
                                </div>, 
                                row: 1, column: 1, rowSpan: 5, columnSpan: 1
                            },
                            {element: <div className='bg-slate-300 w-full h-full'>
                                    <GridBox
                                        columns={3}
                                        rows={2}    
                                        elements={[
                                            {element: <LabelBox key="current-title" title={tradeprops.getWord(11)}/*'Current'*//>},
                                            {element: <LabelBox key="current-value" value={NumberToSignedString(tradeprops.trader.statistics.currentResult.value)} symbol={currencySymbol} textcolor='green-200'/>},
                                            {element: <LabelBox key="current-percent" value={NumberToSignedString(tradeprops.trader.statistics.currentResult.percentage)} symbol='%' textcolor='blue-500'/>},
                                            {element: <LabelBox key="all-title" title={tradeprops.getWord(12)}/*'All'*//>},
                                            {element: <LabelBox key="all-value" value={NumberToSignedString(tradeprops.trader.statistics.totalResult.value)} symbol={currencySymbol} textcolor='red-500'/>},
                                            {element: <LabelBox key="all-percent" value={NumberToSignedString(tradeprops.trader.statistics.totalResult.percentage)} symbol='%' textcolor='blue-500'/>}
                                        ]}
                                    />
                                </div>, 
                                row: 1, column: 2, rowSpan: 2, columnSpan: 2
                            },
                            {element: <div className='bg-slate-300 w-full h-full'>
                                    <GridBox
                                        columns={4}
                                        rows={3}    
                                        elements={[
                                            {
                                                element: <LabelBox key="transactions-title" title={tradeprops.getWord(15)}/*'Transactions'*//>,
                                                row: 1, column: 1, rowSpan: 1, columnSpan: 1
                                            },
                                            {
                                                element: <LabelBox key="transactions-count-1" value={tradeprops.trader.statistics.count}/>,
                                                row: 1, column: 2, rowSpan: 1, columnSpan: 1
                                            },
                                            {
                                                element: <LabelBox key="transactions-count-2" value={tradeprops.trader.statistics.profitDeals.value+'('+tradeprops.trader.statistics.profitDeals.percentage.toString()+'%'+')'}/>,
                                                row: 1, column: 3, rowSpan: 1, columnSpan: 1},
                                            {
                                                element: <LabelBox key="transactions-count-3" value={tradeprops.trader.statistics.lossDeals.value+'('+tradeprops.trader.statistics.lossDeals.percentage.toString()+'%'+')'}/>,
                                                row: 1, column: 4, rowSpan: 1, columnSpan: 1},
                                            {
                                                element: <LabelBox key="all-title" title={tradeprops.getWord(16)}/>,
                                                row: 2, column: 1, rowSpan: 1, columnSpan: 1
                                            }, 
                                            {
                                                element: <LabelBox key="all-value-1" value={NumberToSignedString(tradeprops.trader.statistics.averageProfitLoss.percentage)} symbol='%'/>,
                                                row: 2, column: 2, rowSpan: 1, columnSpan: 1    
                                            },
                                            {
                                                element: <LabelBox key="all-value-2" value={NumberToSignedString(tradeprops.trader.statistics.profit.average)} symbol='%'/>,
                                                row: 2, column: 3, rowSpan: 1, columnSpan: 1
                                            },
                                            {
                                                element: <LabelBox key="all-value-3" value={NumberToSignedString(tradeprops.trader.statistics.loss.average)} symbol='%'/>,      
                                                row: 2, column: 4, rowSpan: 1, columnSpan: 1
                                            },
                                            {
                                                element: <LabelBox key="combined-title" title={tradeprops.getWord(17)+"/"+tradeprops.getWord(18)}/>,
                                                row: 3, column: 1, rowSpan: 2, columnSpan: 1
                                            },
                                            {
                                                element: <LabelBox key="combined-value-1" value={tradeprops.trader.statistics.profit.min+"/"+tradeprops.trader.statistics.profit.max} symbol='%'/>,
                                                row: 3, column: 3, rowSpan: 1, columnSpan: 1
                                            },
                                            {
                                                element: <LabelBox key="combined-value-2" value={tradeprops.trader.statistics.loss.min+"/"+tradeprops.trader.statistics.loss.max} symbol='%'/>,
                                                row: 3, column: 4, rowSpan: 1, columnSpan: 1
                                            },
                                        ]}
                                    />
                                </div>, 
                            row: 3, column: 2, rowSpan: 3, columnSpan: 2
                        },
                        ]}
                    />,
                    row: 11, column: 1, rowSpan: 4, columnSpan: 1
                },
                {element: 
                    <GridBox  
                        columns={4} 
                        rows={1} 
                        elements={[
                            {element: <SelectedTab title={tradeprops.getWord(4)} backgroundcolor="green" textcolor='white' onclick={tradeprops.trader.sell}/>},
                            {element: <SelectedTab title={String(tradeprops.trader.balance)} backgroundcolor='white' textcolor='black'/>},
                            {element: <SelectedTab title={tradeprops.getWord(3)} backgroundcolor="red" textcolor='white' onclick={tradeprops.trader.buy}/>},
                            {element: <SelectedTab title={tradeprops.getWord(5)} backgroundcolor="blue" textcolor='white' onclick={tradeprops.trader.close}/>}
                        ]}
                    />
                },
                {element:  
                    <GridBox  
                        columns={5} 
                        rows={1} 
                        elements={[
                            {element: !tradeprops.market.isActive ? <SelectedTab icon_image="/icons/play.svg" onclick={tradeprops.market.start}/> : <SelectedTab icon_image="/icons/pause.svg" onclick={tradeprops.market.pause}/>},
                            {element: <DropMenu 
                                elements={defaultSpeeds} 
                                selected={0} 
                                title='' 
                                backgroundcolor='grey' 
                                onselected={ChangeSpeed}
                                style="rounded-md px-3 py-2 text-sm font-medium"
                            />},
                            {element: <SelectedTab icon_image="/icons/next.svg" onclick={tradeprops.market.step}/>},
                            {element: <SelectedTab icon_image="/icons/stop.svg" onclick={tradeprops.market.stop}/>},
                            {element: <SelectedTab icon_image="/icons/settings.svg" onclick={HideShowSettings}/>},
                        ]}
                    />
                }, 
            ]}          
        />
        </div>
    );
}

export default TradingFrame;