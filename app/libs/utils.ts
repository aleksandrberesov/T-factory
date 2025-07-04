import { number } from "@telegram-apps/sdk";

const isEmptyObject = (obj: Record<string, unknown>): boolean => { 
    return Object.keys(obj).length === 0; 
};

function removeElementById(id: string, parentElement: HTMLElement = document.body): void { 
    if (id === '') { return; }
    const element = parentElement.querySelector(`#${id}`);
    if (!element) { return }
    element.parentElement?.removeChild(element); 
}

function GetNumberSign(num: number): string{
    if (num === 0) {
        return "";
    }
    return num > 0 ? "+" : "";
};

function NumberToSignedString(num: number): string {
    return GetNumberSign(num)+ num.toString();
};

function NumberToFormattedString(num: number): string {
    const absNum = Math.abs(num);
    let formattedNum: string;

    if (absNum >= 1_000_000) {
        formattedNum = (absNum / 1_000_000).toFixed(1) + "M";
    } else if (absNum >= 1_000) {
        formattedNum = (absNum / 1_000).toFixed(1) + "K";
    } else {
        formattedNum = absNum.toFixed(0);
    }

    return formattedNum;
};

function NumberToString(num: number | undefined): string {
    if (num === undefined || num === null) { return ""; }
    return GetNumberSign(num) + NumberToFormattedString(num);
};

const TimeToFormatString = (timestamp: number): string => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export { NumberToSignedString, NumberToFormattedString, NumberToString };
export { removeElementById };
export { TimeToFormatString };