import { ITrade, TMarketPoint } from "../models/types";
import { ISeriesApi, Time, UTCTimestamp } from "lightweight-charts";

type TSetUpdateSeries = (seriesRef: ISeriesApi<"Line", Time>) => void;

type TPoints = {value: number; time: UTCTimestamp}[];

type TChartViewProps = {   
    setUpdateSeries: TSetUpdateSeries; 
    initData?: TMarketPoint[],
};

export type {TChartViewProps, TPoints};