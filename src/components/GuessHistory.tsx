import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface GuessHistoryProps {
    guesses: string[];
    correctAnswer: string;
}

const GuessHistory: React.FC<GuessHistoryProps> = ({ guesses, correctAnswer }) => {
    return (
        <List dense>
            {guesses.map((guess, index) => (
                <ListItem key={index}>
                    <ListItemText
                        primary={index+1+". "+guess}
                        primaryTypographyProps={{
                            color: guess.toLowerCase() === correctAnswer.toLowerCase() ? 'green' : 'inherit',
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default GuessHistory;
