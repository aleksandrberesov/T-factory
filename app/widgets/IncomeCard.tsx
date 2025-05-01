import React from "react";

type TIncomeCardProps = {
    title : string;
    description ?: string;
    iconURL ?: string;
};

const IncomeCard: React.FC<TIncomeCardProps> = (props) => {
    return (
        <div className='grid grid-rows-2 grid-flow-col gap-1 m-1'>
            <div className="">
                <p>{props.title}</p>
            </div>
            <div className="row-span-2">
                <p>{props.description}</p>
            </div>
            <div>

            </div>
        </div>
    );
};

export default IncomeCard;