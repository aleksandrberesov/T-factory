import { retrieveLaunchParams } from '@telegram-apps/sdk';

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
      
    };
  } finally {
    
  }
}
 