import { GetUserData } from "../telegram/dataService";
import { FullScreen } from "../telegram/utils";
import { GetProfile, UpdateProfile, GetPatterns, CommitPattern, GetPoints } from "../aws/dataService"
import { useEffect, useCallback, useMemo } from 'react';
import useLocalizaion from "../libs/useLocalization";
import useProfile from "./profile";
import usePattern from "./pattern";
import useMarket from "./market";
import useTrade from "./trade";
import { IApplication, TStatus } from "./types";
import useValue, { IValue } from "../libs/data-hooks/value";
import useBaseController, { IController } from "./baseController";

const useApplication = (): IApplication => {
  console.log("Application controller initialized");
  const controller: IController = useBaseController();
  const currentStatus: IValue<TStatus> = useValue('init' as TStatus);
  const statusInformaion: IValue<string> = useValue('initialization');
  console.log("APP STATUS before initialization", currentStatus.get());
  const pattern = usePattern(GetPoints, GetPatterns, CommitPattern);
  const profile = useProfile(UpdateProfile);
  const market = useMarket();
  const trader = useTrade();
  const localizer = useLocalizaion();

  const fetchAppData = useCallback(async () => { 
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
      controller.applyChanges();
      console.log("APP STATUS", currentStatus.get());
    } 
  }, [controller, profile]);

  useEffect(() => {
    FullScreen();
  }, []);

  useEffect(() => {
    fetchAppData();
    return () => {
      //profile.setData({ lang: localizer.language });   
    };
  }, [fetchAppData]);

  return {
    isChanged: controller.isChanged,
    status: currentStatus.get,
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