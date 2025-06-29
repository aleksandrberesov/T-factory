import { Text, Input, HStack } from "@chakra-ui/react";
import { TInputProps } from "./types";

const CustomInput: React.FC<TInputProps> = ( props ) => {
    return (
        <HStack align="center">
            <Text color={props.textColor}>{props.title || props.value}</Text> 
            <Input placeholder="Enter your email" />
        </HStack>
    );
};

export default CustomInput;