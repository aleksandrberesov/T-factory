import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FullScreen, GetUserData } from "../telegram/integration";
import { GetProfile, UpdateProfile, GetPatterns, GetPoints } from "../aws/dataService"
import useLocalizaion from "../libs/lib.localization";
import useProfile from "../models/profile";
import usePattern from "../models/pattern";
import useMarket from "../models/market";
import useTrade from "../models/trade";
import { IApplication } from "./interfaces";
import { startFrame } from "./consts";

const useApp = (): IApplication => {
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
    }
  }, [profile, pattern]);

  
/*  
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
  },[words, profile.data, pattern.patterns, market.isActive, trader.changed, market.changed]);

  useEffect(()=>{
    market.init(pattern.pattern);
    trader.init(profile, market);
    setLoading(false); 
  },[pattern.pattern]);
  
  useEffect(()=>{
    trader.init(profile, market);
    market.addManager(trader);
  },[profile.data.id]); 
  
  useEffect(() => {
    fetchAppData();
  }, []);
*/
    return {
        
    };
};

export default useApp;