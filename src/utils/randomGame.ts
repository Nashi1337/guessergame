import type {Game} from "../context/GameContext.tsx";
import {getPlayedGameIds} from "./gameStorage.ts";

export function getRandomUnplayedGame(games: Game[]):Game | null {
    const playedIds = getPlayedGameIds();
    const unplayed = games.filter((g) => !playedIds.includes(g.gameId));

    if(unplayed.length === 0) return null;

    const index = Math.floor(Math.random() * unplayed.length);
    return unplayed[index];
}