import React from 'react';
import Listbox from '../components/listbox';
import { defaultSpeeds } from '../models/consts';
import SelectedTab from '../components/button';

type TSpeedChangePanelProps = {
    ChangeSpeed(speedID: number): void;
};

const SpeedChangePanel: React.FC<TSpeedChangePanelProps> = (props) => {
    const SelectedTabs = () => {
        return defaultSpeeds.map((item, index) => (
            <SelectedTab 
                key={index} 
                textcolor="black"
                title={item.element} 
                onClick={() => {
                    props.ChangeSpeed(index); 
                }}    
            />    
        ));
    };

    return (
        <div className="speed-change-panel">    
            <Listbox
                elements={SelectedTabs()} 
            />                
        </div>
    );
};

export default SpeedChangePanel;