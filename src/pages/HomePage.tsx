import React, {useState} from 'react';
import {Alert, Button, Container, Divider, Stack, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {getRandomUnplayedGame} from "../utils/randomGame.ts";
import {useGameContext} from "../context/GameContext.tsx";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const {games} = useGameContext();
    const [showError, setShowError] = useState(false);

    const handlePlayRandomGame = () => {
        if(games && games.length > 0){
            navigate(`/game/${getRandomUnplayedGame(games)?.gameId}`)
        }else{
            setShowError(true);
        }
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h3" align="center" gutterBottom>
                🎮 Guess the Game
            </Typography>

            <Stack spacing={2} mt={4}>
                <Button variant="contained" onClick={handlePlayRandomGame}>
                    Play Random Game
                </Button>
                <Button variant="outlined" onClick={() => navigate(`/game/list`)}>
                    Choose from All Games
                </Button>
            </Stack>
            <Divider />
            <Stack>
                <Button variant={"text"} onClick={() => navigate("/submit")}>
                    Submit a Game
                </Button>
            </Stack>
            {showError && (
                <Alert severity="error">Somehow, no games were found</Alert>
            )}
        </Container>
    );
};

export default HomePage;
