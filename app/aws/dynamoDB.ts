import { PutItemCommand, PutItemCommandInput, GetItemCommand, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import dynamoDBClient from './aws-exports';
import { convertToAttributeValue, convertToCommonJSON} from './utils'
import { JSONItem, DynamoItem } from "./types";

async function GetItem(name: string, item_id: number | string) {
    const params = { 
        TableName: name, 
        Key: { 
            id: typeof item_id === "number" ? { N: item_id.toString() } : { S: item_id},
        }, 
    }; 
    try{
        const data = await dynamoDBClient.send(new GetItemCommand(params));
        if (data && data.Item){
            return convertToCommonJSON(data.Item); 
        }else{
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
            return data;  
        }else{
            return {};
        }
    }catch(error){
        console.error('[PutItem ERROR]', error);
        return {};
    };        
};

async function GetItemList(table_name: string, key_name: string ): Promise<(string | number)[]>{
    const expressionAttributeName = `#${key_name}`; 
    const params = { 
        TableName: table_name, 
        ProjectionExpression: expressionAttributeName, 
        ExpressionAttributeNames: { [expressionAttributeName]: key_name } 
    }; 
    try{
        const data = await dynamoDBClient.send(new ScanCommand(params));
        if (data) { 
            console.log('[GetItemList]', JSON.stringify(data, null, 2));    
            return data.Items?.map((item: DynamoItem): JSONItem => convertToCommonJSON(item)) 
                              .map((item: JSONItem) => item[key_name]) 
                              .filter(value => typeof value === 'string' || typeof value === 'number') as (string | number)[];
        }else{
            return [];
        }
    }catch(error){
        console.error('[GetItemList ERROR]', JSON.stringify(params, null, 2), error);
        return [];
    };        
};

export { GetItem, PutItem, GetItemList};