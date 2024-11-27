import { AttributeValue } from "@aws-sdk/client-dynamodb";

type DynamoItem = Record<string, AttributeValue>;
type JSONItem = { [key: string]: any };

export type {DynamoItem, JSONItem};