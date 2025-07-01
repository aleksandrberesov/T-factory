import { Grid, GridItem } from "@chakra-ui/react";
import { TGridProps } from "./types";

const CustomGrid: React.FC<TGridProps> = ( props ) => {
    const baseProps = {
        width: "100%",
        height: "100%",
        templateColumns: `repeat(${props.columns || 1}, 1fr)`,
        templateRows: `repeat(${props.rows || 1}, 1fr)`,
        gap: "4",
    };
    return (
        <Grid {...baseProps}> 
            {props.elements?.map((element, index) => (
                <GridItem
                    key={index}
                    width="100%"
                    height="100%"
                    rowSpan={element.rowSpan || 1} 
                    colSpan={element.columnSpan || 1}
                >
                    {element.element}
                </GridItem>)
            )}
        </Grid>
    );
};

export default CustomGrid;