import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GuessInput from '../components/GuessInput';
import GuessHistory from '../components/GuessHistory';
import { loadGameState, saveGameState } from '../utils/gameStorage';
import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';
import {useGameContext} from "../context/GameContext.tsx";
import ScreenshotNav from "../components/ScreenshotNav.tsx";
import ScreenshotDisplay from "../components/ScreenshotDisplay.tsx";

const MAX_GUESSES = 6;

const GamePlayPage: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const {games, loading, error} = useGameContext();

    const parsedGameId = parseInt(gameId || '0');
    const game = games?.find(g => g.gameId === parsedGameId);

    const [guesses, setGuesses] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

    useEffect(() => {
        if(game) {
            const saved = loadGameState(game.gameId);
            if (saved) {
                setGuesses(saved.guesses);
                setIsComplete(saved.isComplete);
                setShowResult(saved.isComplete);
                setCurrentScreenshotIndex(Math.min(saved.guesses.length, screenshots.length - 1));
            }
        }
    }, [game]);

    if(loading) return <Typography>Loading...</Typography>;
    if(error) return <Typography>{error}</Typography>;
    if(!game) return <Typography>Game not found</Typography>;

    const screenshots = [
        game.screenshot1,
        game.screenshot2,
        game.screenshot3,
        game.screenshot4,
        game.screenshot5,
    ];

    const handleGuess = (guess: string) => {
        if (isComplete || guesses.length >= MAX_GUESSES) return;

        const updated = [...guesses, guess];
        const correct = guess.toLowerCase() === game.name.toLowerCase();
        const gameEnded = correct || updated.length === MAX_GUESSES;

        setGuesses(updated);
        setIsComplete(gameEnded);
        setShowResult(gameEnded);

        setCurrentScreenshotIndex(Math.min(updated.length,screenshots.length-1));
        saveGameState(game.gameId, { guesses: updated, isComplete: gameEnded });
    };

    const isCorrect = guesses.some((g) => g.toLowerCase() === game.name.toLowerCase());
    
    return (
        <>
            <Typography align={"center"}>Game {gameId}</Typography>
            <Typography align={"center"}>Screenshot {Math.min(guesses.length+1,screenshots.length)}</Typography>
            <ScreenshotDisplay
                imageUrl={screenshots[currentScreenshotIndex]}
                guessNumber={currentScreenshotIndex}
            />
            <ScreenshotNav
                total={screenshots.length}
                current={currentScreenshotIndex}
                unlocked={guesses.length}
                onSelect={setCurrentScreenshotIndex}
            />
            {!isComplete && games && <GuessInput options={games.map(g => g.name)} onGuess={handleGuess} />}
            <GuessHistory guesses={guesses} correctAnswer={game.name} />

            <Dialog open={showResult}>
                <DialogTitle>{isCorrect ? "🎉 You got it!" : "❌ Out of guesses!"}</DialogTitle>
                <DialogContent>
                    The answer was: <strong>{game.name}</strong>
                    <br />
                    <Button onClick={() => setShowResult(false)} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GamePlayPage;
