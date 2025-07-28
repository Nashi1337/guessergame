import React from 'react';
import {Button, Container, Divider, Stack, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h3" align="center" gutterBottom>
                🎮 Guess the Game
            </Typography>

            <Stack spacing={2} mt={4}>
                <Button variant="contained" onClick={() => navigate(`/game/random`)}>
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
        </Container>
    );
};

export default HomePage;
