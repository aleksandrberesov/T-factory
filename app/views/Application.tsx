import React, { useMemo, useState, useCallback } from 'react';
import { startFrame } from '../models/consts';
import { TNumberToStringFunc } from '../libs/types';
import GridBox from "../components/gridbox";
import NavigationPanel from "../widgets/NavigationPanel";
import TradingFrame from "../views/Trading";
import ProfileFrame from "../views/Profile";
import StatisticFrame from "../views/Statistic";
import LoadingFrame from "../views/Loading";

type TApplicationViewProps = {
    loading: boolean;
    error: string | null;
    ChangeLanguage: (lang: string) => void;
    getWord: TNumberToStringFunc;
    profile: any; 
    pattern: any;
    market: any;
    trader: any;   
};

const ApplicationView: React.FC<TApplicationViewProps> = (props) => {
    const [component, setComponent] = useState<React.JSX.Element>();
    const [currentFrame, setCurrentFrame] = useState<number>(startFrame); 

    const Frames = useMemo(() => [
        {id: 0 , 
         element: <ProfileFrame 
                    profile={props.profile}  
                    getWord={props.getWord}
                  />
        },
        {id: 1 , 
         element: <TradingFrame
                    getWord={props.getWord}
                    pattern={props.pattern}
                    market={props.market}
                    trader={props.trader}
                  />
        },
        {id: 2 , 
         element: <StatisticFrame 
                    profile={props.profile}
                    getWord={props.getWord}
                  />
        }   
    ], [props.profile, props.market, props.pattern]);
//], [profile, market, market.isActive, pattern]);

  const ChangeFrame = useCallback((id: number) => { 
    setCurrentFrame(id); 
    setComponent(Frames[id].element); 
  }, [Frames]); 

  /*  useEffect(()=>{
      ChangeFrame(currentFrame);
    },[words, profile.data, pattern.patterns, market.isActive, trader.changed, market.changed]);
*/

    if (props.loading){
        return ( 
            <LoadingFrame/>
        )
    }else if (props.error){
        return (
            <div>Error: {props.error}</div>
        )
    }else{
        return (
            <GridBox
                columns={1}
                rows={10}
                elements={[
                {
                    element:         
                    <NavigationPanel
                        onselected = {ChangeFrame} 
                        lang = {props.profile.data.lang}
                        getWord={props.getWord}
                        setLanguage={props.ChangeLanguage}
                    />,
                    column: 1, row: 1,
                    columnSpan: 1, rowSpan: 1  
                },
                {
                    element: component,
                    column: 1, row: 2, 
                    columnSpan: 1, rowSpan: 9 
                }
                ]}
            />
        );
    }
};

export default ApplicationView;