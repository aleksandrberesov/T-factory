import React, { useEffect } from 'react';
import { TChartViewProps } from './types';

const ChartView: React.FC<TChartViewProps> = (props) => { 
    return (
        <div id = {props.controller.id} className="flex h-full w-full">
        </div>
    );
}

export default ChartView;