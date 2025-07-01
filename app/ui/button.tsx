import { Button, Text } from "@chakra-ui/react";
import { TButtonProps } from "./types";

const CustomButton: React.FC<TButtonProps> = ( props ) => {
    function DoClick() {
        if (props.onClick) {
            props.onClick();
        } else if (props.onSelected && props.id) {
            props.onSelected(props.id);
        }   
    };
    return (
        <Button bg={props.backgroundColor} borderRadius="xl" onClick={DoClick} width="100%" height="100%"> 
            <Text color={props.textColor}>{props.title}</Text> 
        </Button>
    );
};

export default CustomButton;