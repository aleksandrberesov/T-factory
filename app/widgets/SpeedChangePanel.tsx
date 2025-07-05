import React from 'react';
import List from '../ui/list';
import { defaultSpeeds } from '../models/consts';
import Button from '../ui/button';

type TSpeedChangePanelProps = {
    ChangeSpeed(speedID: number): void;
};

const SpeedChangePanel: React.FC<TSpeedChangePanelProps> = (props) => {
    const SelectedTabs = () => {
        return defaultSpeeds.map((item, index) => (
            <Button 
                key={index} 
                textColor="black"
                title={item.element} 
                onClick={() => {
                    props.ChangeSpeed(index); 
                }}    
            />    
        ));
    };

    return (  
            <List
                elements={SelectedTabs()} 
            />                
    );
};

export default SpeedChangePanel;