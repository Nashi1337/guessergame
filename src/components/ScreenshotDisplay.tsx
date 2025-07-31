import React from 'react';
import {Box, Card, CardMedia} from '@mui/material';

interface ScreenshotDisplayProps {
    imageUrl: string;
    guessNumber: number;
    hintOverlay?: React.ReactNode;
}

const ScreenshotDisplay: React.FC<ScreenshotDisplayProps> = ({ imageUrl, hintOverlay }) => {

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
            {hintOverlay && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        color:'white',
                        px:2,
                        py:1,
                        zIndex:1,
                       borderBottomRightRadius: 4,
                    }}
                >
                    {hintOverlay}
                </Box>
            )}
            <CardMedia component="img" image={normalizedUrl} alt="Game Screenshot" />
        </Card>
    );
};

export default ScreenshotDisplay;
