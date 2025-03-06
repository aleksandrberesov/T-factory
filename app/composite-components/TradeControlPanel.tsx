import React from 'react';
import SelectedTab from '../components/button';
import GridBox from '../components/gridbox';
import { TTradingFrameProps } from '../frames/types';

type TradeControlPanelProps = TTradingFrameProps;

const TradeControlPanel: React.FC<TradeControlPanelProps> = (tradeprops) => {
    return (
        <GridBox  
            columns={4} 
            rows={1} 
            elements={[
                {
                    element: <SelectedTab title={tradeprops.getWord(4)} backgroundcolor="green" textcolor='white' onclick={tradeprops.trader.sell}/>,
                },
                {
                    element: <SelectedTab title={String(tradeprops.trader.balance)} backgroundcolor='white' textcolor='black'/>,
                },
                {
                    element: <SelectedTab title={tradeprops.getWord(3)} backgroundcolor="red" textcolor='white' onclick={tradeprops.trader.buy}/>,
                },
                {
                    element: <SelectedTab title={tradeprops.getWord(5)} backgroundcolor="blue" textcolor='white' onclick={tradeprops.trader.close}/>,
                }
            ]}
        />
    );
};

export default TradeControlPanel;