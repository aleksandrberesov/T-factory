import { PutItemCommand, PutItemCommandInput, GetItemCommand } from "@aws-sdk/client-dynamodb";
import dynamoDBClient from './aws-exports';
import { convertToAttributeValue, convertToCommonJSON} from './utils'
import { JSONItem, DynamoItem } from './types'

async function GetItem(name: string, item_id: number) {
    const params = { 
        TableName: name, 
        Key: { 
            id: { N: item_id.toString() },
        }, 
    }; 
    try{
        //const command = new GetItemCommand(params);
        const data = await dynamoDBClient.send(new GetItemCommand(params));
        if (data && data.Item){
            console.log('data.Item: ',JSON.stringify(data.Item, null, 2)); 
            return convertToCommonJSON(data.Item); 
        }else{
            console.log('getItem', name, item_id , 'item not exist');
            return {};
        }
    }catch(error){
        console.error('[GetItem ERROR]', error);
        return {};
    };
};

async function PutItem(name:string, item: object) {
    const Item: PutItemCommandInput = { 
        TableName: name, 
        Item: convertToAttributeValue(item), 
    }; 
    try{
        const data = await dynamoDBClient.send(new PutItemCommand(Item));
        if (data){
            console.log("Item added:", JSON.stringify(Item, null, 2)); 
            return data;  
        }else{
            console.log('Item not added');
            return {};
        }
    }catch(error){
        console.error('[PutItem ERROR]', error);
        return {};
    };        
};

async function GetItemList(name: string) {
    
}

export { GetItem, PutItem, GetItemList};