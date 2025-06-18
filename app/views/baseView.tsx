import React, { useMemo } from "react";
import './styles/view.css';

type TViewProps = {
    content ?: React.JSX.Element;
};

const BaseView: React.FC<TViewProps> = (props) => {
    return (
        <div className="view">
            {props.content}
        </div>  
    );
};

export default BaseView;