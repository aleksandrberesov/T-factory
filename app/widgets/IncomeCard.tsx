import React from "react";
import GridBox from "../components/gridbox";
import ListBox from "../components/listbox";
import SelectedTab from '../components/button';
import LabelBox from "../components/label";


type TIncomeCardProps = {
    title : string;
    description ?: string;
    iconURL ?: string;
};

const IncomeCard: React.FC<TIncomeCardProps> = (props) => {
    return (
        <GridBox
            backgroundColor='blue'
            rows={3}
            columns={1}
            elements={[
                {
                    element: <LabelBox title={props.title}/>
                },
                {
                    element: <LabelBox title={props.description ? props.description : ''}/>,
                },
                
            ]}
        />
    );
};

export default IncomeCard;