const isEmptyObject = (obj: Record<string, unknown>): boolean => { 
    return Object.keys(obj).length === 0; 
};

// Convert to AttributeValue format const convertToAttributeValue = (obj) => { const attributeValueObj = {}; for (const [key, value] of Object.entries(obj)) { if (typeof value === "string") { attributeValueObj[key] = { S: value }; } else if (typeof value === "number") { attributeValueObj[key] = { N: value.toString() }; } else if (typeof value === "boolean") { attributeValueObj[key] = { BOOL: value }; } } return attributeValueObj;