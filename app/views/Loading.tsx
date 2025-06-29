import Label from '../ui/label';

function LoadingFrame(){

    return(
        <div
            className="h-screen w-screen bg-transparent gap-y-10"
        >
            <div
                className='grid-flow-row gap-2 m-2 bg-gray-500'    
            >
                <Label title="LOADING"/>
            </div>
        </div>
    );
}

export default LoadingFrame;