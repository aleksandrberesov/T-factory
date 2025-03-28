"use client";

//import useApplication from "./controllers/Application";
import ApplicationView from "./views/Application";

import { GetUserData } from "./telegram/dataService";
import { FullScreen } from "./telegram/utils";
import { GetProfile, UpdateProfile, GetPatterns, CommitPattern, GetPoints } from "./aws/dataService"
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { startFrame } from "./models/consts";
import GridBox from "./components/gridbox";
import NavigationPanel from "./widgets/NavigationPanel";
import TradingFrame from "./views/Trading";
import ProfileFrame from "./views/Profile";
import StatisticFrame from "./views/Statistic";
import LoadingFrame from "./views/Loading";
import useLocalizaion from "./libs/useLocalization";
import useProfile from "./models/profile";
import usePattern from "./models/pattern";
import useMarket from "./models/market";
import useTrade from "./models/trade";

export default function Home() {
  //const ApplicationController = useApplication();

  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  
  const pattern = usePattern(GetPoints, GetPatterns, CommitPattern);
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
  
  const ChangeLanguage = useCallback((lang_tag: string) => { 
    profile.setData({ lang: lang_tag }); 
    setLanguage(lang_tag); 
  },[profile, setLanguage]);

  useEffect(()=>{
    FullScreen();
  }, []);

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

  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <ApplicationView
        loading={loading}
        error={error}
        profile={profile}
        market={market}
        trader={trader}
        pattern={pattern}
        ChangeLanguage={ChangeLanguage}
        getWord={getWord} 
      />
    </main>
  );
}