import { IChartApi, UTCTimestamp } from "lightweight-charts";

type TAssignChartProc = (chartAPI: IChartApi) => void;

type TChartPoint = {
    value: number; 
    time: UTCTimestamp
};

type TPoints = TChartPoint[];

type TChartViewProps = {   
    setChartApi : TAssignChartProc;
};

interface IChartController {
    assignChart: TAssignChartProc;
};

export default IChartController;
export type {TChartViewProps, TPoints};