import React from 'react';
import LabelBox from '../components/label';
import GridBox from '../components/gridbox';
import { TTradingFrameProps } from '../frames/types';
import { NumberToSignedString } from '../frames/utils';
import { currencySymbol } from '../models/consts';

type TradeStatisticGroupProps = Pick<TTradingFrameProps, 'trader' | 'getWord'>;

const TradeStatisticGroup: React.FC<TradeStatisticGroupProps> = (props) => {
  return (
    <GridBox
      columns={3}
      rows={5}
      elements={[
        {element: <div className='bg-slate-300 w-full h-full'>
                <GridBox
                    columns={2}
                    rows={4}    
                    elements={[
                        {
                            element: <LabelBox key="position" title={props.getWord(6)}/*'Position'*/ value={props.trader.deal.volume} symbol={currencySymbol}/>,
                            row: 1, column: 1, rowSpan: 1, columnSpan: 2
                        },
                        {
                            element: <LabelBox key="amount" value={props.trader.deal.amount} symbol='lot'/>,
                            row: 2, column: 2, rowSpan: 1, columnSpan: 1    
                        },
                        {
                            element: <LabelBox key="average-cost" title={props.getWord(7)}/*'Average cost'*/ value={props.trader.averageCost}/>,
                            row: 3, column: 1, rowSpan: 1, columnSpan: 2},
                        {
                            element: <LabelBox key="capital" title={props.getWord(9)}/*'Capital'*/ value={props.trader.balance} symbol={currencySymbol}/>,
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
                        {element: <LabelBox key="current-title" title={props.getWord(11)}/*'Current'*//>},
                        {element: <LabelBox key="current-value" value={NumberToSignedString(props.trader.statistics.currentResult.value)} symbol={currencySymbol} textcolor='green-200'/>},
                        {element: <LabelBox key="current-percent" value={NumberToSignedString(props.trader.statistics.currentResult.percentage)} symbol='%' textcolor='blue-500'/>},
                        {element: <LabelBox key="all-title" title={props.getWord(12)}/*'All'*//>},
                        {element: <LabelBox key="all-value" value={NumberToSignedString(props.trader.statistics.totalResult.value)} symbol={currencySymbol} textcolor='red-500'/>},
                        {element: <LabelBox key="all-percent" value={NumberToSignedString(props.trader.statistics.totalResult.percentage)} symbol='%' textcolor='blue-500'/>}
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
                  element: <LabelBox key="transactions-title" title={props.getWord(15)}/*'Transactions'*//>,
                  row: 1, column: 1, rowSpan: 1, columnSpan: 1
              },
              {
                  element: <LabelBox key="transactions-count-1" value={props.trader.statistics.count}/>,
                  row: 1, column: 2, rowSpan: 1, columnSpan: 1
              },
              {
                  element: <LabelBox key="transactions-count-2" value={props.trader.statistics.profitDeals.value+'('+props.trader.statistics.profitDeals.percentage.toString()+'%'+')'}/>,
                  row: 1, column: 3, rowSpan: 1, columnSpan: 1},
              {
                  element: <LabelBox key="transactions-count-3" value={props.trader.statistics.lossDeals.value+'('+props.trader.statistics.lossDeals.percentage.toString()+'%'+')'}/>,
                  row: 1, column: 4, rowSpan: 1, columnSpan: 1},
              {
                  element: <LabelBox key="all-title" title={props.getWord(16)}/>,
                  row: 2, column: 1, rowSpan: 1, columnSpan: 1
              }, 
              {
                  element: <LabelBox key="all-value-1" value={NumberToSignedString(props.trader.statistics.averageProfitLoss.percentage)} symbol='%'/>,
                  row: 2, column: 2, rowSpan: 1, columnSpan: 1    
              },
              {
                  element: <LabelBox key="all-value-2" value={NumberToSignedString(props.trader.statistics.profit.average)} symbol='%'/>,
                  row: 2, column: 3, rowSpan: 1, columnSpan: 1
              },
              {
                  element: <LabelBox key="all-value-3" value={NumberToSignedString(props.trader.statistics.loss.average)} symbol='%'/>,      
                  row: 2, column: 4, rowSpan: 1, columnSpan: 1
              },
              {
                  element: <LabelBox key="combined-title" title={props.getWord(17)+"/"+props.getWord(18)}/>,
                  row: 3, column: 1, rowSpan: 2, columnSpan: 1
              },
              {
                  element: <LabelBox key="combined-value-1" value={props.trader.statistics.profit.min+"/"+props.trader.statistics.profit.max} symbol='%'/>,
                  row: 3, column: 3, rowSpan: 1, columnSpan: 1
              },
              {
                  element: <LabelBox key="combined-value-2" value={props.trader.statistics.loss.min+"/"+props.trader.statistics.loss.max} symbol='%'/>,
                  row: 3, column: 4, rowSpan: 1, columnSpan: 1
              },
            ]}
            />
            </div>, 
            row: 3, column: 2, rowSpan: 3, columnSpan: 2
        },
      ]}
    />
  );
}

export default TradeStatisticGroup;