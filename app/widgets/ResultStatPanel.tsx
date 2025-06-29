import React from 'react';
import Label from '../ui/label';
import Grid from '../ui/grid';
import { NumberToString } from '../libs/utils';
import { StatisticPanelProps } from './types';

const ResultStatisticGroup: React.FC<StatisticPanelProps> = (props) => {
    return (
            <Grid
                columns={4}
                rows={3}   
                backgroundColor='gray' 
                elements={[
                    {
                        element: <Label key="transactions-title" title={props.localizer.dictionary?.getWord('deals')}/*'Transactions'*//>,
                        row: 1, column: 1, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <Label key="transactions-count-1" value={props.statistics?.dealsCount}/>,
                        row: 1, column: 2, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <Label key="transactions-count-2" value={props.statistics?.profitDeals.value+'('+props.statistics?.profitDeals.percentage+'%'+')'}/>,
                        row: 1, column: 3, rowSpan: 1, columnSpan: 1},
                    {
                        element: <Label key="transactions-count-3" value={props.statistics?.lossDeals.value+'('+props.statistics?.lossDeals.percentage+'%'+')'}/>,
                        row: 1, column: 4, rowSpan: 1, columnSpan: 1},
                    {
                        element: <Label key="all-title" title={props.localizer.dictionary?.getWord('average')} /*'average'*//>,
                        row: 2, column: 1, rowSpan: 1, columnSpan: 1
                    }, 
                    {
                        element: <Label key="all-value-1" value={NumberToString(props.statistics?.averageProfitLoss.percentage)} symbol='%'/>,
                        row: 2, column: 2, rowSpan: 1, columnSpan: 1    
                    },
                    {
                        element: <Label key="all-value-2" value={NumberToString(props.statistics?.profit.average)} symbol='%'/>,
                        row: 2, column: 3, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <Label key="all-value-3" value={NumberToString(props.statistics?.loss.average)} symbol='%'/>,      
                        row: 2, column: 4, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <Label key="combined-title" title={props.localizer.dictionary?.getWord('min')+"/"+props.localizer.dictionary?.getWord('max')} /*'min/max'*//>,
                        row: 3, column: 1, rowSpan: 1, columnSpan: 2
                    },
                    {
                        element: <Label key="combined-value-1" value={NumberToString(props.statistics?.profit.min)+"/"+NumberToString(props.statistics?.profit.max)} symbol='%'/>,
                        row: 3, column: 3, rowSpan: 1, columnSpan: 1
                    },
                    {
                        element: <Label key="combined-value-2" value={NumberToString(props.statistics?.loss.min)+"/"+NumberToString(props.statistics?.loss.max)} symbol='%'/>,
                        row: 3, column: 4, rowSpan: 1, columnSpan: 1
                    },
                ]}
            />
    );
}

export default ResultStatisticGroup;