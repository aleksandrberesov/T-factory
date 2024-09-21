import { DeepPartial, ChartOptions, ColorType, CandlestickSeriesPartialOptions, LineSeriesPartialOptions } from 'lightweight-charts';

const candleStickStyle : CandlestickSeriesPartialOptions = {
    upColor: '#26a69a', 
    downColor: '#ef5350', 
    borderVisible: false, 
    wickUpColor: '#26a69a', 
    wickDownColor: '#ef5350'
}

const chartStyle : DeepPartial<ChartOptions>  = { 
    layout: { 
        textColor: 'white', 
        background: { 
            type: ColorType.Solid , 
            color: 'black' 
        } 
    } 
};

const lineStyle : LineSeriesPartialOptions = {
    color : '#2962FF',
};

export { candleStickStyle, chartStyle, lineStyle };