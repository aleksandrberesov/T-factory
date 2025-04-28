import React from 'react';
import SelectedTab from '../components/button';
import GridBox from '../components/gridbox';
import { ITrade } from '../controllers/interfaces';
import { IDictionary } from '../libs/useLocalization';
import useViewController from '../controllers/viewController';
import { TTradeState } from '../models/types';
import { NumberToString } from '../libs/utils';

type TradeControlPanelProps = {
    trader: ITrade;
    dictionary: IDictionary;
};

const TradeControlPanel: React.FC<TradeControlPanelProps> = (props) => {
    const controller = useViewController<TTradeState>(props.trader.addView, props.trader.state);
    return (
        <GridBox  
            columns={4} 
            rows={1} 
            elements={[
                {
                    element: <SelectedTab title={props.dictionary.getWord('buy')} backgroundcolor="green" textcolor='white' onClick={props.trader.buy}/>,
                },
                {
                    element: <SelectedTab title={NumberToString(controller?.balance)} backgroundcolor='white' textcolor='black'/>,
                },
                {
                    element: <SelectedTab title={props.dictionary.getWord('sell')} backgroundcolor="red" textcolor='white' onClick={props.trader.sell}/>,
                },
                {
                    element: <SelectedTab title={props.dictionary.getWord('close')} backgroundcolor="blue" textcolor='white' onClick={props.trader.close}/>,
                }
            ]}
        />
    );
};

export default TradeControlPanel;