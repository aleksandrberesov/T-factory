import React from "react";
import { TTableBoxProps } from "./types";

function TableBox(tableprops: TTableBoxProps) {
    const listItems = tableprops.elements.map((item) =>
        <tr>  
        </tr><SelectedTab key={item.id} id={item.id} title={item.element} onselected={SelecItem} style={buttonstyle}/>
    );
    function Create(): React.JSX.Element {
    
    };
    function CreateRows(): React.JSX.Element {
        return(
          <div 
            className={liststyle}
            style = {{ width: `${width}px` }}
          >
            <p className=' text-gray-700 '>{menuprops.title}</p>
            <div className="py-1 flex flex-wrap">
              {listItems} 
            </div>
          </div>
        );
    };
    return (
        <table className='min-w-full min-h-fit w-full h-full'>
            <tbody>
                <tr>
                    <td><LabelBox title={tradeprops.getWord(15)}/*'Transactions'*//></td>
                    <td><LabelBox value={tradeprops.trader.statistics.count}/></td>
                    <td><LabelBox value={tradeprops.trader.statistics.count}/></td>
                    <td><LabelBox value={tradeprops.trader.statistics.count}/></td>
                </tr>
                <tr>
                    <td><LabelBox title={tradeprops.getWord(16)}/></td>
                    <td><LabelBox value={1}/></td>
                    <td><LabelBox value={1}/></td>
                    <td><LabelBox value={1}/></td>
                </tr>
                <tr>
                    <td><LabelBox title={tradeprops.getWord(17)+"/"+tradeprops.getWord(18)}/></td>
                    <td></td>
                    <td><LabelBox value={1}/></td>
                    <td><LabelBox value={1}/></td>
                </tr>    
            </tbody>                
        </table>
            );
}

export default TableBox;