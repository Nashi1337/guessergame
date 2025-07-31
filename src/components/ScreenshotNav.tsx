import React from 'react';
import { Button, Stack } from '@mui/material';

interface ScreenshotNavProps {
    total: number;
    current: number;
    unlocked: number;
    onSelect: (index:number) => void;
    solvedAtIndex?: number;
}

const ScreenshotNav: React.FC<ScreenshotNavProps> = ({ total, current, unlocked, onSelect, solvedAtIndex }) => {
    const isSolved = typeof solvedAtIndex === 'number';

    return (
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
            {Array.from({ length: total }).map((_, index) => {
                const isSolvedIndex = index === solvedAtIndex;

                let color: 'secondary' | 'error' | 'success' = 'secondary';
                if(isSolvedIndex) color='success';
                else if(index < unlocked) color = 'error';

                const isEnabled = isSolved || index <= unlocked;

                return (
                    <Button
                        key={index}
                        variant={'contained'}
                        color={color}
                        disabled={!isEnabled}
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
