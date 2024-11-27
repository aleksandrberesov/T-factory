import { JSONItem, DynamoItem } from "./types"; 
import { AttributeValue } from "@aws-sdk/client-dynamodb";

const convertToAttributeValue = (obj: object): Record<string, AttributeValue> => { 
    const attributeValueObj: Record<string, AttributeValue> = {}; 
    for (const [key, value] of Object.entries(obj)) { 
        if (typeof value === "string") { 
            attributeValueObj[key] = { S: value };
        } else if (typeof value === "number") { 
            attributeValueObj[key] = { N: value.toString() }; 
        } else if (typeof value === "boolean") { 
            attributeValueObj[key] = { BOOL: value }; 
        } else if (Array.isArray(value)) { 
            attributeValueObj[key] = { L: value.map(v => convertArrayItemToAttributeValue(v)) }; 
        } else if (typeof value === "object" && value !== null) { 
            attributeValueObj[key] = { M: convertToAttributeValue(value) }; 
        } 
    }    
    return attributeValueObj; 
};

const convertArrayItemToAttributeValue = (value: any): AttributeValue => { 
    if (typeof value === "string") { 
        return { S: value }; 
    } else if (typeof value === "number") { 
        return { N: value.toString() }; 
    } else if (typeof value === "boolean") { 
        return { BOOL: value }; 
    } else if (Array.isArray(value)) { return { 
        L: value.map(v => convertArrayItemToAttributeValue(v)) }; 
    } else if (typeof value === "object" && value !== null) { 
        return { M: convertToAttributeValue(value) }; 
    } 
    throw new Error("Unsupported attribute value type"); 
};

const convertToCommonJSON = (attributeValueObj: DynamoItem): JSONItem => { 
    const commonJSONObj: JSONItem = {}; 
    for (const [key, value] of Object.entries(attributeValueObj)) { 
        if (value.S !== undefined) { 
            commonJSONObj[key] = value.S; 
        } else if (value.N !== undefined) { 
            commonJSONObj[key] = Number(value.N); 
        } else if (value.BOOL !== undefined) { 
            commonJSONObj[key] = value.BOOL; 
        } else if (value.M !== undefined) { 
            commonJSONObj[key] = convertToCommonJSON(value.M); 
        } else if (value.L !== undefined) { 
            commonJSONObj[key] = value.L.map(item => convertToCommonJSON({ item })); 
        } 
    }
    return commonJSONObj;
};

export {convertToAttributeValue, convertToCommonJSON};