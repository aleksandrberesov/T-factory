import React, { useEffect, useState, useId } from 'react';
import { TProfileProps} from "./types"
import LabelBox from "../components/label"

function ProfileFrame(profileprops: TProfileProps){
    return(
        <div
            className="h-dvh w-dvh bg-transparent flex-col gap-y-10"
        >
            <div
                className='grid grid-rows-3 grid-flow-col gap-2 m-2 bg-gray-500'    
            >
                <LabelBox title={profileprops.user.first_name+" "+profileprops.user.last_name} />
                
            </div>
        </div>
    );
}

export default ProfileFrame;