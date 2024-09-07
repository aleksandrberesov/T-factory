import { initViewport, retrieveLaunchParams } from '@telegram-apps/sdk';

export async function FullScreen(){
    const [viewport] = initViewport();

    const vp = await viewport;
  
    if (!vp.isExpanded) {
        vp.expand(); // will expand the Mini App, if it's not
    }
}

export function GetUserData(){
    let User = {
        first_name : "no name",
        last_name :  "no lastname"
    };

    try {
        // Code that may throw an exception
        const { initDataRaw, initData } = retrieveLaunchParams();
        User.first_name = initData.user.firstName;
        User.last_name = initData.user.lastName;
      } catch (error) {
        // Code to handle the exception
        console.error('An error occurred:', error.message);
      } finally {
        // Code that will always run, regardless of an error
        return User;
        //console.log('This will always execute');
      }
    
    //const user = initData.user;
    //const username = user.username;
    //return 
    //{
        //       initData.user.id;
        //first_name : initData.user.firstName,
        //last_name : initData.user.lastName
        //+' '+user.languageCode;
    //}
}
 