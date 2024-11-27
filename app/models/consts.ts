import { TProfile } from "./types";

const startFrame = 1;
const defaultUser : TProfile = {
    id : 0,
    user : {
        first_name: "default",
        last_name: "user"
    },
    lang : "en",
    status: "unknown",
    balance: 100000,
    position: "hamster",
    level: 80,
    statistics : [
        {title: "first stat item", isDone: true }, 
        {title: "second stat item", isDone: true}, 
        {title: "third stat item", isDone: false}
    ],
    cards : [
        {title: "first card", description: "some about first card"},
        {title: "second card", description: "some about second card"},
        {title: "third card", description: "some about second card"},
        {title: "fourth card", description: "some about second card"},
        {title: "fifth card", description: "some about second card"},
    ],
    stars : [
        {title: "first star"},
        {title: "second star"}
    ]
};

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

export { startFrame, defaultUser, defaultSpeeds, defaultAmounts };