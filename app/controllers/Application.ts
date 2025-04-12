import { GetUserData } from "../telegram/dataService";
import { FullScreen } from "../telegram/utils";
import { GetProfile, UpdateProfile, GetPatterns, CommitPattern, GetPoints } from "../aws/dataService"
import { useEffect } from 'react';
import useLocalizaion, { ILocalizator } from "../libs/useLocalization";
import useProfile from "./profile";
import usePattern from "./pattern";
import useMarket from "./market";
import useTrade from "./trade";
import { TStatus } from "./types";
import { IApplication, IMarket, IProfile, ITrade } from "./interfaces";  
import useValue, { IValue } from "../libs/data-hooks/value";
import useBaseController, { IController } from "./baseController";

const useApplication = (): IApplication => {
  console.log("Application controller initialized");
  const controller: IController = useBaseController();
  const currentStatus: IValue<TStatus> = useValue({isInit: true} as TStatus);
  const statusInformaion: IValue<string> = useValue('initialization');
  const pattern = usePattern(GetPoints, GetPatterns, CommitPattern);
  const profile: IProfile = useProfile(UpdateProfile);
  const market: IMarket = useMarket();
  const trader: ITrade = useTrade();
  const localizer: ILocalizator = useLocalizaion();

  const fetchProfileData = async () => { 
      const tgProfile = await GetUserData();
      const dbProfile = await GetProfile(tgProfile.id);
      return {...tgProfile, ...dbProfile};
  };

  useEffect(() => {
    controller.applyChanges();
  },[]);

  useEffect(() => {
    if (currentStatus.get().isInit) {
      console.log("APP STATUS", currentStatus.get());                                   
      localizer.init()
               .then((status: boolean) => {
                  if (status) {
                    currentStatus.set({...currentStatus.get(), ...{isLoading: true, isInit: false}});  
                    statusInformaion.set('initialization'); 
                  }
                }).then(() => {
                  controller.applyChanges();  
                });
    }else if(currentStatus.get().isLoading) {
      currentStatus.set({...currentStatus.get(), ...{isLoading: false, isDone: true}});  
      statusInformaion.set('ready');          
      fetchProfileData().then((pro) => {
        profile.setData(pro); 
        localizer.setLanguage(pro.lang || 'en');
      })
      .then(() => {
        pattern.init();
        market.init(pattern.pattern);
        trader.init(profile, market);
      })
      .then(() => {;                             
        controller.applyChanges();
      });
    }
  }, [controller.isChanged]);
  useEffect(() => {
    FullScreen();
  }, []);

  return {
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