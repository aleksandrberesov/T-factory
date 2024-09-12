import React, { useEffect, useState, useId } from 'react';
import { TProfileProps} from "./types"
import LabelBox from "../components/label"
import IconTab from '../components/icontab';
import CardTab from '../components/cardtab';
import ListBox from '../components/listbox';
import GridBox from '../components/gridbox';

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
            className="h-screen w-screen bg-transparent gap-y-10"
        >
            <div
                className='grid-flow-row gap-2 m-2 bg-gray-500'    
            >
                <div>
                    <LabelBox title={profileprops.user.first_name+" "+profileprops.user.last_name} />
                </div>
                <GridBox rows={3} columns={2} elements={cardElemets}/> 
            </div>
        </div>
    );
}

export default ProfileFrame;