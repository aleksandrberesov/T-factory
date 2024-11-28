import { GetItem, PutItem, GetItemList } from './dynamoDB'

async function GetPatterns() {
    const tableName = "patterns"; 
    const userProfile = await GetItemList(tableName); 
    return userProfile;        
};

async function GetProfile(user_id: number){
    const tableName = "users"; 
    const userProfile = await GetItem(tableName, user_id); 
    console.log("getting profile", user_id, JSON.stringify(userProfile, null, 2));
    return userProfile;
};

async function UpdateProfile(profile: Object){
    console.log("update profile", JSON.stringify(profile, null, 2));
    const tableName = "users"; 
    const userProfile = await PutItem(tableName, profile); 
    return userProfile;
};


export {GetProfile, UpdateProfile, GetPatterns};