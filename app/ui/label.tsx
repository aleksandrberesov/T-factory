import { Text } from "@chakra-ui/react";
import { TLabelProps } from "./types";

const CustomLabel: React.FC<TLabelProps> = ( props ) => {
    return <Text color={props.textcolor}>{props.title || props.value}</Text> 
};

export default CustomLabel;