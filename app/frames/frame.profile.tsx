import React, { useEffect, useState, useId } from 'react';
import { TProfileFrameProps} from "./types"
import { TCard, TStar } from "../models/types"
import LabelBox from "../components/label"
import IconTab from '../components/icontab';
import CardTab from '../components/cardtab';
import GridBox from '../components/gridbox';
import SelectedTab from '../components/button';
import ListBox from '../components/listbox';

function ProfileFrame(profileprops: TProfileFrameProps){
    const cardElemets = profileprops.profile.data.cards.map((item, index) => {
        return {
            id: index,
            element: <CardTab title={item.title} description={item.description}/>
        }
    });

    return(
        <div
            className="h-full w-full bg-transparent gap-y-2 m-2"
        >
            <ListBox title="Stars" elements={[
                <LabelBox key='1' title='name' value={profileprops.profile.data.user.first_name} textcolor='white'/>,
                <LabelBox key='2' title='second name' value={profileprops.profile.data.user.last_name || ''} textcolor='white'/>,
                <LabelBox key='3' title='balance' value={String(profileprops.profile.data.balance)} textcolor='white'/>
            ]}/>
            <GridBox rows={3} columns={2} elements={cardElemets}/> 
        </div>
    );
}

export default ProfileFrame;