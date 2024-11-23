import AWS from 'aws-sdk'; 
import { awsConfig } from '../aws-exports';

async function GetProfile(user_id){
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
        return data.Item; 
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