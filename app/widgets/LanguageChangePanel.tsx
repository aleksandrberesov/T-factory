import React from 'react';
import Listbox from '../components/listbox';
import SelectedTab from '../components/button';

type TLanguageChangePanelProps = {
    Languages: string[];
    ChangeLanguage(lang: string): void;
};

const LanguageChangePanel: React.FC<TLanguageChangePanelProps> = (props) => {
    const SelectedTabs = () => {
        return props.Languages.map((item, index) => (
            <SelectedTab 
                key={index} 
                textcolor="black"
                title={item} 
                onClick={() => {
                    props.ChangeLanguage(item); 
                }}    
            />    
        ));
    };

    return (
        <div className="language-change-panel">    
            <Listbox
                elements={SelectedTabs()} 
            />                
        </div>
    );
};

export default LanguageChangePanel;