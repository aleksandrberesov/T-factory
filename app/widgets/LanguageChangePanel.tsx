import React from 'react';
import List from '../ui/list';
import Button from '../ui/button';

type TLanguageChangePanelProps = {
    Languages: string[];
    ChangeLanguage(lang: string): void;
};

const LanguageChangePanel: React.FC<TLanguageChangePanelProps> = (props) => {
    const SelectedTabs = () => {
        return props.Languages.map((item, index) => (
            <Button 
                key={index} 
                textColor="black"
                title={item} 
                onClick={() => {
                    props.ChangeLanguage(item); 
                }}    
            />    
        ));
    };

    return (
        <div className="language-change-panel">    
            <List
                elements={SelectedTabs()} 
            />                
        </div>
    );
};

export default LanguageChangePanel;