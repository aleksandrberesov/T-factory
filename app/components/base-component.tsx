import React from 'react';

interface BaseComponentProps {
    align: 'left' | 'center' | 'right' | 'stretch';
    content?: React.JSX.Element;
    description?: string;
}

const BaseComponent: React.FC<BaseComponentProps> = ({ align, content, description }) => {
    const alignmentStyles = {
        display: 'flex',
        justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : align,
        alignItems: align === 'stretch' ? 'stretch' : 'center',
    };

    return (
        <div style={alignmentStyles}>{content}</div>
    );
};

export default BaseComponent;