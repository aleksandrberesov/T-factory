import React from 'react';
import SelectedTab from '../components/button';
import GridBox from '../components/gridbox';
import { TTradingFrameProps } from '../frames/types';
import DropMenu from '../components/drop-menu';
import { defaultSpeeds } from '../models/consts';

type TMarketControlPanelProps = Pick<TTradingFrameProps, 'market'> & {
    HideShowSettings(): void;
    ChangeSpeed(speedID: number): void;
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
                        !props.market.isActive ? <SelectedTab icon_image="/icons/play.svg" onclick={props.market.start}/> : <SelectedTab icon_image="/icons/pause.svg" onclick={props.market.pause}/>,
                },
                {
                    element: 
                        <DropMenu 
                            elements={defaultSpeeds} 
                            selected={0} 
                            title='' 
                            backgroundcolor='grey' 
                            onselected={props.ChangeSpeed}
                       />,
                },
                {
                    element: <SelectedTab icon_image="/icons/next.svg" onclick={props.market.step}/>,
                },
                {
                    element: <SelectedTab icon_image="/icons/stop.svg" onclick={props.market.stop}/>,
                },
                {
                    element: <SelectedTab icon_image="/icons/settings.svg" onclick={props.HideShowSettings}/>,
               },
            ]}
        />
    );
};

export default MarketControlPanel;