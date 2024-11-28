"use client";

import { FullScreen, GetUserData } from "./telegram/integration";
import { GetProfile, UpdateProfile, GetPatterns } from "./aws/dataService"
import React, { useEffect, useRef, useState } from 'react';
import { startFrame, defaultUser } from "./models/consts";
import { TProfile } from "./models/types";
import NavigationFrame from "./frames/frame.navigation";
import TradingFrame from "./frames/frame.trading";
import ProfileFrame from "./frames/frame.profile";
import StatisticFrame from "./frames/frame.statistic";
import LoadingFrame from "./frames/frame.loading";
import useLocalizaion from "./libs/lib.localization";

export default function Home() {
  const [profileData, setProfileData] = useState<TProfile>(defaultUser); 
  const profileDataRef = useRef(profileData);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [component, SetComponent] = useState<React.JSX.Element>();
  const {words, getWord, setLanguage} = useLocalizaion(profileData.lang);

  const fetchProfile = async () =>{
    try { 
        const tgProfile = await GetUserData(); 
        const dbProfile = await GetProfile(tgProfile.id);
        //console.log("tgProfile", JSON.stringify(tgProfile, null, 2));
        //console.log("dbProfile", JSON.stringify(dbProfile, null, 2));
        setProfileData({...defaultUser, ...tgProfile, ...dbProfile});
        //console.log("Profile", JSON.stringify(profileData, null, 2));
        //return {...tgProfile, ...dbProfile}
    } catch (error) { 
        setError((error as Error).message);
        //return {}; 
    } finally { 
        setLoading(false)
        //return {};
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

  const ChangeLanguage = (lang_tag: string) => {
    setProfileData(prevData => ({ ...prevData, lang: lang_tag }));
    setLanguage(lang_tag);
  };

  useEffect(()=>{
    FullScreen();
    ChangeFrame(startFrame);
  },[words]);

  useEffect(() => { 
    //profileDataRef.current = profileData;
    UpdateProfile(profileData); 
    //console.log("ref", JSON.stringify(profileDataRef.current,null,2));
  }, [profileData]);
  
  useEffect(() => {
    fetchProfile();
    return () => { 
      //UpdateProfile(profileDataRef.current);
    };
  }, []);

  if (loading){
    return(
      <LoadingFrame/>
    )
  }else if (error){
    return (
      <h1>ERROR</h1>
    )  
  }else{
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
}