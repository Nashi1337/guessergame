import React, { useState } from 'react';
import {
    Button,
    Container,
    TextField,
    Typography,
    Stack,
    Alert,
} from '@mui/material';

const SubmitGamePage: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        screenshots: Array(5).fill(''),
        hints: Array(4).fill(''),
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        field: 'name' | 'screenshots' | 'hints',
        value: string,
        index?: number
    ) => {
        if (field === 'name') {
            setForm((prev) => ({ ...prev, name: value }));
        } else if (index !== undefined) {
            setForm((prev) => ({
                ...prev,
                [field]: prev[field].map((v, i) => (i === index ? value : v)),
            }));
        }
    };

    const handleSubmit = async () => {
        const toSafeString = (s: string | undefined | null) => s ?? '';
        setSubmitted(false);
        setError(null);

        const body = {
            game: {
                name: toSafeString(form.name),
                screenshot1: toSafeString(form.screenshots[0]),
                screenshot2: toSafeString(form.screenshots[1]),
                screenshot3: toSafeString(form.screenshots[2]),
                screenshot4: toSafeString(form.screenshots[3]),
                screenshot5: toSafeString(form.screenshots[4]),
                hint1: toSafeString(form.hints[0]),
                hint2: toSafeString(form.hints[1]),
                hint3: toSafeString(form.hints[2]),
                hint4: toSafeString(form.hints[3]),
            },
        };

        try {
            fetch('https://api.sheety.co/978b4feb013391a999eac193c7a19ef0/guesserGame/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.errors) {
                        console.error('Sheety Error:', json.errors);
                    } else {
                        console.log('Success:', json.game);
                    }
                });
            setSubmitted(true);
            setForm({
                name:'',
                screenshots: Array(5).fill(''),
                hints:Array(4).fill(''),
            });
        } catch (err) {
            console.error(err);
            setError('Submission failed. Please try again later.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Submit a Game
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="Game Name"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    fullWidth
                />

                {form.screenshots.map((value, i) => (
                    <TextField
                        key={i}
                        label={`Screenshot ${i + 1}`}
                        value={value}
                        onChange={(e) => handleChange('screenshots', e.target.value, i)}
                        fullWidth
                    />
                ))}

                {form.hints.map((value, i) => (
                    <TextField
                        key={i}
                        label={`Hint ${i + 1}`}
                        value={value}
                        onChange={(e) => handleChange('hints', e.target.value, i)}
                        fullWidth
                    />
                ))}

                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>

                {submitted && <Alert severity="success">Game submitted successfully!</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
            </Stack>
        </Container>
    );
};

export default SubmitGamePage;
