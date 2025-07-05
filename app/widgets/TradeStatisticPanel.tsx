import React from 'react';
import { IDictionary } from '../controllers/localization';
import Label from '../ui/label';
import Grid from '../ui/grid';
import { NumberToString } from '../libs/utils';
import { currencySymbol } from '../models/consts';
import useViewController from '../controllers/viewController';
import { TTradeState, TStatistics } from '../models/types';
import { TradeStatisticPanelProps } from './types';
import ResultStatPanel from './ResultStatPanel';

const TradeStatisticGroup: React.FC<TradeStatisticPanelProps> = (props) => {
    const dictionary = useViewController<IDictionary>(props.localizer.addView);
    const controller = useViewController<TTradeState>(props.trader.addView);
    const statistics = useViewController<TStatistics>(props.statistics.addView);
    return (
            <Grid
                columns={3}
                rows={5}
                showBorders={false}
                elements={[
                    {element: 
                        <Grid
                            columns={2}
                            rows={4}    
                            backgroundColor='gray'
                            elements={[
                                {
                                    element: <Label key="position" title={dictionary?.getWord('position')}/*'Position'*/ value={NumberToString(controller?.volume)} symbol={currencySymbol}/>,
                                    row: 1, column: 1, rowSpan: 1, columnSpan: 2
                                },
                                {
                                    element: <Label key="amount" title={'  '} value={controller?.amount} symbol='lot'/>,
                                    row: 2, column: 1, rowSpan: 1, columnSpan: 2    
                                },
                                {
                                    element: <Label key="average-cost" title={dictionary?.getWord('avprice')}/*'Average cost'*/ value={controller?.averageCost}/>,
                                    row: 3, column: 1, rowSpan: 1, columnSpan: 2},
                                {
                                    element: <Label key="capital" title={dictionary?.getWord('fundings')}/*'Capital'*/ value={NumberToString(controller?.balance)} symbol={currencySymbol}/>,
                                    row: 4, column: 1, rowSpan: 1, columnSpan: 2
                                },  
                            ]}
                        />, 
                        row: 1, column: 1, rowSpan: 5, columnSpan: 1
                    },
                    {element: 
                        <Grid
                            columns={3}
                            rows={2}   
                            backgroundColor='gray' 
                            elements={[
                                {element: <Label key="current-title" title={dictionary?.getWord('current')}/*'Current'*//>},
                                {element: <Label key="current-value" value={NumberToString(statistics?.currentResult.value)} symbol={currencySymbol} textColor='green-200'/>},
                                {element: <Label key="current-percent" value={NumberToString(statistics?.currentResult.percentage)} symbol='%' textColor='blue-500'/>},
                                {element: <Label key="all-title" title={dictionary?.getWord('total')}/*'All'*//>},
                                {element: <Label key="all-value" value={NumberToString(statistics?.totalResult.value)} symbol={currencySymbol} textColor='red-500'/>},
                                {element: <Label key="all-percent" value={NumberToString(statistics?.totalResult.percentage)} symbol='%' textColor='blue-500'/>}
                            ]}
                        />, 
                        row: 1, column: 2, rowSpan: 2, columnSpan: 2
                    },
                    {element:
                        <ResultStatPanel
                            statistics={statistics}
                            localizer={props.localizer}
                        />, 
                        row: 3, column: 2, rowSpan: 3, columnSpan: 2
                    },
                ]}
            />
    );
}

export default TradeStatisticGroup;