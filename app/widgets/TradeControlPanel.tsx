import React from 'react';
import Button from '../ui/button';
import Grid from '../ui/grid';
import useViewController from '../controllers/viewController';
import { TTradeState } from '../models/types';
import { NumberToString } from '../libs/utils';
import { TradeControlPanelProps } from './types';
import { IDictionary } from '../controllers/localization';

const TradeControlPanel: React.FC<TradeControlPanelProps> = (props) => {
    const dictionary = useViewController<IDictionary>(props.localizer.addView);
    const controller = useViewController<TTradeState>(props.trader.addView);
    return (
        <Grid  
            columns={4} 
            rows={1} 
            elements={[
                {
                    element: <Button title={dictionary?.getWord('buy')} backgroundColor="green" textcolor='white' onClick={props.trader.buy}/>,
                },
                {
                    element: <Button title={NumberToString(controller?.balance)} backgroundColor='white' textcolor='black'/>,
                },
                {
                    element: <Button title={dictionary?.getWord('sell')} backgroundColor="red" textcolor='white' onClick={props.trader.sell}/>,
                },
                {
                    element: <Button title={dictionary?.getWord('close')} backgroundColor="blue" textcolor='white' onClick={props.trader.close}/>,
                }
            ]}
        />
    );
};

export default TradeControlPanel;