import { DynamoDBClient } from "@aws-sdk/client-dynamodb"; 

const region = process.env.NEXT_PUBLIC_AWS_REGION; 
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID; 
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY; 

const dynamoDBClient = new DynamoDBClient({
  region, 
  credentials: { 
    accessKeyId, 
    secretAccessKey, 
  }, 
}); 

export default dynamoDBClient;