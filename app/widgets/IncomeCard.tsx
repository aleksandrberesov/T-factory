import React from "react";
import List from "../ui/list";
import Label from "../ui/label";

type TIncomeCardProps = {
    title : string;
    description ?: string;
    //iconURL ?: string;
};

const IncomeCard: React.FC<TIncomeCardProps> = (props) => {
    return (
        <List
            backgroundColor='gray'
            elements={[
              <Label key='title' title={props.title}/>,
              <Label key='description' title={props.description ? props.description : ''}/>,  
            ]}
        />
    );
};

export default IncomeCard;