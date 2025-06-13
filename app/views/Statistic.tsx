import React, { useEffect, useState, useId } from 'react';
import { TStatisticFrameProps } from './types';
import './styles/view.css';
import ListBox from '../components/listbox';
import ResultStatPanel from '../widgets/ResultStatPanel';

const StatisticFrame: React.FC<TStatisticFrameProps> = (props) => {
    const Items = () => {
        return props.statistics.getAllStat().map((item, index) => (
            <ResultStatPanel 
                key={index} 
                localizer={props.localizer}
                statistics={props.statistics}   
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