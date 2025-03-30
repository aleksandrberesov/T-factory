import React from 'react';
import { TOnSelectedFunction, TNumberToStringFunc, TStringProc } from "../libs/types";
import { ILocalizator } from '../libs/useLocalization';
import SelectedTab from '../components/button';
import DropMenu from '../components/drop-menu';

type TNavigationPanelProps = {
    localizer: ILocalizator;
    onSelected ?: TOnSelectedFunction;
};

const NavigationPanel: React.FC<TNavigationPanelProps> = (props) => {

    function CreateButton(id: number): React.JSX.Element{
        return (
            <div className='flex-col gap-y-2 col-span-2'>
                <SelectedTab
                    id={id}
                    title={props.localizer.getWordByID(id)} 
                    style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white w-full"
                    onSelected={props.onSelected}
                />
            </div>    
        );
    };

    return(
        <div className="w-full bg-gray-800">
            <div className="grid grid-cols-7 gap-2 m-2">
                    {CreateButton(0)}
                    {CreateButton(1)}
                    {CreateButton(2)}
                <div>             
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
        </div>
    );
}

export default NavigationPanel;