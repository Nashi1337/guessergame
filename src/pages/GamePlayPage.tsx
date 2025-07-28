import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScreenshotDisplay from '../components/ScreenshotDisplay';
import GuessInput from '../components/GuessInput';
import GuessHistory from '../components/GuessHistory';
import { GAMES } from '../data/games';
import { loadGameState, saveGameState } from '../utils/gameStorage';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

const MAX_GUESSES = 6;

const GamePlayPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const gameId = id === 'random' ? Math.floor(Math.random() * GAMES.length) : parseInt(id || '0');
    const game = GAMES[gameId];

    const [guesses, setGuesses] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const saved = loadGameState(gameId);
        if (saved) {
            setGuesses(saved.guesses);
            setIsComplete(saved.isComplete);
            setShowResult(saved.isComplete);
        }
    }, [gameId]);

    const handleGuess = (guess: string) => {
        if (isComplete || guesses.length >= MAX_GUESSES) return;

        const updated = [...guesses, guess];
        const correct = guess.toLowerCase() === game.name.toLowerCase();
        const gameEnded = correct || updated.length === MAX_GUESSES;

        setGuesses(updated);
        setIsComplete(gameEnded);
        setShowResult(gameEnded);

        saveGameState(gameId, { guesses: updated, isComplete: gameEnded });
    };

    const currentImage = game.images[guesses.length] ?? game.images[game.images.length - 1];
    const isCorrect = guesses.some((g) => g.toLowerCase() === game.name.toLowerCase());

    return (
        <>
            <ScreenshotDisplay imageUrl={currentImage} guessNumber={guesses.length} />
            {!isComplete && <GuessInput options={GAMES.map(g => g.name)} onGuess={handleGuess} />}
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
