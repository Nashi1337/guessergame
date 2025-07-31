import React from 'react';
import { List, ListItemButton, ListItemText, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useGameContext} from "../context/GameContext.tsx";
import {loadGameState} from "../utils/gameStorage.ts";
import {GameResultBar} from "../components/GameResultBar.tsx";

const GameListPage: React.FC = () => {
    const {games, loading, error} = useGameContext();
    const navigate = useNavigate();

    if(loading) return <Typography>Loading...</Typography>;
    if(error) return <Typography>{error}</Typography>;
    if(!games) return <Typography>Games not found</Typography>;

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Select a Game
            </Typography>
            <List>
                {games.map((game) => {
                    const state = loadGameState(game.gameId);
                    return (
                        <ListItemButton key={game.gameId} onClick={() => navigate(`/game/${game.gameId}`)}>
                            <ListItemText
                                primary={`Game #${game.gameId}`}
                                secondary={
                                    <GameResultBar
                                        guesses={state?.guesses ?? null}
                                        isComplete={state?.isComplete ?? false}
                                        correctAnswer={game.name}
                                    />
                                }
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </Container>
    );
};

export default GameListPage;
