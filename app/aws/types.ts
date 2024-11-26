interface AttributeValue { 
    S?: string; 
    N?: string; 
    BOOL?: boolean; 
    M?: { [key: string]: AttributeValue }; 
    L?: AttributeValue[];}
type DynamoDBItem = { [key: string]: AttributeValue }; 
type JSONItem = { [key: string]: any };

export type {AttributeValue, DynamoDBItem, JSONItem};