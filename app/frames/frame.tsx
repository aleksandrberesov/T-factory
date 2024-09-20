import React, { useMemo } from "react";

type TFrameProps = {
    content: React.JSX.Element;
};

type TFrameController = {

};

interface IFrame {
    controller: TFrameController; 
    content: React.JSX.Element;
};

function  Frame(frameprops: TFrameProps) : IFrame {
    const content = useMemo(() => (
        <div>
            {frameprops.content}
        </div>
      ), []);

    return {
        controller: {},
        content : content
    };
};

export default Frame;