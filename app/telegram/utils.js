import { initViewport } from '@telegram-apps/sdk';

export function IsTelegramAvailable(){
  return true;
};

export async function FullScreen(){
  try {
    const [viewport] = initViewport();
    const vp = await viewport;
  
    if (!vp.isExpanded) { 
        vp.expand();
    }  
  } catch(error) {
    console.error('An error occurred:', error.message);
  } finally{
    
  }   
};