import React from 'react';
import Button from '../ui/button';
import Grid from '../ui/grid';
import useViewController from '../controllers/viewController';
import { IMarket } from '../controllers/interfaces';
import { TMarketState } from '../models/types';

type TMarketControlPanelProps = {
    market: IMarket;
    HideShowSettings(): void;
    HideShowSpeed(): void;
};

const MarketControlPanel: React.FC<TMarketControlPanelProps> = (props) => {
    const controller = useViewController<TMarketState>(props.market.addView);
    return (
        <Grid  
            columns={5} 
            rows={1} 
            showBorders = {false}
            elements={[
                {
                    element:
                        (!controller?.isActive ? <Button icon_image="/icons/play.svg" onClick={props.market.start}/> : <Button icon_image="/icons/pause.svg" onClick={props.market.pause}/>),
                },
                {
                    element: 
                        <Button 
                            title={controller?.speed} 
                            backgroundColor='grey' 
                            onClick={props.HideShowSpeed}
                        />,
                },
                {
                    element: <Button icon_image="/icons/next.svg" onClick={props.market.step}/>,
                },
                {
                    element: <Button icon_image="/icons/stop.svg" onClick={props.market.stop}/>,
                },
                {
                    element: <Button icon_image="/icons/settings.svg" onClick={props.HideShowSettings}/>,
               },
            ]}
        />
    );
};

export default MarketControlPanel;