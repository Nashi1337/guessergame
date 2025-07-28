import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Game {
    gameId: number;
    name: string;
    screenshot1: string;
    screenshot2: string;
    screenshot3: string;
    screenshot4: string;
    screenshot5: string;
    hint1: string;
    hint2: string;
    hint3: string;
    hint4: string;
}

interface GameContextType {
    games: Game[] | null;
    loading: boolean;
    error: string | null;
}

const GameContext = createContext<GameContextType>({
    games: null,
    loading: true,
    error: null,
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [games, setGames] = useState<Game[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(
                    'https://api.sheety.co/978b4feb013391a999eac193c7a19ef0/guesserGame/games'
                );
                const data = await response.json();
                const rawGames = data.games ?? [];

                const withIds: Game[] = rawGames.map((g: any) => ({
                    gameId: Number(g.gameId),
                    ...g,
                }));

                setGames(withIds);
            } catch (err) {
                console.error(err);
                setError('Failed to load games');
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    return (
        <GameContext.Provider value={{ games, loading, error }}>
            {children}
        </GameContext.Provider>
    );
};
