"use client";

import { FullScreen, GetUserData } from "./telegram/integration";
import React, { useEffect, useState, useId } from 'react';
import defaultUser from "./models/defaultprofile";
import { TProfile } from "./models/types";
import NavigationFrame from "./frames/frame.navigation";
import TradingFrame from "./frames/frame.trading";
import ProfileFrame from "./frames/frame.profile";
import StatisticFrame from "./frames/frame.statistic";

export default function Home() {
  let currentUser :  TProfile;
  
  currentUser = Object.assign({}, defaultUser, GetUserData());

  const Frames = [
    {id: 0 , 
     element: <ProfileFrame 
                user = {currentUser.user} 
                cards = {currentUser.cards} 
                stars = {currentUser.stars}
              />
    },
    {id: 1 , 
     element: <TradingFrame/>

    },
    {id: 2 , 
     element: <StatisticFrame 
                id = {currentUser.id}
                data = {currentUser.statistics}
              />
    }   
  ];
  const [component, SetComponent] = useState(Frames[1].element); 

  const ChangeFrame = (id: number) => {
    SetComponent(Frames[id].element);
  };

  useEffect(() => {
    let ignore = false; 
    if (!ignore){
        FullScreen();
        return ()=>{
          ignore = true;
        };            
    }
  }, []);

  return (
    <main 
      className="h-screen w-screen overflow-hidden bg-black"
    >
      <NavigationFrame
        onselected = {ChangeFrame} 
        lang = {currentUser.lang}
      />
      {component}
    </main>
  );
}
