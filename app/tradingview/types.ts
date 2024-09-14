import { ITrade } from "../models/types";
import { ISeriesApi, Time } from "lightweight-charts";

type TOnUpdatedData = (id: ISeriesApi<"Line", Time>) => void;

type TChartViewProps = {
    trade: ITrade;   
    ondataupdate: TOnUpdatedData; 
};

export type {TChartViewProps};