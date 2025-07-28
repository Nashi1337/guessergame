export interface GameData {
    name: string;
    images: string[]; // ordered from most pixelated to least
}

export const GAMES: GameData[] = [
    {
        name: "Hollow Knight",
        images: [
            "/images/hollow/1.png",
            "/images/hollow/2.png",
            "/images/hollow/3.png",
            "/images/hollow/4.png",
            "/images/hollow/5.png",
            "/images/hollow/6.png",
        ],
    },
    {
        name: "Celeste",
        images: [
            "/images/celeste/1.png",
            "/images/celeste/2.png",
            "/images/celeste/3.png",
            "/images/celeste/4.png",
            "/images/celeste/5.png",
            "/images/celeste/6.png",
        ],
    },
    {
        name: "Hades",
        images: [
            "/images/hades/1.png",
            "/images/hades/2.png",
            "/images/hades/3.png",
            "/images/hades/4.png",
            "/images/hades/5.png",
            "/images/hades/6.png",
        ],
    },
    {
        name: "Cuphead",
        images: [
            "/images/cuphead/1.png",
            "/images/cuphead/2.png",
            "/images/cuphead/3.png",
            "/images/cuphead/4.png",
            "/images/cuphead/5.png",
            "/images/cuphead/6.png",
        ],
    },
];
