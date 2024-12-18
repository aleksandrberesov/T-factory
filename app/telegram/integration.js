import { initViewport, retrieveLaunchParams } from '@telegram-apps/sdk';

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
}

export async function GetUserData(){
  try {
    const { initDataRaw, initData } = retrieveLaunchParams();
    return {
      id: initData.user.id,
      lang: initData.user.languageCode,
      user: {
        first_name : initData.user.firstName,
        last_name :  initData.user.lastName,
      },
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
    return {
      id: -1,
    };
  } finally {
    
  }
}
 