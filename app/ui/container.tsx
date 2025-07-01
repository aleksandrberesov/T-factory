import { Box } from "@chakra-ui/react";
import { TLayoutProps } from "./types";

const CustomBox: React.FC<TLayoutProps> = ( props ) => {
    const baseProps = {
        width: "100%",
        height: "100%",
        bg: props.backgroundColor || "transparent",
    };
    return (
        <Box {...baseProps}>
            {props.children}
        </Box>
    );
};

export default CustomBox;