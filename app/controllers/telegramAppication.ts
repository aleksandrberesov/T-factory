import { GetUserData } from "../telegram/dataService";
import { FullScreen } from "../telegram/utils";
import { GetProfile, UpdateProfile, GetPatterns, CommitPattern, GetPoints, GetStatistics, PushStatistics } from "../aws/dataService";
import { useEffect } from 'react';
import useLocalizaion, { ILocalizator } from "./localization";
import useProfile from "./profile";
import usePattern from "./pattern";
import useMarket from "./market";
import useTrader from "./trader";
import { TStatus } from "./types";
import { IApplication, IMarket, IProfile, ITrade } from "./interfaces";  
import useValue, { IValue } from "../libs/data-hooks/value";
import useBaseController, { IController } from "./baseController";
import useStatistics from "./statistics";
import { TProfile, TStatisticsItem } from "../models/types";
import { defaultProfile } from "../models/defaults";

const useApplication = (): IApplication => {
  const controller: IController = useBaseController();
  const currentStatus: IValue<TStatus> = useValue({isInit: true} as TStatus);
  const statusInformaion: IValue<string> = useValue('initialization');
  const hasFetchedPatternData = useValue(false); 

  const pattern = usePattern(GetPoints, GetPatterns, CommitPattern);
  const profile: IProfile = useProfile(UpdateProfile);
  const market: IMarket = useMarket();
  const trader: ITrade = useTrader();
  const statistics = useStatistics(PushStatistics);
  const localizer: ILocalizator = useLocalizaion();

  const fetchProfileData = async (): Promise<{ profile: TProfile; statistics: TStatisticsItem[] }> => { 
      const tgProfile = await GetUserData();
      const dbProfile = await GetProfile(tgProfile.id);
      const dbStatistics = await GetStatistics(tgProfile.id);
      const fromdbProfile: TProfile = {
          ...defaultProfile,
          ...tgProfile,
          ...dbProfile,
      } as TProfile; 
      console.log('db', fromdbProfile);
      const mergedProfile = {
        profile: fromdbProfile,
        statistics: dbStatistics as TStatisticsItem[],
      };
      console.log('mergedProfile', mergedProfile);
      return mergedProfile;
  };

  const fetchPatternData = async () => { 
      return await pattern.init();
  }; 

  useEffect(() => {
    controller.applyChanges();
    FullScreen();
  }, []);

  useEffect(() => {
    if (currentStatus.get().isInit) {                                 
      localizer.init()
               .then((status: boolean) => {
                  if (status) {
                    currentStatus.set({...currentStatus.get(), ...{isLoading: true, isInit: false}});  
                    statusInformaion.set('initialization'); 
                  }
                })
                .then(() => {
                  controller.applyChanges();  
                });
    }else if(currentStatus.get().isLoading) {
      fetchProfileData() 
      .then((pro) => {
        profile.setData(pro.profile); 
        statistics.init(pro.statistics); 
        localizer.set(pro.profile.lang || 'en');
      })
      .then(() => {
        if (!hasFetchedPatternData.get()) { 
          fetchPatternData()
          .then((points) => {
            hasFetchedPatternData.set(true);
            market.init(points);
            trader.init(profile, market, statistics);   
            currentStatus.set({...currentStatus.get(), ...{isLoading: false, isDone: true}});  
            statusInformaion.set('done');                        
          });
        }
      })
      .finally(() => {   
        controller.applyChanges(); 
      });
    } else if (currentStatus.get().isDone && !currentStatus.get().isReady) {
      currentStatus.set({...currentStatus.get(), ...{isReady: true}});  
      statusInformaion.set('ready');                          
      controller.applyChanges();
    }
  }, [controller.isChanged]);

  return {
    status: currentStatus.get(),
    statusInfo: statusInformaion.get(),
    localizer,
    profile, 
    pattern,
    market,
    trader,
    statistics,
  };
};

export type { IApplication };
export default useApplication;