import React from 'react';
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
    component: React.JSX.Element;
    ChangeFrame: (frame: number) => void;
    ChangeLanguage: (lang: string) => void;
    getWord: TNumberToStringFunc;
    profile: any;    
};

const ApplicationView: React.FC<TApplicationViewProps> = (props) => {
    
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
                        onselected = {props.ChangeFrame} 
                        lang = {props.profile.data.lang}
                        getWord={props.getWord}
                        setLanguage={props.ChangeLanguage}
                    />,
                    column: 1, row: 1,
                    columnSpan: 1, rowSpan: 1  
                },
                {
                    element: props.component,
                    column: 1, row: 2, 
                    columnSpan: 1, rowSpan: 9 
                }
                ]}
            />
        );
    }
};

export default ApplicationView;