import React, { useEffect } from 'react';
import { removeElementById } from '../libs/utils';
import { TChartViewProps } from './types';

const ChartView: React.FC<TChartViewProps> = (props) => {
    useEffect(()=>{
        const chartContainer = document.getElementById(props.controller.id);
        if (chartContainer) {
            removeElementById('tv-attr-logo', chartContainer);
        }
    },[]);
    return (
        <div id = {props.controller.id} className="flex h-full w-full">
        </div>
    );
}

export default ChartView;