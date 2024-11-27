import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import dynamoDBClient from './aws-exports';
import { GetItem } from './dynamoDB'

async function GetPatterns() {
        
}

async function GetProfile(user_id){
    const params = { 
        TableName: 'users', 
        Key: { 
            id: { N: user_id.toString() },
        }, 
    };
    console.log('params: ',JSON.stringify(params, null, 2)); 
    try { 
        const command = new GetItemCommand(params); 
        const data = await dynamoDBClient.send(command);
        if (data && data.Item){
            console.log('data.Item: ',JSON.stringify(data.Item, null, 2)); 
            return data.Item; 
        }else{
            const newItem = { 
                TableName: 'users', 
                Item: {
                    id: { N: user_id.toString() },
                    user: {
                        M: {
                            first_name: { S: "new" },
                            last_name: { S: "person" },
                        }
                    } ,
                    balance: { N: "99999" },
                }, 
            };
            console.log('new item: ',JSON.stringify(newItem, null, 2)); 
    
            try { 
                const putCommand = new PutItemCommand(newItem); 
                const putData = await dynamoDBClient.send(putCommand); 
                console.log("Item added:", putData); 
                return putData; 
            }catch (error) { 
                console.error("[Error adding item]", error); 
                throw error; 
            }
        }
    } catch (err) { 
        console.error('[Error fetching data from DynamoDB]', err); 
        return {
            user: {
                first_name:"unknown",
                last_name: "human"
            }    
        }; 
    }
};

export {GetProfile, GetPatterns};