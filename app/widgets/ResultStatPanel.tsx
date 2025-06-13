import React from 'react';
import { IDictionary } from '../controllers/localization';
import LabelBox from '../components/label';
import GridBox from '../components/gridbox';
import { NumberToString } from '../libs/utils';
import useViewController from '../controllers/viewController';
import { TStatistics } from '../models/types';
import { StatisticPanelProps } from './types';

const ResultStatisticGroup: React.FC<StatisticPanelProps> = (props) => {
    const dictionary = useViewController<IDictionary>(props.localizer.addView);
    const statistics = useViewController<TStatistics>(props.statistics.addView);
    return (
        <div className='w-full'>
            <GridBox
                columns={4}
                rows={3}   
                backgroundColor='gray' 
                elements={[
                    {
                        element: <LabelBox key="transactions-title" title={dictionary?.getWord('deals')}/*'Transactions'*//>,
                        row: 1, column: 1, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <LabelBox key="transactions-count-1" value={statistics?.dealsCount}/>,
                        row: 1, column: 2, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <LabelBox key="transactions-count-2" value={statistics?.profitDeals.value+'('+statistics?.profitDeals.percentage+'%'+')'}/>,
                        row: 1, column: 3, rowSpan: 1, columnSpan: 1},
                    {
                        element: <LabelBox key="transactions-count-3" value={statistics?.lossDeals.value+'('+statistics?.lossDeals.percentage+'%'+')'}/>,
                        row: 1, column: 4, rowSpan: 1, columnSpan: 1},
                    {
                        element: <LabelBox key="all-title" title={dictionary?.getWord('average')} /*'average'*//>,
                        row: 2, column: 1, rowSpan: 1, columnSpan: 1
                    }, 
                    {
                        element: <LabelBox key="all-value-1" value={NumberToString(statistics?.averageProfitLoss.percentage)} symbol='%'/>,
                        row: 2, column: 2, rowSpan: 1, columnSpan: 1    
                    },
                    {
                        element: <LabelBox key="all-value-2" value={NumberToString(statistics?.profit.average)} symbol='%'/>,
                        row: 2, column: 3, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <LabelBox key="all-value-3" value={NumberToString(statistics?.loss.average)} symbol='%'/>,      
                        row: 2, column: 4, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <LabelBox key="combined-title" title={dictionary?.getWord('min')+"/"+dictionary?.getWord('max')} /*'min/max'*//>,
                        row: 3, column: 1, rowSpan: 1, columnSpan: 2
                    },
                    {
                        element: <LabelBox key="combined-value-1" value={NumberToString(statistics?.profit.min)+"/"+NumberToString(statistics?.profit.max)} symbol='%'/>,
                        row: 3, column: 3, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <LabelBox key="combined-value-2" value={NumberToString(statistics?.loss.min)+"/"+NumberToString(statistics?.loss.max)} symbol='%'/>,
                        row: 3, column: 4, rowSpan: 1, columnSpan: 1
                    },
                ]}
            />
        </div>
    );
}

export default ResultStatisticGroup;