import React, { useEffect, useState, useId } from 'react';
import { TProfileFrameProps} from "./types"
import { TCard, TStar } from "../models/types"
import LabelBox from "../components/label"
import IconTab from '../components/icontab';
import CardTab from '../components/cardtab';
import GridBox from '../components/gridbox';
import SelectedTab from '../components/button';

function ProfileFrame(profileprops: TProfileFrameProps){
    let idCard = 1; 
    let idStar = 1;
    const onStarClick = ()=>{

    };
 
    const StarElements = profileprops.profile.data.stars.map((item: TStar) => {
        return {
            id: idStar++,
            element: <SelectedTab icon_image="/icons/star.svg" onclick={onStarClick}/>
        };
    });
    const cardElemets = profileprops.profile.data.cards.map((item: TCard) => {
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
                <div
                    className='bg-red-400 text-cyan-700'    
                >
                    <LabelBox title={String(profileprops.profile.data.id)} />
                    <LabelBox title={profileprops.profile.data.user.first_name} />
                    <LabelBox title={profileprops.profile.data.user.last_name || ''} />
                    <LabelBox title={String(profileprops.profile.data.balance)} />
                </div>
                <GridBox rows={1} elements={StarElements}/>
                <GridBox rows={3} columns={2} elements={cardElemets}/> 
            </div>
        </div>
    );
}

export default ProfileFrame;