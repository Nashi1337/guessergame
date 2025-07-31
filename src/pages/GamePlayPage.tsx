import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GuessInput from '../components/GuessInput';
import GuessHistory from '../components/GuessHistory';
import { loadGameState, saveGameState } from '../utils/gameStorage';
import {Dialog, DialogTitle, DialogContent, Button, Typography, Stack, Box} from '@mui/material';
import {useGameContext} from "../context/GameContext.tsx";
import ScreenshotNav from "../components/ScreenshotNav.tsx";
import ScreenshotDisplay from "../components/ScreenshotDisplay.tsx";
import {FAKE_GAMES} from "../utils/fakeGames.ts";

const MAX_GUESSES = 6;

const GamePlayPage: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const {games, loading, error} = useGameContext();

    const realGames = games?.map(g => g.name);
    const guessOptions = realGames ? [...new Set([...realGames, ...FAKE_GAMES])].sort() : FAKE_GAMES;

    const parsedGameId = parseInt(gameId || '0');
    const game = games?.find(g => g.gameId === parsedGameId);

    const [guesses, setGuesses] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if(game) {
            const saved = loadGameState(game.gameId);
            if (saved) {
                setGuesses(saved.guesses);
                setIsComplete(saved.isComplete);
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

    const displayedHints = [
        game.hint1,
        game.hint2,
        game.hint3,
        game.hint4,
    ].slice(0,currentScreenshotIndex);

    const handleGuess = (guess: string) => {
        if (isComplete || guesses.length >= MAX_GUESSES) return;

        const updated = [...guesses, guess];
        const correct = guess.toLowerCase() === game.name.toLowerCase();
        const gameEnded = correct || updated.length === MAX_GUESSES;

        setGuesses(updated);
        setIsComplete(gameEnded);
        if(gameEnded)
            setShowResult(gameEnded);

        if(!correct)
            setCurrentScreenshotIndex(Math.min(updated.length,screenshots.length-1));
        saveGameState(game.gameId, { guesses: updated, isComplete: gameEnded });
        setInputValue('');
    };

    const isCorrect = guesses.some((g) => g.toLowerCase() === game.name.toLowerCase());

    const solvedAtIndex = guesses.findIndex(
        (g) => g.toLowerCase() === game.name.toLowerCase(),
    );

    return (
        <>
            <Typography align={"center"}>Game {gameId}</Typography>
            <Typography align={"center"}>Screenshot {Math.min(guesses.length+1,screenshots.length)}</Typography>
            {currentScreenshotIndex > 0 && (
                <Stack spacing={1} alignItems={"center"} sx={{mb:2}}>
                    {[game.hint1,game.hint2,game.hint3,game.hint4]
                        .slice(0,currentScreenshotIndex)
                        .map((hint,i) => (
                            <Typography
                                key={i}
                                variant={"body2"}
                                color={"text.secondary"}
                                align={"center"}
                            >
                                {hint}
                            </Typography>
                        ))}
                </Stack>
            )}
            <ScreenshotDisplay
                imageUrl={screenshots[currentScreenshotIndex]}
                guessNumber={currentScreenshotIndex}
                hintOverlay={
                    displayedHints.length > 0 ? (
                        <Box>
                            {displayedHints.map((hint,i) => (
                                <Typography key={i} variant={"body2"}>
                                    {hint}
                                </Typography>
                            ))}
                        </Box>
                    ) : null
                }
            />
            <ScreenshotNav
                total={screenshots.length}
                current={currentScreenshotIndex}
                unlocked={guesses.length}
                onSelect={setCurrentScreenshotIndex}
                solvedAtIndex={solvedAtIndex >= 0 ? solvedAtIndex: undefined}
            />
            {!isComplete && games &&
                <GuessInput
                    options={guessOptions}
                    onGuess={(guess) => {
                        handleGuess(guess);
                        setInputValue('');
                    }}
                    inputValue={inputValue}
                    onInputChange={(_, newValue) => setInputValue(newValue)}
                />
            }
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
