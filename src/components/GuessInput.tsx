import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface GuessInputProps {
    options: string[];
    onGuess: (guess: string) => void;
}

const GuessInput: React.FC<GuessInputProps> = ({ options, onGuess }) => {
    return (
        <Autocomplete
            freeSolo
            options={options}
            onChange={(_e, value) => value && onGuess(value)}
            renderInput={(params) => <TextField {...params} label="Guess the game..." variant="outlined" />}
        />
    );
};

export default GuessInput;
