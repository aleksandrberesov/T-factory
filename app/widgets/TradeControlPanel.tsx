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
                    element: <SelectedTab title={props.getWord(4)} backgroundcolor="green" textcolor='white' onclick={props.trader.sell}/>,
                },
                {
                    element: <SelectedTab title={String(props.trader.balance)} backgroundcolor='white' textcolor='black'/>,
                },
                {
                    element: <SelectedTab title={props.getWord(3)} backgroundcolor="red" textcolor='white' onclick={props.trader.buy}/>,
                },
                {
                    element: <SelectedTab title={props.getWord(5)} backgroundcolor="blue" textcolor='white' onclick={props.trader.close}/>,
                }
            ]}
        />
    );
};

export default TradeControlPanel;