import React from 'react';
import SelectedTab from '../components/button';
import GridBox from '../components/gridbox';
import useViewController from '../controllers/viewController';
import { TTradeState } from '../models/types';
import { NumberToString } from '../libs/utils';
import { TradeControlPanelProps } from './types';
import { IDictionary } from '../controllers/localization';

const TradeControlPanel: React.FC<TradeControlPanelProps> = (props) => {
    const dictionary = useViewController<IDictionary>(props.localizer.addView);
    const controller = useViewController<TTradeState>(props.trader.addView);
    return (
        <GridBox  
            columns={4} 
            rows={1} 
            elements={[
                {
                    element: <SelectedTab title={dictionary?.getWord('buy')} backgroundcolor="green" textcolor='white' onClick={props.trader.buy}/>,
                },
                {
                    element: <SelectedTab title={NumberToString(controller?.balance)} backgroundcolor='white' textcolor='black'/>,
                },
                {
                    element: <SelectedTab title={dictionary?.getWord('sell')} backgroundcolor="red" textcolor='white' onClick={props.trader.sell}/>,
                },
                {
                    element: <SelectedTab title={dictionary?.getWord('close')} backgroundcolor="blue" textcolor='white' onClick={props.trader.close}/>,
                }
            ]}
        />
    );
};

export default TradeControlPanel;