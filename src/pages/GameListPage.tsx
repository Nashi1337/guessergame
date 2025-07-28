import React from 'react';
import { List, ListItemButton, ListItemText, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllProgress } from '../utils/gameStorage';
import { GAMES } from '../data/games'; // your game array

const GameListPage: React.FC = () => {
    const navigate = useNavigate();
    const progress = getAllProgress();

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Select a Game
            </Typography>
            <List>
                {GAMES.map((game, idx) => {
                    const solved = progress[idx]?.isComplete;
                    return (
                        <ListItemButton key={idx} onClick={() => navigate(`/game/${idx}`)}>
                            <ListItemText
                                primary={`Game #${idx + 1}`}
                                secondary={solved ? '✅ Solved' : '❌ Unsolved'}
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </Container>
    );
};

export default GameListPage;
