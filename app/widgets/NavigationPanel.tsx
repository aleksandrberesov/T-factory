import React from 'react';
import { TOnSelectedFunction } from "../libs/types";
import { ILocalizator } from '../libs/useLocalization';
import SelectedTab from '../components/button';
import DropMenu from '../components/drop-menu';

type TNavigationPanelProps = {
    localizer: ILocalizator;
    elements: {id: number | string; name: string}[];
    onSelected ?: TOnSelectedFunction;
};

const NavigationPanel: React.FC<TNavigationPanelProps> = (props) => {

    function CreateButton(id: number | string, name: string,  proc?: TOnSelectedFunction): React.JSX.Element{
        return (
            <div key={String(id)} className='flex-col gap-y-2 col-span-2'>
                <SelectedTab
                    id={id}
                    title={name} 
                    style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white w-full"
                    onSelected={proc}
                />
            </div>    
        );
    };

    return(
        <div className="w-full bg-gray-800">
            <div className="grid grid-cols-7 gap-2 m-2">
                {props.elements.map((item) => CreateButton(item.id, item.name, props.onSelected))}   
                <DropMenu
                    elements={props.localizer.languages}
                    selected={props.localizer.language}
                    style="rounded-md px-3 py-2 text-sm font-medium"
                    dropDirection='down'
                    onSelected={(id: number | string)=>{ props.localizer.setLanguage(String(id))}}
                    backgroundcolor='yellow'
                    textcolor='black'
                /> 
            </div>    
        </div>
    );
}

export default NavigationPanel;