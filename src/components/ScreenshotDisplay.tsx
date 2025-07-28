import React from 'react';
import { Card, CardMedia } from '@mui/material';

interface ScreenshotDisplayProps {
    imageUrl: string;
    guessNumber: number;
}

const ScreenshotDisplay: React.FC<ScreenshotDisplayProps> = ({ imageUrl }) => {

    function normalizeImageUrl(url: string): string {
        if (url.match(/\.(png|jpg|jpeg|webp|gif)$/i)) return url;

        const ibbMatch = url.match(/^https:\/\/ibb\.co\/([a-zA-Z0-9]+)/);
        if (ibbMatch) {
            const id = ibbMatch[1];
            return `https://i.ibb.co/${id}/image.png`;
        }
        return url;
    }

    const normalizedUrl = normalizeImageUrl(imageUrl);

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', my: 2 }}>
            <CardMedia component="img" image={normalizedUrl} alt="Game Screenshot" />
        </Card>
    );
};

export default ScreenshotDisplay;
