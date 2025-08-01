export interface StoredGameState {
    guesses: string[];
    isComplete: boolean;
}

const STORAGE_KEY = 'guessthegame-progress';

export function loadGameState(gameId: number): StoredGameState | null {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : {};
    return parsed[gameId] ?? null;
}

export function saveGameState(gameId: number, state: StoredGameState) {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : {};
    parsed[gameId] = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
}

export function getAllProgress(): Record<number, StoredGameState> {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
}

export function getPlayedGameIds(): number[] {
    const raw = localStorage.getItem('guessthegame-progress');
    if (!raw) return [];

    const all = JSON.parse(raw);
    return Object.keys(all).map((id) => parseInt(id,10));
}
