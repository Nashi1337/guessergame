import React, { useState } from 'react';
import {
    Button,
    Container,
    TextField,
    Typography,
    Alert, TableBody, TableRow, Table, TableCell,
} from '@mui/material';
import {useNavigate} from "react-router-dom";

const screenshotHints = [
    'URL to the first screenshot, preferably zoomed in, blurry or whatever',
    'URL to second screenshot, can already be a full screenshot but make it hard',
    'URL to third screenshot, can be easier',
    'URL to fourth screenshot, make it even more easier',
    'URL to fifth screenshot, can also be a gif or video'
]

const hintHints = [
    'Metacritic Score: X%',
    'Original Platform: X, Y, Z,...',
    'Genre: X, Y, Z,...',
    'Original Release: year',
    'Developer: X'
]

const SubmitGamePage: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        screenshots: Array(5).fill(''),
        hints: Array(4).fill(''),
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


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

    function handleReturn() {
        navigate('/');
    }

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
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom align={"center"}>
                Submit a Game
            </Typography>

            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{width:'60%', p:1}}>
                            <TextField
                                label="Game Name"
                                value={form.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                fullWidth
                                sx={{backgroundColor:'white'}}
                                variant="filled"
                            />
                        </TableCell>
                        <TableCell
                            sx={{
                                verticalAlign:'top',
                                backgroundColor: 'white',
                                p: 1
                            }}
                        >
                            <Typography>Game title exactly as it is in Wikipedia (e.g.), like "Assassin's Creed IV: Black Flag"</Typography>
                        </TableCell>
                    </TableRow>

                {form.screenshots.map((value, i) => (
                    <TableRow key={i}>
                        <TableCell sx={{width:'60%', p:1}}>
                            <TextField
                                key={i}
                                label={`Screenshot ${i + 1}`}
                                value={value}
                                onChange={(e) => handleChange('screenshots', e.target.value, i)}
                                fullWidth
                                sx={{backgroundColor:'white'}}
                                variant="filled"
                            />
                        </TableCell>
                        <TableCell
                            sx={{
                                verticalAlign:'top',
                                backgroundColor: 'white',
                                p: 1
                            }}
                        >
                            <Typography>{screenshotHints[i]}</Typography>
                        </TableCell>
                    </TableRow>
                ))}

                {form.hints.map((value, i) => (
                    <TableRow key={i}>
                        <TableCell sx={{width:'60%', p:1}}>
                            <TextField
                                key={i}
                                label={`Hint ${i + 1}`}
                                value={value}
                                onChange={(e) => handleChange('hints', e.target.value, i)}
                                fullWidth
                                sx={{backgroundColor:'white'}}
                                variant="filled"
                            />
                        </TableCell>
                        <TableCell
                            sx={{
                                verticalAlign:'top',
                                backgroundColor: 'white',
                                p: 1
                            }}
                        >
                            <Typography>{hintHints[i]}</Typography>
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow key={"buttons"}>
                    <TableCell sx={{backgroundColor:'transparent', p:2}}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </TableCell>
                    <TableCell align={"right"}>
                        <Button variant={"contained"} color={"error"} onClick={handleReturn}>
                            Return
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    {submitted && <Alert severity="success">Game submitted successfully!</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </TableRow>
                </TableBody>
            </Table>
        </Container>
    );
};

export default SubmitGamePage;
