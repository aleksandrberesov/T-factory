const startFrame = 1;

const defaultSpeeds = [
    {id: 0, element: "0.1x"},
    {id: 1, element: "0.25x"},
    {id: 2, element: "0.5x"},
    {id: 3, element: "1x"},
    {id: 4, element: "2x"},
    {id: 5, element: "3x"},
    {id: 6, element: "4x"},
    {id: 7, element: "10x"},
];

const defaultAmounts = [
    {id: 0, element: "1000"},
    {id: 1, element: "100"},
    {id: 2, element: "10"},
];

const stepTime = 24 * 60 * 60;
const currencySymbol = '¤';

export { stepTime, startFrame, defaultSpeeds, defaultAmounts, currencySymbol };