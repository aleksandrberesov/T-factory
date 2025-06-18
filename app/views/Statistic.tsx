import React from 'react';
import { TStatisticFrameProps } from './types';
import './styles/view.css';
import ListBox from '../components/listbox';
import GridBox from '../components/gridbox';
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
        <div id='statistics-frame' className="w-9/12 h-5/6 bg-slate-100">  
            <GridBox
                rows={1}
                columns={1}
                elements={[{
                    element: (
                        <ListBox 
                            backgroundColor='gray'
                            elements={Items()}
                        />
                    )
                }]}    
            />
        </div>
    );
}

export default StatisticFrame;