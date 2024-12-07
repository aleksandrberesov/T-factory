"use client";

import { FullScreen, GetUserData } from "./telegram/integration";
import { GetProfile, UpdateProfile, GetPatterns, GetPoints } from "./aws/dataService"
import React, { useEffect, useState } from 'react';
import { startFrame } from "./models/consts";
import NavigationFrame from "./frames/frame.navigation";
import TradingFrame from "./frames/frame.trading";
import ProfileFrame from "./frames/frame.profile";
import StatisticFrame from "./frames/frame.statistic";
import LoadingFrame from "./frames/frame.loading";
import useLocalizaion from "./libs/lib.localization";
import useProfile from "./models/profile";
import usePattern from "./models/pattern";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [component, SetComponent] = useState<React.JSX.Element>();
  const [currentFrame, setCurrentFrame] = useState<number>(startFrame); 
  
  const pattern = usePattern(GetPoints, GetPatterns);
  const profile = useProfile(UpdateProfile);
  const {words, getWord, setLanguage} = useLocalizaion(profile.data.lang);

  const fetchAppData = async () =>{
    try { 
        const tgProfile = await GetUserData(); 
        const dbProfile = await GetProfile(tgProfile.id);
        console.log("db profile", JSON.stringify(dbProfile, null, 2));
        profile.setData({...tgProfile, ...dbProfile});
        pattern.init();
    } catch (error) { 
        setError((error as Error).message);
    } finally { 
        setLoading(false)
    };
  };
  
  const Frames = [
    {id: 0 , 
     element: <ProfileFrame 
                profile={profile}  
              />
    },
    {id: 1 , 
     element: <TradingFrame
                getWord={getWord}
                profile={profile}
                pattern={pattern}
              />
    },
    {id: 2 , 
     element: <StatisticFrame 
                profile={profile}
              />
    }   
  ];
  
  const ChangeFrame = (id: number) => {
    setCurrentFrame(id);
    SetComponent(Frames[id].element);
  };

  const ChangeLanguage = (lang_tag: string) => {
    profile.setData({lang: lang_tag });
    setLanguage(lang_tag);
  };

  useEffect(()=>{
    FullScreen();
  });
  
  useEffect(()=>{
    ChangeFrame(currentFrame);
  },[words, profile.data, pattern.patterns]);
  
  useEffect(() => {
    fetchAppData();
  });

  if (loading){
    console.log("page Loading");
    return(
      <LoadingFrame/>
    )
  }else if (error){
    console.log("page Error");
    return (
      <h1>ERROR</h1>
    )  
  }else{
    console.log("page Frame");
    return (
      <main 
        className="h-screen w-screen overflow-hidden bg-black"
      >
        <NavigationFrame
          onselected = {ChangeFrame} 
          lang = {profile.data.lang}
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
}