import React from 'react';
import SelectedTab from '../components/button';
import GridBox from '../components/gridbox';
import useViewController from '../controllers/viewController';
import { IMarket } from '../controllers/interfaces';
import { TMarketState } from '../models/types';

type TMarketControlPanelProps = {
    market: IMarket;
    HideShowSettings(): void;
    HideShowSpeed(): void;
};

const MarketControlPanel: React.FC<TMarketControlPanelProps> = (props) => {
    console.log("MarketControlPanel rendered", props.market);
    const data =  useViewController<TMarketState>(props.market.addView, props.market.state);
    return (
        <GridBox  
            columns={5} 
            rows={1} 
            showBorders = {false}
            elements={[
                {
                    element:
                        (!props.market.isActive ? <SelectedTab icon_image="/icons/play.svg" onClick={props.market.start}/> : <SelectedTab icon_image="/icons/pause.svg" onClick={props.market.pause}/>),
                },
                {
                    element: 
                        <SelectedTab 
                            title={data?.speed} 
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