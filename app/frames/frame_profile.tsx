import React, { useEffect, useState, useId } from 'react';
import { TProfileProps} from "./types"
import LabelBox from "../components/label"
import IconTab from '../components/icontab';
import CardTab from '../components/cardtab';
import ListBox from '../components/listbox';

function ProfileFrame(profileprops: TProfileProps){
    let idCounter = 1;

    const cardElemets = profileprops.cards.map((item) => {
        return {
            id: idCounter++,
            element: <CardTab title={item.title} description={item.description}/>
        }
    });

    return(
        <div
            className="h-dvh w-dvh bg-transparent flex-col gap-y-10"
        >
            <div
                className='grid grid-rows-3 grid-flow-col gap-2 m-2 bg-gray-500'    
            >
                <LabelBox title={profileprops.user.first_name+" "+profileprops.user.last_name} />
                <div className='grid grid-rows-2 grid-flow-col gap-1 m-1'>
                    <IconTab />
                    <IconTab />
                </div>
                <div className='grid grid-flow-row grid-cols-2 gap-1 m-1'>
                    <ListBox elements={cardElemets}/> 
                </div>
            </div>
        </div>
    );
}

export default ProfileFrame;