"use client";

import { FullScreen, GetUserData } from "./telegram/integration";
import { GetProfile, UpdateProfile, GetPatterns, GetPoints } from "./aws/dataService"
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { startFrame } from "./models/consts";
import NavigationFrame from "./frames/frame.navigation";
import TradingFrame from "./frames/frame.trading";
import ProfileFrame from "./frames/frame.profile";
import StatisticFrame from "./frames/frame.statistic";
import LoadingFrame from "./frames/frame.loading";
import useLocalizaion from "./libs/lib.localization";
import useProfile from "./models/profile";
import usePattern from "./models/pattern";
import useMarket from "./models/market";
import useTrade from "./models/trade";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [component, setComponent] = useState<React.JSX.Element>();
  const [currentFrame, setCurrentFrame] = useState<number>(startFrame); 
  
  const pattern = usePattern(GetPoints, GetPatterns);
  const profile = useProfile(UpdateProfile);
  const market = useMarket();
  const trader = useTrade();
  const {words, getWord, setLanguage} = useLocalizaion(profile.data.lang);

  const fetchAppData = useCallback(async () => { 
    try { 
      setLoading(true); 
      const tgProfile = await GetUserData();
      const dbProfile = await GetProfile(tgProfile.id); 
      profile.setData({ ...tgProfile, ...dbProfile }); 
      pattern.init(); 
    } catch ( error ) { 
      setError((error as Error).message); 
    } finally { 
      
    } 
  }, [profile, pattern]);
  
  const Frames = useMemo(() => [
    {id: 0 , 
     element: <ProfileFrame 
                profile={profile}  
                getWord={getWord}
              />
    },
    {id: 1 , 
     element: <TradingFrame
                getWord={getWord}
                pattern={pattern}
                market={market}
                trader={trader}
              />
    },
    {id: 2 , 
     element: <StatisticFrame 
                profile={profile}
                getWord={getWord}
              />
    }   
  ], [profile, market, market.isActive, pattern]);
  
  const ChangeFrame = useCallback((id: number) => { 
    setCurrentFrame(id); 
    setComponent(Frames[id].element); 
  }, [Frames]); 
  
  const ChangeLanguage = useCallback((lang_tag: string) => { 
    profile.setData({ lang: lang_tag }); 
    setLanguage(lang_tag); 
  },[profile, setLanguage]);

  useEffect(()=>{
    FullScreen();
  }, []);
  
  useEffect(()=>{
    ChangeFrame(currentFrame);
  },[words, profile.data, pattern.patterns, market.points, , market.isActive]);

  useEffect(()=>{
    market.init(pattern.pattern);
    trader.init(profile, market);
    setLoading(false); 
  },[pattern.pattern]);
  
  
  useEffect(() => {
    fetchAppData();
  }, []);

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