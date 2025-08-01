import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import GuessInput from '../components/GuessInput';
import GuessHistory from '../components/GuessHistory';
import { loadGameState, saveGameState } from '../utils/gameStorage';
import {Dialog, DialogTitle, DialogContent, Button, Typography, Box} from '@mui/material';
import {useGameContext} from "../context/GameContext.tsx";
import ScreenshotNav from "../components/ScreenshotNav.tsx";
import ScreenshotDisplay from "../components/ScreenshotDisplay.tsx";
import {FAKE_GAMES} from "../utils/fakeGames.ts";
import {getRandomUnplayedGame} from "../utils/randomGame.ts";

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

    const navigate = useNavigate();

    const handlePlayAnother = () => {
        if (!games) return;
        const nextGame = getRandomUnplayedGame(games);
        if(nextGame){
            navigate(`/game/${nextGame.gameId}`);
        }else{
            alert("No unplayed games left! :D");
        }
    }

    const screenshots = game ? [
        game.screenshot1,
        game.screenshot2,
        game.screenshot3,
        game.screenshot4,
        game.screenshot5,
    ] : [];
    
    useEffect(() => {
        if(game) {
            const saved = loadGameState(game.gameId);
            if (saved) {
                setGuesses(saved.guesses);
                setIsComplete(saved.isComplete);
                setCurrentScreenshotIndex(Math.min(saved.guesses.length, screenshots.length - 1));
            }
        }
    }, [game, screenshots.length]);

    if(loading) return <Typography>Loading...</Typography>;
    if(error) return <Typography>{error}</Typography>;
    if(!game) return <Typography>Game not found</Typography>;
    
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

    function normalizeMetacriticScore(raw: string): string {
        if (!raw) return "Metacritic Score: N/A";
        const str = raw.trim().toLowerCase();

        if (
            str === 'too old' ||
            str === 'not rated yet' ||
            str === '-' ||
            str === 'n/a'
        ) {
            return "Metacritic Score: N/A";
        }
        const cleaned = str.replace(/^metacritic score:\s*/i, '');
        const match = cleaned.match(/[\d.]+/);
        if (!match) return "Metacritic Score: N/A";
        const num = match[0];
        return `Metacritic Score: ${num}%`;
    }

    return (
        <>
            <Typography align={"center"}>Game {gameId}</Typography>
            <Typography align={"center"}>Screenshot {Math.min(guesses.length+1,screenshots.length)}</Typography>
            <ScreenshotDisplay
                imageUrl={screenshots[currentScreenshotIndex]}
                guessNumber={currentScreenshotIndex}
                hintOverlay={
                    displayedHints.length > 0 ? (
                        <Box>
                            <Typography variant={"body2"}>
                                {displayedHints.length == 1
                                    ? normalizeMetacriticScore(displayedHints[displayedHints.length-1])
                                    : displayedHints[displayedHints.length-1]}
                            </Typography>
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

            <Box display={"flex"} justifyContent={"center"} gap={2} mt={2}>
                <Button variant={"outlined"} onClick={() => navigate('/game/list')}>
                    Back to Game List
                </Button>
                <Button variant={"contained"} onClick={handlePlayAnother}>
                    Play Another Random Game
                </Button>
            </Box>

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
