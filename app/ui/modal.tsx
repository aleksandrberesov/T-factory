import { Box } from "@chakra-ui/react";
import { TModalProps } from "./types";

const CustomModal: React.FC<TModalProps> = ( props ) => {
    const baseProps = {
        width: "100%",
        height: "100%",
        bg: props.backgroundColor || "transparent",
    };
    return <Box {...baseProps}> 
            
           </Box>;
};

export default CustomModal;