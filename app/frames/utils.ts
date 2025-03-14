function NumberToSignedString(num: number) {
    if (num === 0) {
        return num.toString();
    }
    return (num > 0 ? "+" : "-") + num.toString();
}

export { NumberToSignedString };