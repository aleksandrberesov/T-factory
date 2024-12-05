import SelectedTab from "../components/button";
import ListBox from '../components/listbox';
import {TSettingsProps} from "./types"

function SettingsFrame(settingsprops: TSettingsProps){
    let idCounter = 1;

    const Elemets = settingsprops.data.patterns.map((item) => {
        return {
            id: idCounter++,
            element: <SelectedTab title={item}/>
        }
    });

    return(
        <div
            className="h-screen w-screen bg-transparent gap-y-10"
        >
            <div
                className='grid-flow-row gap-2 m-2 bg-gray-500'    
            >
                <ListBox elements={Elemets}/>
                <SelectedTab title="Back" onclick={settingsprops.callBack}/>
            </div>
        </div>
    );
}

export default SettingsFrame;