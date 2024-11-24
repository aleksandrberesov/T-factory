import AWS from 'aws-sdk'; 
//import { awsConfig } from '.../aws-exports';

async function GetProfile(user_id){
    console.log('Region:', process.env.REACT_APP_AWS_REGION); 
    console.log('Access Key:', process.env.REACT_APP_AWS_ACCESS_KEY_ID); 
    console.log('Secret Access Key:', process.env.REACT_APP_AWS_SECRET_ACCESS_KEY);
    const awsConfig = {
        region: process.env.REACT_APP_AWS_REGION, 
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    };
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