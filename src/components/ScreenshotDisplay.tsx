import React from 'react';
import { Card, CardMedia } from '@mui/material';

interface ScreenshotDisplayProps {
    imageUrl: string;
    guessNumber: number;
}

const ScreenshotDisplay: React.FC<ScreenshotDisplayProps> = ({ imageUrl }) => {
    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', my: 2 }}>
            <CardMedia component="img" image={imageUrl} alt="Game Screenshot" />
        </Card>
    );
};

export default ScreenshotDisplay;
