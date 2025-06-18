import React from 'react';
import { TStatisticFrameProps } from './types';
import './styles/view.css';
import ListBox from '../components/listbox';
import ResultStatPanel from '../widgets/ResultStatPanel';
import { TimeToFormatString } from '../libs/utils';

const StatisticFrame: React.FC<TStatisticFrameProps> = (props) => {
    const Items = () => {
        return props.statistics.getAll()
            .sort((a, b) => b.recordedAt - a.recordedAt) // Sort by recordedAt descending
            .map((item, index) => (
                <div key={index}>
                    <p>{TimeToFormatString(item.recordedAt)}</p>
                    <ResultStatPanel  
                        localizer={props.localizer}
                        statistics={item}   
                    />
                </div>    
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