import SelectedTab from "../components/button";

type TSettingsFrameProps = {
    callBack() : void;
};

function SettingsFrame(settingsprops: TSettingsFrameProps){

    return(
        <div
            className="h-screen w-screen bg-transparent gap-y-10"
        >
            <div
                className='grid-flow-row gap-2 m-2 bg-gray-500'    
            >
                <SelectedTab title="Back" onclick={settingsprops.callBack}/>
            </div>
        </div>
    );
}

export default SettingsFrame;