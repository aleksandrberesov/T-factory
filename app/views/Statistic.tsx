import React from 'react';
import { TStatisticFrameProps } from './types';
import List, { ScrollableStack } from '../ui/list';
import Container from '../ui/container';
import ResultStatPanel from '../widgets/ResultStatPanel';
import { TimeToFormatString } from '../libs/utils';

const StatisticFrame: React.FC<TStatisticFrameProps> = (props) => {
    const Items = () => {
        return props.statistics.getAll()
            .sort((a, b) => b.recordedAt - a.recordedAt) // Sort by recordedAt descending
            .map((item, index) => (
                //<div key={index}>
                //    <p>{TimeToFormatString(item.recordedAt)}</p>
                    <ResultStatPanel  
                        key={index}
                        localizer={props.localizer}
                        statistics={item}   
                    />
                //</div>    
            ));
    };

    return(
//        <Container 
//            backgroundColor='gray'
//        />
        //<div id='statistics-frame' className="view overflow-y-hidden bg-slate-200">  
//            <List 
//               backgroundColor='gray'
//               elements={Items()}
//            />
        //</div>
       <ScrollableStack      
            backgroundColor='gray'
            elements={Items()}
       />
    );
}

export default StatisticFrame;