function GetNumberSign(num: number): string{
    if (num === 0) {
        return "";
    }
    return num > 0 ? "+" : "";
};

function NumberToSignedString(num: number): string {
    return GetNumberSign(num)+ num.toString();
}

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
}

function NumberToString(num: number): string {
    return GetNumberSign(num) + NumberToFormattedString(num);
}

export { NumberToSignedString, NumberToFormattedString, NumberToString };