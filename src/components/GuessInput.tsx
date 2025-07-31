import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface GuessInputProps {
    options: string[];
    onGuess: (guess: string) => void;
    inputValue: string;
    onInputChange: (event: React.SyntheticEvent, value: string) => void;
}

const GuessInput: React.FC<GuessInputProps> = ({ options, onGuess, inputValue, onInputChange }) => {
    return (
        <Autocomplete
            freeSolo
            options={options}
            value={inputValue}
            onInputChange={onInputChange}
            onChange={(_e, value) => {if(value) onGuess(value)}}
            renderInput={(params) => <TextField {...params} label="Guess the game..." variant="outlined" />}
        />
    );
};

export default GuessInput;
