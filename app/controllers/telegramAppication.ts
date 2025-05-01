import { GetUserData } from "../telegram/dataService";
import { FullScreen } from "../telegram/utils";
import { GetProfile, UpdateProfile, GetPatterns, CommitPattern, GetPoints } from "../aws/dataService";
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

const useApplication = (): IApplication => {
  const controller: IController = useBaseController();
  const currentStatus: IValue<TStatus> = useValue({isInit: true} as TStatus);
  const statusInformaion: IValue<string> = useValue('initialization');
  const pattern = usePattern(GetPoints, GetPatterns, CommitPattern);
  const profile: IProfile = useProfile(UpdateProfile);
  const market: IMarket = useMarket();
  const trader: ITrade = useTrader();
  const statistics = useStatistics();
  const localizer: ILocalizator = useLocalizaion();
  const hasFetchedPatternData = useValue(false); 

  const fetchProfileData = async () => { 
      const tgProfile = await GetUserData();
      const dbProfile = await GetProfile(tgProfile.id);
      return {...tgProfile, ...dbProfile};
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
        profile.setData(pro); 
        localizer.set(pro.lang || 'en');
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