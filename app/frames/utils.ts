function SpeedTitleToNumber(str: string) {
    return Number(str.replace("x", ''));
}

function NumberToSignedString(num: number) {
    if (num === 0) {
        return num.toString();
    }
    return (num > 0 ? "+" : "-") + num.toString();
}

export { SpeedTitleToNumber, NumberToSignedString };