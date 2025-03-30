import React from 'react';
import SelectedTab from '../components/button';
import GridBox from '../components/gridbox';
import { TTradingFrameProps } from '../views/types';

type TradeControlPanelProps = Pick<TTradingFrameProps, 'trader' | 'getWord'>;

const TradeControlPanel: React.FC<TradeControlPanelProps> = (props) => {
    return (
        <GridBox  
            columns={4} 
            rows={1} 
            elements={[
                {
                    element: <SelectedTab title={props.getWord('buy')} backgroundcolor="green" textcolor='white' onClick={props.trader.sell}/>,
                },
                {
                    element: <SelectedTab title={String(props.trader.balance)} backgroundcolor='white' textcolor='black'/>,
                },
                {
                    element: <SelectedTab title={props.getWord('sell')} backgroundcolor="red" textcolor='white' onClick={props.trader.buy}/>,
                },
                {
                    element: <SelectedTab title={props.getWord('close')} backgroundcolor="blue" textcolor='white' onClick={props.trader.close}/>,
                }
            ]}
        />
    );
};

export default TradeControlPanel;