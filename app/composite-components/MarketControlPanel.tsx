import React from 'react';
import SelectedTab from '../components/button';
import GridBox from '../components/gridbox';
import { TTradingFrameProps } from '../frames/types';
import DropMenu from '../components/drop-menu';
import { defaultSpeeds } from '../models/consts';

type TMarketControlPanelProps = TTradingFrameProps & {
    HideShowSettings() : void;
    ChangeSpeed(speedID: number) : void;
};

const MarketControlPanel: React.FC<TMarketControlPanelProps> = (tradeprops) => {
    return (
        <GridBox  
            columns={5} 
            rows={1} 
            showBorders = {true}
            elements={[
                {
                    element: !tradeprops.market.isActive ? <SelectedTab icon_image="/icons/play.svg" onclick={tradeprops.market.start}/> : <SelectedTab icon_image="/icons/pause.svg" onclick={tradeprops.market.pause}/>,
                    row: 1, column: 1, columnSpan: 1, rowSpan: 1,    
                },
                {
                    element: 
                        <DropMenu 
                            elements={defaultSpeeds} 
                            selected={0} 
                            title='' 
                            backgroundcolor='grey' 
                            onselected={tradeprops.ChangeSpeed}
                            style="rounded-md px-3 py-2 text-sm font-medium"
                        />,
                    row: 1, column: 2, columnSpan: 1, rowSpan: 1,
                },
                {
                    element: <SelectedTab icon_image="/icons/next.svg" onclick={tradeprops.market.step}/>,
                    row: 1, column: 3, columnSpan: 1, rowSpan: 1,
                },
                {
                    element: <SelectedTab icon_image="/icons/stop.svg" onclick={tradeprops.market.stop}/>,
                    row: 1, column: 4, columnSpan: 1, rowSpan: 1,
                },
                {
                    element: <SelectedTab icon_image="/icons/settings.svg" onclick={tradeprops.HideShowSettings}/>,
                    row: 1, column: 5, columnSpan: 1, rowSpan: 1,
                },
            ]}
        />
    );
};

export default MarketControlPanel;