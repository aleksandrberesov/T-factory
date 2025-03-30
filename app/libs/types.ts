type TVoidFunc = () => void;
type TOnClickFunction = () => void;
type TOnSelectedFunction = (id: number | string) => void;
type TNumberToStringFunc = (id: number) => string;
type TStringToStringFunc = (id: string) => string;
type TStringProc  = (lang: string) => void;
type TUpdateObjectProc = (upd: object) => void;

type TStringElement = {
    id: number;    
    element: string; 
};

export type { TOnClickFunction, TOnSelectedFunction, };
export type { TVoidFunc, TNumberToStringFunc, TStringToStringFunc, TStringProc };
export type { TStringElement };
export type { TUpdateObjectProc };