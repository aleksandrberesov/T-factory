import { Stack, HStack, Box, Text } from "@chakra-ui/react";
import { TListProps } from "./types";

const CustomList: React.FC<TListProps> = ( props ) => {
    const baseProps = {
        width: "100%",
        height: "100%",
        overflowY :"auto",
        padding : 4,
        gap: "4",
    };
    return (
        <Box height="100vh" border="1px solid" borderColor="gray.300">
            <Stack {...baseProps}> 
                {props.elements?.map((element, index) => (
                    <Box
                        key={index}
                        p={4}
                        bg="teal.100"
                        borderRadius="md"
                        boxShadow="sm"
                    >
                        {element}
                    </Box>))}
            </Stack>    
        </Box>
    );
};

const ScrollableStack: React.FC<TListProps> = ( props ) => {
    return (
      <Box height="100vh" border="1px solid" borderColor="gray.300">
        <Stack
          overflowY="auto"
          height="100%"
          padding={4}
        >
          {props.elements?.map((element, index) => (
            <Box
              key={index}
              p={4}
              bg="teal.100"
              borderRadius="md"
              boxShadow="sm"
            >
              {element}
            </Box>
          ))}
        </Stack>
      </Box>
    );
  }

export default CustomList;
export { ScrollableStack };