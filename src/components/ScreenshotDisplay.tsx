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

    function extractYouTubeId(url: string): string | null {
        const match = url.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        return match ? match[1] : null;
    }

    const isYoutube = imageUrl.includes('youtube.com') || imageUrl.includes('youtu.be');
    const youtubeId = extractYouTubeId(imageUrl);
    const type = imageUrl.match(/\.(mp4)$/i) ? "video" : "img";
    const normalizedUrl = normalizeImageUrl(imageUrl);

    console.log(normalizedUrl);

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', my: 2, position:'relative',overflow:'auto' }}>
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
            {isYoutube && youtubeId ? (
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: 0,
                        }}
                    />
                </Box>
            ) : (
                <CardMedia
                    component={type}
                    autoPlay
                    image={normalizedUrl}
                    alt="Game Screenshot"
                    sx={{
                        display:'block', width:'100%', height:'auto'
                    }}
                />
            )}
        </Card>
    );
};

export default ScreenshotDisplay;
