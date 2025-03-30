import { GetUserData } from "../telegram/dataService";
import { FullScreen } from "../telegram/utils";
import { GetProfile, UpdateProfile, GetPatterns, CommitPattern, GetPoints } from "../aws/dataService"
import { useEffect, useCallback } from 'react';
import useLocalizaion from "../libs/useLocalization";
import useProfile from "./profile";
import usePattern from "./pattern";
import useMarket from "./market";
import useTrade from "./trade";
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
      controller.applyChanges;
      profile.setData(GetUserData().then(
        (tgProfile)=>{
          return GetProfile(tgProfile.id).then(
            (dbProfile)=>{ 
              return { ...tgProfile, ...dbProfile };
            }
          );
        }
      ));

      /*}).finally(()=>{
        //controller.applyChanges;
        pattern.init(); 
        market.init(pattern.pattern);
        trader.init(profile, market);
        market.addManager(trader);
        localizer.setLanguage(profile.data.lang);
      });*/
    } catch ( error ) { 
      currentStatus.set('error');
      statusInformaion.set((error as Error).message); 
      controller.applyChanges;
    } finally { 
      currentStatus.set('done');
      controller.applyChanges;
    } 
  }, []);

  useEffect(()=>{
    FullScreen();
  },[]);

  useEffect(()=>{
    fetchAppData();
    return ()=>{
      //profile.setData({ lang: localizer.language });   
    };
  },[]);

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