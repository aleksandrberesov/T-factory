import React, { useEffect, useState, useId } from 'react';
import { TProfileProps} from "./types"
import LabelBox from "../components/label"
import IconTab from '../components/icontab';
import CardTab from '../components/cardtab';
import GridBox from '../components/gridbox';
import SelectedTab from '../components/button';

function ProfileFrame(profileprops: TProfileProps){
    let idCard = 1; 
    let idStar = 1;
    const onStarClick = ()=>{

    };
 
    const StarElements = profileprops.stars.map((item) => {
        return {
            id: idStar++,
            element: <SelectedTab icon_image="/icons/star.svg" onclick={onStarClick}/>
        };
    });
    const cardElemets = profileprops.cards.map((item) => {
        return {
            id: idCard++,
            element: <CardTab title={item.title} description={item.description}/>
        }
    });

    return(
        <div
            className="h-full w-full bg-transparent gap-y-2 m-2 bg-gray-400"
        >
            <div
                className='grid-flow-row gap-2 m-2 '    
            >
                <div>
                    <LabelBox title={profileprops.user.first_name+" "+profileprops.user.last_name} />
                </div>
                <GridBox rows={1} elements={StarElements}/>
                <GridBox rows={3} columns={2} elements={cardElemets}/> 
            </div>
        </div>
    );
}

export default ProfileFrame;