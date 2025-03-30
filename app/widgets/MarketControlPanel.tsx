import React from 'react';
import SelectedTab from '../components/button';
import GridBox from '../components/gridbox';
import { TTradingFrameProps } from '../views/types';

type TMarketControlPanelProps = Pick<TTradingFrameProps, 'market'> & {
    HideShowSettings(): void;
    HideShowSpeed(): void;
};

const MarketControlPanel: React.FC<TMarketControlPanelProps> = (props) => {
    return (
        <GridBox  
            columns={5} 
            rows={1} 
            showBorders = {false}
            elements={[
                {
                    element:
                        !props.market.isActive ? <SelectedTab icon_image="/icons/play.svg" onClick={props.market.start}/> : <SelectedTab icon_image="/icons/pause.svg" onClick={props.market.pause}/>,
                },
                {
                    element: 
                        <SelectedTab 
                            title={props.market.speed} 
                            backgroundcolor='grey' 
                            onClick={props.HideShowSpeed}
                       />,
                },
                {
                    element: <SelectedTab icon_image="/icons/next.svg" onClick={props.market.step}/>,
                },
                {
                    element: <SelectedTab icon_image="/icons/stop.svg" onClick={props.market.stop}/>,
                },
                {
                    element: <SelectedTab icon_image="/icons/settings.svg" onClick={props.HideShowSettings}/>,
               },
            ]}
        />
    );
};

export default MarketControlPanel;