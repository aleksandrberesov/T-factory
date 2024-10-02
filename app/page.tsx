"use client";

import { FullScreen, GetUserData } from "./telegram/integration";
import React, { useEffect, useState } from 'react';
import { startFrame, defaultUser } from "./models/consts";
import { TProfile } from "./models/types";
import NavigationFrame from "./frames/frame.navigation";
import TradingFrame from "./frames/frame.trading";
import ProfileFrame from "./frames/frame.profile";
import StatisticFrame from "./frames/frame.statistic";
import useLocalizaion from "./libs/lib.localization";

export default function Home() {
  let currentUser :  TProfile;
  currentUser = Object.assign({}, defaultUser, GetUserData());
  const [component, SetComponent] = useState<React.JSX.Element>();
  const {words, getWord, setLanguage} = useLocalizaion(currentUser.lang);

  const Frames = [
    {id: 0 , 
     element: <ProfileFrame 
                user = {currentUser.user} 
                cards = {currentUser.cards} 
                stars = {currentUser.stars}
              />
    },
    {id: 1 , 
     element: <TradingFrame
                getWord={getWord}
              />
    },
    {id: 2 , 
     element: <StatisticFrame 
                id = {currentUser.id}
                data = {currentUser.statistics}
              />
    }   
  ];
  
  const ChangeFrame = (id: number) => {
    SetComponent(Frames[id].element);
  };

  const ChangeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  useEffect(() => {
    FullScreen();
    ChangeFrame(startFrame);
  }, [words]);


  return (
    <main 
      className="h-screen w-screen overflow-hidden bg-black"
    >
      <NavigationFrame
        onselected = {ChangeFrame} 
        lang = {currentUser.lang}
        getWord={getWord}
        setLanguage={ChangeLanguage}
      />
      {component}
    </main>
  );
}
