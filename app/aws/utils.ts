import { JSONItem, DynamoDBItem } from "./types"; 

const convertToAttributeValue = (obj: JSONItem): DynamoDBItem => { 
    const attributeValueObj: DynamoDBItem = {}; 
    for (const [key, value] of Object.entries(obj)) { 
        if (typeof value === "string") { 
            attributeValueObj[key] = { S: value };
        } else if (typeof value === "number") { 
            attributeValueObj[key] = { N: value.toString() }; 
        } else if (typeof value === "boolean") { 
            attributeValueObj[key] = { BOOL: value }; 
        } else if (Array.isArray(value)) { 
            attributeValueObj[key] = { L: value.map(convertToAttributeValue) }; 
        } else if (typeof value === "object" && value !== null) { 
            attributeValueObj[key] = { M: convertToAttributeValue(value) }; 
        } 
    }    
    return attributeValueObj; 
};

const convertToCommonJSON = (attributeValueObj: DynamoDBItem): JSONItem => { 
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