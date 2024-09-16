import { ITrade } from "../models/types";
import { ISeriesApi, Time, SeriesDataItemTypeMap } from "lightweight-charts";

type TSetUpdateSeries = (seriesRef: ISeriesApi<"Line", Time>) => void;

type TChartViewProps = {   
    setUpdateSeries: TSetUpdateSeries; 
    initData?:  SeriesDataItemTypeMap;
};

export type {TChartViewProps};