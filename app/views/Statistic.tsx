import React, { useEffect, useState, useId } from 'react';
import { TStatisticFrameProps } from './types';
import './styles/view.css';
import ListBox from '../components/listbox';
import CheckBox from '../components/checkbox'; 

const StatisticFrame: React.FC<TStatisticFrameProps> = (props) => {

    return(
        <div id='statistics-frame' className="view">  

        </div>
    );
}

export default StatisticFrame;