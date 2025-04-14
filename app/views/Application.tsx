import React, { useMemo, useState, useEffect } from 'react';
import { IApplication } from '../controllers/interfaces';
import { startFrame } from '../models/consts';
import GridBox from "../components/gridbox";
import NavigationPanel from "../widgets/NavigationPanel";
import TradingFrame from "../views/Trading";
import ProfileFrame from "../views/Profile";
import StatisticFrame from "../views/Statistic";
import LoadingFrame from "../views/Loading";
import LaguageChangePanel from '../widgets/LanguageChangePanel';
import ModalWindow from '../components/modal-window';

type TApplicationViewProps = {
    controller: IApplication;
};

const ApplicationView: React.FC<TApplicationViewProps> = (props) => {
    console.log("ApplicationView rendered");
    const [component, setComponent] = useState<React.JSX.Element>();
    const [isLanguageChangeShow, setIsLanguageChangeShow] = useState(false);
    const ChangeLanguage = (lang: string) => {
        setIsLanguageChangeShow(false);
        props.controller.localizer.setLanguage(lang);
    };
    const Views = useMemo(() => {
        console.log('Views rememorize', props.controller.status, props.controller.localizer.language);
        if (props.controller.status.isLoading || props.controller.status.isError) return [];
        return [
            {
                id: 0 , 
                name: props.controller.localizer.getWord('profile'), 
                element: 
                    <ProfileFrame 
                        dictionary={props.controller.localizer}
                        profile={props.controller.profile}  
                    />,
                viewFunction: setComponent,
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
                    />,
                viewFunction: setComponent,
            },
            {
                id: 2 , 
                name: props.controller.localizer.getWord('statistic'), 
                element: 
                    <StatisticFrame 
                        dictionary={props.controller.localizer}
                        profile={props.controller.profile}   
                    />,
                viewFunction: setComponent,
            },
            {
                id: 3 , 
                name: props.controller.localizer.language, 
                element: <div></div>, 
                viewFunction: (element: React.JSX.Element)=> { setIsLanguageChangeShow(true) },    
            }   
        ];
    }, [props.controller.localizer.language, props.controller.status]);
    const setView = (id: number | string) => {
        const view = Views[Number(id)];
        if (view){
            view.viewFunction(view.element)
        };
    };
    useEffect(() => {
        if (Views.length > 0 && props.controller.status.isReady){ 
            setView(startFrame);
        }
    }, [props.controller.status]);
    useEffect(() => {
        if (Views.length > 0 && props.controller.status.isReady) {
            setView(startFrame);
        }
    }, [props.controller.localizer.language]);
    if (props.controller.status.isLoading){
        return ( 
            <LoadingFrame/>
        )
    }else if (props.controller.status.isError){
        return (
            <div>Error: {props.controller.statusInfo}</div>
        )
    }else if (props.controller.status.isReady){
        return (
            <div className='h-full w-full'>
                <GridBox
                    columns={1}
                    rows={10}
                    elements={[
                        {
                            element:         
                            <NavigationPanel
                                elements = { Views.map((item)=>({id: item.id, name: item.name})) }
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
                {isLanguageChangeShow && (<ModalWindow content={<LaguageChangePanel ChangeLanguage={ChangeLanguage} Languages={props.controller.localizer.languages}/>}/>)}
            </div>
        );
    }
};

export default ApplicationView;