import { GetUserData } from "../telegram/dataService";
import { FullScreen } from "../telegram/utils";
import { GetProfile, UpdateProfile, GetPatterns, CommitPattern, GetPoints } from "../aws/dataService"
import { useEffect, useCallback, useMemo } from 'react';
import useLocalizaion from "../libs/useLocalization";
import useProfile from "./profile";
import usePattern from "./pattern";
import useMarket from "./market";
import useTrade from "./trade";
import { TStatus } from "./types";
import { IApplication, IProfile } from "./interfaces";  
import useValue, { IValue } from "../libs/data-hooks/value";
import useBaseController, { IController } from "./baseController";

const useApplication = (): IApplication => {
//  console.log("Application controller initialized");
  const controller: IController = useBaseController();
  const currentStatus: IValue<TStatus> = useValue('init' as TStatus);
  const statusInformaion: IValue<string> = useValue('initialization');
  const pattern = usePattern(GetPoints, GetPatterns, CommitPattern);
  const profile: IProfile = useProfile(UpdateProfile);
  const market = useMarket();
  const trader = useTrade();
  const localizer = useLocalizaion();

  const fetchProfileData = useCallback(async () => { 
    try { 
      currentStatus.set('loading');
      statusInformaion.set('fetching profile data');
      controller.applyChanges();
      console.log("APP STATUS", currentStatus.get());
      /*profile.setData(GetUserData().then(
        (tgProfile) => {
          return GetProfile(tgProfile.id).then(
            (dbProfile) => { 
              return { ...tgProfile, ...dbProfile };
            }
          );
        }
      ));*/
    } catch (error) { 
      currentStatus.set('error');
      statusInformaion.set((error as Error).message); 
      controller.applyChanges();
      console.log("APP STATUS", currentStatus.get(), statusInformaion.get());
    } finally { 
      currentStatus.set('done');
      statusInformaion.set('profile data fetched');
      controller.applyChanges();
      console.log("APP STATUS", currentStatus.get());
    } 
  }, []);

  useEffect(() => {
     if (currentStatus.get() === 'done') {
      localizer.setLanguage('en');
     }
  }, [localizer.isLoaded]);

  useEffect(() => {
    fetchProfileData();
    return () => {
      //profile.setData({ lang: localizer.language });   
    };
  }, [fetchProfileData]);

  useEffect(() => {
    FullScreen();
  }, []);

  return useMemo(() => ({
    status: currentStatus.get(),
    statusInfo: statusInformaion.get(),
    localizer,
    profile, 
    pattern,
    market,
    trader,
  }), [
    controller.isChanged, localizer.isLoaded, localizer.language,
  ]);
};

export type { IApplication };
export default useApplication;