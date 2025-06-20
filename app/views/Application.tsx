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
import useRefValue from '../libs/data-hooks/value';
import useViewController from '../controllers/viewController';
import { IDictionary } from '../controllers/localization';
import './styles/view.css';

type TApplicationViewProps = {
    controller: IApplication;
};

const ApplicationView: React.FC<TApplicationViewProps> = (props) => {
    const dictionary = useViewController<IDictionary>(props.controller.localizer.addView);
    const [component, setComponent] = useState<React.JSX.Element>();
    const [isLanguageChangeShow, setIsLanguageChangeShow] = useState(false);
    const currentFrameId = useRefValue<number>(startFrame);
    const ChangeLanguage = (lang: string) => {
        props.controller.localizer.set(lang);
    };
    const Views = useMemo(() => {
        if (props.controller.status.isLoading || props.controller.status.isError) return [];
        return [
            {
                id: 0 , 
                name: dictionary?.getWord('profile'), 
                element: 
                    <ProfileFrame 
                        localizer={props.controller.localizer}
                        profile={props.controller.profile}  
                    />,
                viewFunction: setComponent,
            },
            {
                id: 1 , 
                name: dictionary?.getWord('trading'), 
                element: 
                    <TradingFrame
                        localizer={props.controller.localizer}
                        pattern={props.controller.pattern}
                        market={props.controller.market}
                        trader={props.controller.trader}
                        statistics={props.controller.statistics}
                    />,
                viewFunction: setComponent,
            },
            {
                id: 2 , 
                name: dictionary?.getWord('statistic'), 
                element: 
                    <StatisticFrame 
                        localizer={props.controller.localizer}
                        statistics={props.controller.statistics}  
                    />,
                viewFunction: setComponent,
            },
            {
                id: 3 , 
                name: dictionary?.language, 
                element: <></>, 
                viewFunction: (element: React.JSX.Element | undefined)=> { setIsLanguageChangeShow(true) },    
            }   
        ];
    }, [dictionary?.language, props.controller.status]);
    const setView = (id: number | string) => {
        const view = Views[Number(id)];
        if (view){
            view.viewFunction(view.element);
        };
        if (view.element !== undefined){
            currentFrameId.set(Number(id));
        };
    };
    const Navigation = useMemo(() => {
        return (
            <NavigationPanel
                elements = { Views.map((item)=>({id: item.id, name: item.name})) }
                onSelected = { setView } 
            />
        )
    }, [dictionary?.language, Views]);
    const AppGrid = useMemo(() => {
        return (
            <GridBox
                columns={1}
                rows={10}
                elements={[ 
                    {
                        element: Navigation, 
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
        )
    }, [component]);

    useEffect(() => {
        if (Views.length > 0 && props.controller.status.isReady){ 
            setView(currentFrameId.get());
        }
    }, [props.controller.status]);
    useEffect(() => {
        setIsLanguageChangeShow(false);
    }, [dictionary?.language]);

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
            <div className='view'>
                {AppGrid}
                {isLanguageChangeShow && (<ModalWindow content={<LaguageChangePanel ChangeLanguage={ChangeLanguage} Languages={props.controller.localizer.languages}/>}/>)}
            </div>
        );
    }
};

export default ApplicationView;