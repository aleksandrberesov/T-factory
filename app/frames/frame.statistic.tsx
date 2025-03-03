import React, { useEffect, useState, useId } from 'react';
import { TStatisticFrameProps } from './types';
import ListBox from '../components/listbox';
import CheckBox from '../components/checkbox'; 

function StatisticFrame(statprops: TStatisticFrameProps){

    const statElemets = statprops.profile.data.statistics.map((item, index) => {
        return {
            id: index,
            element: <CheckBox title={item.title} is_checked={item.isDone}/>
        }
    });

    return(
        <div
            className="h-dvh w-dvh bg-transparent flex-col gap-y-10"
        >
            <div
                className='grid grid-rows-1 grid-flow-col gap-2 m-2 bg-gray-500'    
            >   
                <ListBox elements={statElemets}/>  
            </div>
        </div>
    );
}

export default StatisticFrame;