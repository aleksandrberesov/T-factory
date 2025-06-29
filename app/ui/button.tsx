import { Button, Text } from "@chakra-ui/react";
import { TButtonProps } from "./types";

const CustomButton: React.FC<TButtonProps> = ( props ) => {
    return <Button bg={props.backgroundColor} borderRadius="xl" onClick={props.onClick} width="100%" height="100%"> 
                <Text color={props.textColor}>{props.title}</Text> 
           </Button>
};

export default CustomButton;