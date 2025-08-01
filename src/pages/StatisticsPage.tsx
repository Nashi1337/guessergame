import {useGameContext} from "../context/GameContext.tsx";
import {Box, Button, Container, Divider, Stack, Typography} from "@mui/material";
import {loadGameState} from "../utils/gameStorage.ts";
import {useNavigate} from "react-router-dom";
import {clearGameState} from "../utils/clearGameState.ts";

export const StatisticsPage: React.FC = () => {
    const {games} = useGameContext();
    const navigate = useNavigate();

    const solvedStats: {
        solvedOnFirst: number;
        totalSolved: number;
        totalPlayed: number;
        guessCounts: number[];
    } = {
        solvedOnFirst: 0,
        totalSolved: 0,
        totalPlayed: 0,
        guessCounts: [],
    };

    return (
        <Container sx={{mt:4}}>
            <Typography variant="h4" gutterBottom>Your Stats</Typography>

            <Stack spacing={2}>
                {games?.map((game) => {
                    const state = loadGameState(game.gameId);
                    const solvedIndex = state ? state?.guesses.findIndex(
                        (g) => g.toLowerCase() === game.name.toLowerCase()
                    ) : -1;

                    if (!state){
                        return <Typography key={game.gameId}>Game {game.gameId}:Not yet played!</Typography>
                    }

                    const isSolved = state.isComplete && solvedIndex >= 0;
                    const guessBoxes = Array.from({ length: 5 }).map((_, i) => {
                        if (i >= state.guesses.length) return '⬜';
                        if (i === solvedIndex) return '🟩';
                        return '🟥';
                    });

                    solvedStats.totalPlayed += 1;
                    if(isSolved){
                        solvedStats.totalSolved +=1;
                        solvedStats.guessCounts.push(solvedIndex+1);
                        if ( solvedIndex === 0) solvedStats.solvedOnFirst += 1;
                    }

                    return (
                        <Box key={game.gameId}>
                            <Typography>
                                {isSolved
                                    ? `${game.name}: ${guessBoxes.join(' ')}`
                                    : `Game ${game.gameId}: Not yet solved!`}
                            </Typography>
                        </Box>
                    );
                })}
            </Stack>

            <Box mt={4}>
                <Typography variant="h5">Summary</Typography>
                <Typography>Solved on first guess: {solvedStats.solvedOnFirst}</Typography>
                <Typography>Total games played: {solvedStats.totalPlayed}</Typography>
                <Typography>Total games solved: {solvedStats.totalSolved}</Typography>

                {solvedStats.totalSolved > 0 && (
                    <>
                        <Typography>
                            Average guesses per solved game:{' '}
                            {(
                                solvedStats.guessCounts.reduce((a,b) => a+b,0) /
                                    solvedStats.guessCounts.length
                            ).toFixed(2)}
                        </Typography>
                        <Typography>
                            Most guesses before solving:{' '}
                            {Math.max(...solvedStats.guessCounts)} guess(es)
                        </Typography>
                    </>
                )}
            </Box>
            <Divider/>
            <Box mt={2}>
                <Button
                    variant={"outlined"}
                    color={"error"}
                    onClick={() => {
                        clearGameState();
                        navigate(0);
                    }}
                >
                    Reset your local Stats
                </Button>
            </Box>
        </Container>
    )
}