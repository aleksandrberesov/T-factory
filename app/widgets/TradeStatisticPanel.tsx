import React from 'react';
import { ITrade } from '../controllers/interfaces';
import { IDictionary } from '../libs/useLocalization';
import LabelBox from '../components/label';
import GridBox from '../components/gridbox';
import { NumberToString } from '../libs/utils';
import { currencySymbol } from '../models/consts';
import useViewController from '../controllers/viewController';
import { TTradeState } from '../models/types';

type TradeStatisticPanelProps = {
    trader: ITrade;
    dictionary: IDictionary;
};

const TradeStatisticGroup: React.FC<TradeStatisticPanelProps> = (props) => {
    const controller = useViewController<TTradeState>(props.trader.addView, props.trader.state);
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
                            element: <LabelBox key="position" title={props.dictionary.getWord('position')}/*'Position'*/ value={NumberToString(controller?.deal.volume)} symbol={currencySymbol}/>,
                            row: 1, column: 1, rowSpan: 1, columnSpan: 2
                        },
                        {
                            element: <LabelBox key="amount" title={'  '} value={controller?.deal.amount} symbol='lot'/>,
                            row: 2, column: 1, rowSpan: 1, columnSpan: 2    
                        },
                        {
                            element: <LabelBox key="average-cost" title={props.dictionary.getWord('avprice')}/*'Average cost'*/ value={controller?.averageCost}/>,
                            row: 3, column: 1, rowSpan: 1, columnSpan: 2},
                        {
                            element: <LabelBox key="capital" title={props.dictionary.getWord('fundings')}/*'Capital'*/ value={NumberToString(controller?.balance)} symbol={currencySymbol}/>,
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
                        {element: <LabelBox key="current-title" title={props.dictionary.getWord('current')}/*'Current'*//>},
                        {element: <LabelBox key="current-value" value={NumberToString(controller?.statistics.currentResult.value)} symbol={currencySymbol} textcolor='green-200'/>},
                        {element: <LabelBox key="current-percent" value={NumberToString(controller?.statistics.currentResult.percentage)} symbol='%' textcolor='blue-500'/>},
                        {element: <LabelBox key="all-title" title={props.dictionary.getWord('total')}/*'All'*//>},
                        {element: <LabelBox key="all-value" value={NumberToString(controller?.statistics.totalResult.value)} symbol={currencySymbol} textcolor='red-500'/>},
                        {element: <LabelBox key="all-percent" value={NumberToString(controller?.statistics.totalResult.percentage)} symbol='%' textcolor='blue-500'/>}
                    ]}
                />, 
                row: 1, column: 2, rowSpan: 2, columnSpan: 2
            },
            {element:
                <GridBox
                    columns={4}
                    rows={3}   
                    backgroundColor='gray' 
                    elements={[
                    {
                        element: <LabelBox key="transactions-title" title={props.dictionary.getWord('deals')}/*'Transactions'*//>,
                        row: 1, column: 1, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <LabelBox key="transactions-count-1" value={controller?.statistics.dealsCount}/>,
                        row: 1, column: 2, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <LabelBox key="transactions-count-2" value={controller?.statistics.profitDeals.value+'('+controller?.statistics.profitDeals.percentage+'%'+')'}/>,
                        row: 1, column: 3, rowSpan: 1, columnSpan: 1},
                    {
                        element: <LabelBox key="transactions-count-3" value={controller?.statistics.lossDeals.value+'('+controller?.statistics.lossDeals.percentage+'%'+')'}/>,
                        row: 1, column: 4, rowSpan: 1, columnSpan: 1},
                    {
                        element: <LabelBox key="all-title" title={props.dictionary.getWord('average')} /*'average'*//>,
                        row: 2, column: 1, rowSpan: 1, columnSpan: 1
                    }, 
                    {
                        element: <LabelBox key="all-value-1" value={NumberToString(controller?.statistics.averageProfitLoss.percentage)} symbol='%'/>,
                        row: 2, column: 2, rowSpan: 1, columnSpan: 1    
                    },
                    {
                        element: <LabelBox key="all-value-2" value={NumberToString(controller?.statistics.profit.average)} symbol='%'/>,
                        row: 2, column: 3, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <LabelBox key="all-value-3" value={NumberToString(controller?.statistics.loss.average)} symbol='%'/>,      
                        row: 2, column: 4, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <LabelBox key="combined-title" title={props.dictionary.getWord('min')+"/"+props.dictionary.getWord('max')} /*'min/max'*//>,
                        row: 3, column: 1, rowSpan: 1, columnSpan: 2
                    },
                    {
                        element: <LabelBox key="combined-value-1" value={NumberToString(controller?.statistics.profit.min)+"/"+NumberToString(controller?.statistics.profit.max)} symbol='%'/>,
                        row: 3, column: 3, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <LabelBox key="combined-value-2" value={NumberToString(controller?.statistics.loss.min)+"/"+NumberToString(controller?.statistics.loss.max)} symbol='%'/>,
                        row: 3, column: 4, rowSpan: 1, columnSpan: 1
                    },
                    ]}
                />, 
                row: 3, column: 2, rowSpan: 3, columnSpan: 2
            },
        ]}
        />
        </div>
    );
}

export default TradeStatisticGroup;