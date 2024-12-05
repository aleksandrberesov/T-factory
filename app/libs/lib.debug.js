import { useEffect, useRef } from 'react'; 

const useDebugRender = (componentName, state) => { 
    const prevState = useRef(state); 
    useEffect(() => { 
        const changes = []; 
        for (const key in state) { 
            if (prevState.current[key] !== state[key]) { 
                changes.push({ prop: key, from: prevState.current[key], to: state[key] }); 
            } 
        } 
        if (changes.length) { 
            console.log(`[${componentName}] re-render caused by:`, changes); 
        } 
        prevState.current = state; 
    }); 
}; 

export default useDebugRender;