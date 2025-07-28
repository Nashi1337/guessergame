import React from 'react';
import { Button, Stack } from '@mui/material';

interface ScreenshotNavProps {
    total: number;
    current: number;
    unlocked: number;
    onSelect: (index:number) => void;
}

const ScreenshotNav: React.FC<ScreenshotNavProps> = ({ total, current, unlocked, onSelect }) => {
    return (
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
            {Array.from({ length: total }).map((_, index) => {
                const isActive = index === current;
                const isUnlocked = index <= unlocked;

                return (
                    <Button
                        key={index}
                        variant={isActive ? 'contained' : 'outlined'}
                        color={index < unlocked ? 'error' : 'primary'}
                        disabled={!isUnlocked}
                        onClick={() => onSelect(index)}
                    >
                        {index + 1}
                    </Button>
                );
            })}
        </Stack>
    );
};

export default ScreenshotNav;
