import { GetItem, PutItem, GetItemList } from './dynamoDB'

async function GetPatterns(): Promise<string[]> {
    const data = await GetItemList("patterns", "name");   
    
    if (Array.isArray(data) && data.every(item => typeof item === 'string')) {
        return data;
    } else{
        return [];
    }
};

async function GetPoints(name: string): Promise<object> {
    let result = {
        pre_points : [],
        points : [],
    };

    const pointsData = await GetItem("patterns", "name",name);
    
    if (pointsData){
        return {...result, ...pointsData}
    }else
        return result;
}

async function GetProfile(user_id: number){
    return await GetItem("users", "id", user_id); 
};

async function UpdateProfile(profile: Object){
    return await PutItem("users", profile); 
};

async function CommitPattern(pattern: Object){
    await PutItem("patterns", pattern);
};

async function GetStatistics(user_id: number){
    const data = await GetItem("statistics", "id", user_id);
    if (data){
        return data;
    }
    return {};
};

export {GetProfile, UpdateProfile, GetPatterns, CommitPattern, GetPoints, GetStatistics};