"use client";

import { FullScreen, GetUserData } from "./telegram/integration";
import { GetProfile, GetPatterns } from "./aws/integration"
import React, { useEffect, useState } from 'react';
import { startFrame, defaultUser } from "./models/consts";
import { TProfile } from "./models/types";
import NavigationFrame from "./frames/frame.navigation";
import TradingFrame from "./frames/frame.trading";
import ProfileFrame from "./frames/frame.profile";
import StatisticFrame from "./frames/frame.statistic";
import useLocalizaion from "./libs/lib.localization";

export default function Home() {
  const [profileData, setPrtofileData] = useState<TProfile>(defaultUser); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [component, SetComponent] = useState<React.JSX.Element>();
  const {words, getWord, setLanguage} = useLocalizaion(profileData.lang);
  
  //let currentUser = {...defaultUser, ...GetUserData(), ...GetUser(0)}; 

  const fetchProfile = async ()=>{
    try { 
      const tgProfile = await GetUserData(); 
      const dbProfile = await GetProfile(tgProfile.id);
      setPrtofileData({...defaultUser, ...tgProfile, ...dbProfile});
    } catch (error) { 
      setError((error as Error).message); 
    } finally { 
      setLoading(false)
    };
  };
  
  const Frames = [
    {id: 0 , 
     element: <ProfileFrame 
                profile={profileData}  
              />
    },
    {id: 1 , 
     element: <TradingFrame
                getWord={getWord}
              />
    },
    {id: 2 , 
     element: <StatisticFrame 
                profile={profileData}
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
    fetchProfile();
    ChangeFrame(startFrame);
  }, [words]);


  return (
    <main 
      className="h-screen w-screen overflow-hidden bg-black"
    >
      <NavigationFrame
        onselected = {ChangeFrame} 
        lang = {profileData.lang}
        getWord={getWord}
        setLanguage={ChangeLanguage}
      />
      <div 
        className="h-5/6"
      >
        {component}
      </div>
    </main>
  );
}
