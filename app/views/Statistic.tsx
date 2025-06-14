import React from 'react';
import { TStatisticFrameProps } from './types';
import './styles/view.css';
import ListBox from '../components/listbox';
import ResultStatPanel from '../widgets/ResultStatPanel';

const StatisticFrame: React.FC<TStatisticFrameProps> = (props) => {
    const Items = () => {
        return props.statistics.getAllStat().sort().map((item, index) => (
            <ResultStatPanel 
                key={index} 
                localizer={props.localizer}
                statistics={item}   
            />    
        ));
    };

    return(
        <div id='statistics-frame' className="view">  
            <ListBox 
                backgroundColor='gray'
                elements={Items()}
            />
        </div>
    );
}

export default StatisticFrame;