import React, { useEffect, useState, useId } from 'react';
import { TStatisticProps } from './types';
import ListBox from '../components/listbox';
import CheckBox from '../components/checkbox'; 

function StatisticFrame(statprops: TStatisticProps){
    let idCounter = 1;

    const statElemets = statprops.data.map((item) => {
        return {
            id: idCounter++,
            element: <CheckBox title={item.title} is_checked={item.isDone}/>
        }
    });
    
    //statprops.data.map<{title: string; isDone: boolean}[]>((item) => 
    //    {id: 1, element:  <CheckBox title={item.title} is_checked={item.isDone} />}
    //);
    
    /*[
        {id: 1, element: <CheckBox title='first' />}, 
        {id: 2, element: <CheckBox title='second' />}
    ];*/
    return(
        <div
            className="h-dvh w-dvh bg-transparent flex-col gap-y-10"
        >
            <div
                className='grid grid-rows-2 grid-flow-col gap-2 m-2 bg-gray-500'    
            >
                <p className="bg-green-300"> {statprops.id} </p>   
                <ListBox title='current statistic' elements={statElemets}/>  
            </div>
        </div>
    );
}

export default StatisticFrame;