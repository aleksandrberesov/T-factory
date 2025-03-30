import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { IApplication } from '../controllers/types';
import { startFrame } from '../models/consts';
import GridBox from "../components/gridbox";
import NavigationPanel from "../widgets/NavigationPanel";
import TradingFrame from "../views/Trading";
import ProfileFrame from "../views/Profile";
import StatisticFrame from "../views/Statistic";
import LoadingFrame from "../views/Loading";

type TApplicationViewProps = {
    controller: IApplication;
};

const ApplicationView: React.FC<TApplicationViewProps> = (props) => {
    const [component, setComponent] = useState<React.JSX.Element>();
    const [currentFrame, setCurrentFrame] = useState<number>(startFrame); 

    const Frames = useMemo(() => [
        {id: 0 , 
         element: <ProfileFrame 
                    profile={props.controller.profile}  
                    getWord={props.controller.localizer.getWord}
                  />
        },
        {id: 1 , 
         element: <TradingFrame
                    getWord={props.controller.localizer.getWord}
                    pattern={props.controller.pattern}
                    market={props.controller.market}
                    trader={props.controller.trader}
                  />
        },
        {id: 2 , 
         element: <StatisticFrame 
                    profile={props.controller.profile}
                    getWord={props.controller.localizer.getWord}
                  />
        }   
    ], []);


  const ChangeFrame = useCallback((id: number) => { 
    setCurrentFrame(id); 
    setComponent(Frames[id].element); 
  }, [Frames]); 

    useEffect(()=>{
      ChangeFrame(currentFrame);
    },[props.controller.localizer.getWord]);


    if (props.controller.status==='loading'){
        return ( 
            <LoadingFrame/>
        )
    }else if (props.controller.status==='error'){
        return (
            <div>Error: {props.controller.statusInfo}</div>
        )
    }else if (props.controller.status==='done'){
        return (
            <GridBox
                columns={1}
                rows={10}
                elements={[
                {
                    element:         
                    <NavigationPanel
                        onselected = {ChangeFrame} 
                        lang = {props.controller.profile.data.lang}
                        getWord={props.controller.localizer.getWord}
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