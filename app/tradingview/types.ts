import { IChartApi, UTCTimestamp } from "lightweight-charts";

type TAssignChartProc = (chartAPI: IChartApi) => void;

type TChartPoint = {
    value: number; 
    time: UTCTimestamp
};

type TPoints = TChartPoint[];

type TChartViewProps = {   
    controller: IChartController;
};

interface IChartController {
    id: string;
};

export default IChartController;
export type {TChartViewProps, TPoints};