import { initViewport, retrieveLaunchParams } from '@telegram-apps/sdk';

export function IsTelegramAvailable(){
  return true;
};

export async function FullScreen(){
    const [viewport] = initViewport();

    const vp = await viewport;
  
    if (!vp.isExpanded) { 
        vp.expand();
    }
}

export function GetUserData(){
    let User = {
        first_name : "no name",
        last_name :  "no lastname"
    };
    let ID = 0;
    let LangCode = "en";

    try {
        const { initDataRaw, initData } = retrieveLaunchParams();
        User.first_name = initData.user.firstName;
        User.last_name = initData.user.lastName;
        ID = initData.user.id;
        LangCode = initData.user.languageCode;
      } catch (error) {
        console.error('An error occurred:', error.message);
      } finally {
          return {
            id: ID,
            lang: LangCode,
            user: User
          }
      }
}
 