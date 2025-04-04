import React, { useMemo, useState, useEffect } from 'react';
import { IApplication } from '../controllers/interfaces';
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
    console.log("ApplicationView rendered");
    console.log('locale', props.controller.localizer.language);
    //console.log("VIEW STATUS",props.controller.statusInfo, props.controller.status);
    const [component, setComponent] = useState<React.JSX.Element>();
    const Views = useMemo(() => [
        {
            id: 0 , 
            name: props.controller.localizer.getWord('profile'), 
            element: 
                <ProfileFrame 
                    profile={props.controller.profile}  
                    dictionary={props.controller.localizer}
                />
        },
        {
            id: 1 , 
            name: props.controller.localizer.getWord('trading'), 
            element: 
                <TradingFrame
                    dictionary={props.controller.localizer}
                    pattern={props.controller.pattern}
                    market={props.controller.market}
                    trader={props.controller.trader}
                />
        },
        {
            id: 2 , 
            name: props.controller.localizer.getWord('statistic'), 
            element: 
                <StatisticFrame 
                    dictionary={props.controller.localizer}
                    profile={props.controller.profile}   
                />
        }   
    ], [props.controller.localizer.language]);

    const setView = (id: number | string) => {
        setComponent(Views[Number(id)].element);
    };
    useEffect(() => {
        setView(startFrame);
    }, []);
        
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
                        localizer={props.controller.localizer}
                        elements={Views.map((item)=>({id: item.id, name: item.name}))}
                        onSelected = { setView } 
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