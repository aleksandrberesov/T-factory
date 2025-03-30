import { GetUserData } from "../telegram/dataService";
import { FullScreen } from "../telegram/utils";
import { GetProfile, UpdateProfile, GetPatterns, CommitPattern, GetPoints } from "../aws/dataService"
import { useEffect, useCallback } from 'react';
import useLocalizaion from "../libs/useLocalization";
import useProfile from "../models/profile";
import usePattern from "../models/pattern";
import useMarket from "../models/market";
import useTrade from "../models/trade";
import { IApplication, TStatus } from "./types";
import useValue, { IValue } from "../libs/data-hooks/value";
import useBaseController, { IController } from "./baseController";

const useApplication = (): IApplication => {
  const controller: IController = useBaseController();
  const currentStatus: IValue<TStatus> = useValue('init' as TStatus);
  const statusInformaion: IValue<string> = useValue('');
  
  const pattern = usePattern(GetPoints, GetPatterns, CommitPattern);
  const profile = useProfile(UpdateProfile);
  const market = useMarket();
  const trader = useTrade();
  const localizer = useLocalizaion();

  const fetchAppData = useCallback(async () => { 
    try { 
      currentStatus.set('loading');
      //controller.applyChanges;
      await GetUserData().then(
        (tgProfile)=>{
          GetProfile(tgProfile.id).then(
            (dbProfile)=>{
              profile.setData({ ...tgProfile, ...dbProfile });  
            }
          );
        }   
      ).finally(()=>{
        pattern.init(); 
        localizer.setLanguage(profile.data.lang);
      }     
      );
      //const dbProfile = GetProfile(tgProfile.id); 
      //profile.setData({ ...tgProfile, ...dbProfile }); 
      //pattern.init(); 
    } catch ( error ) { 
      currentStatus.set('error');
      statusInformaion.set((error as Error).message); 
      //controller.applyChanges;
    } finally { 
      currentStatus.set('done');
      //controller.applyChanges;
    } 
  }, []);

  useEffect(()=>{
    fetchAppData();
    FullScreen();
  },[]);
/*
  useEffect(()=>{
    market.init(pattern.pattern);
    trader.init(profile, market);
  },[pattern.pattern]);
  
  useEffect(()=>{
    trader.init(profile, market);
    market.addManager(trader);
  },[profile.data.id]); 
  
  useEffect(() => {
    
    return ()=>{
      profile.setData({ lang: localizer.selectedLang });   
    };
  },[]);
*/
    return {
      changed: controller.isChanged,
      status: currentStatus.get(),
      statusInfo: statusInformaion.get(),

      localizer,
      profile, 
      pattern,
      market,
      trader,      
    };
};

export type { IApplication };
export default useApplication;