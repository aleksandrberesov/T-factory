import AWS from 'aws-sdk'; 
import { awsConfig } from '../aws-exports';
import { isEmptyObject } from './libs/lib.utils';

async function GetProfile(user_id){
    console.log(JSON.stringify(awsConfig, null, 2)); 
    AWS.config.update(awsConfig); 
    const dynamoDB = new AWS.DynamoDB.DocumentClient(); 
    const params = { 
        TableName: 'users', 
        Key: { 
            id: user_id,
        }, 
    };
    try { 
        const data = await dynamoDB.get(params).promise(); 
        console.log(JSON.stringify(data.Item, null, 2)); 
        if (isEmptyObject(data.Item)) {
            return {
                user: {
                    first_name:"new",
                    last_name: "person"
                } 
            }
        }else{
            return data.Item; 
        }
    } catch (err) { 
        console.error('Error fetching data from DynamoDB', err); 
        return {
            user: {
                first_name:"unknown",
                last_name: "human"
            }    
        }; 
    }
};

function GetPatterns(){

};

export {GetProfile, GetPatterns};