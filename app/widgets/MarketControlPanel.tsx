import React, { useState } from 'react';
import SelectedTab from '../components/button';
import GridBox from '../components/gridbox';
import { TTradingFrameProps } from '../views/types';

type TMarketControlPanelProps = Pick<TTradingFrameProps, 'market'> & {
    HideShowSettings(): void;
    HideShowSpeed(): void;
};

const MarketControlPanel: React.FC<TMarketControlPanelProps> = (props) => {
    const [isPlay, SetIsPlay] = useState(!props.market.isActive);
    const togglePlay = () => {
        if (isPlay) {
            props.market.pause();
        } else {
            props.market.start();
        }
        SetIsPlay(!isPlay); 
    };

    return (
        <GridBox  
            columns={5} 
            rows={1} 
            showBorders = {false}
            elements={[
                {
                    element:
                        (isPlay ? <SelectedTab icon_image="/icons/play.svg" onClick={togglePlay}/> : <SelectedTab icon_image="/icons/pause.svg" onClick={togglePlay}/>),
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