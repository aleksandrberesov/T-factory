import React from 'react';
import { IDictionary } from '../controllers/localization';
import LabelBox from '../components/label';
import GridBox from '../components/gridbox';
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
        <div className='w-full'>
            <GridBox
                columns={3}
                rows={5}
                showBorders={false}
                elements={[
                    {element: 
                        <GridBox
                            columns={2}
                            rows={4}    
                            backgroundColor='gray'
                            elements={[
                                {
                                    element: <LabelBox key="position" title={dictionary?.getWord('position')}/*'Position'*/ value={NumberToString(controller?.volume)} symbol={currencySymbol}/>,
                                    row: 1, column: 1, rowSpan: 1, columnSpan: 2
                                },
                                {
                                    element: <LabelBox key="amount" title={'  '} value={controller?.amount} symbol='lot'/>,
                                    row: 2, column: 1, rowSpan: 1, columnSpan: 2    
                                },
                                {
                                    element: <LabelBox key="average-cost" title={dictionary?.getWord('avprice')}/*'Average cost'*/ value={controller?.averageCost}/>,
                                    row: 3, column: 1, rowSpan: 1, columnSpan: 2},
                                {
                                    element: <LabelBox key="capital" title={dictionary?.getWord('fundings')}/*'Capital'*/ value={NumberToString(controller?.balance)} symbol={currencySymbol}/>,
                                    row: 4, column: 1, rowSpan: 1, columnSpan: 2
                                },  
                            ]}
                        />, 
                        row: 1, column: 1, rowSpan: 5, columnSpan: 1
                    },
                    {element: 
                        <GridBox
                            columns={3}
                            rows={2}   
                            backgroundColor='gray' 
                            elements={[
                                {element: <LabelBox key="current-title" title={dictionary?.getWord('current')}/*'Current'*//>},
                                {element: <LabelBox key="current-value" value={NumberToString(statistics?.currentResult.value)} symbol={currencySymbol} textcolor='green-200'/>},
                                {element: <LabelBox key="current-percent" value={NumberToString(statistics?.currentResult.percentage)} symbol='%' textcolor='blue-500'/>},
                                {element: <LabelBox key="all-title" title={dictionary?.getWord('total')}/*'All'*//>},
                                {element: <LabelBox key="all-value" value={NumberToString(statistics?.totalResult.value)} symbol={currencySymbol} textcolor='red-500'/>},
                                {element: <LabelBox key="all-percent" value={NumberToString(statistics?.totalResult.percentage)} symbol='%' textcolor='blue-500'/>}
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
        </div>
    );
}

export default TradeStatisticGroup;