import {Box} from "@mui/material";

interface Props {
    guesses: string[] | null;
    isComplete: boolean;
    correctAnswer: string;
}

export const GameResultBar: React.FC<Props> = ({guesses, isComplete, correctAnswer}) => {
    const boxes = Array.from({length:5}).map((_, i) => {
        if(!isComplete){
            return 'gray';
        }

        if(!guesses) return 'gray';

        if(i >= guesses.length) return 'gray';

        const guess = guesses[i];
        if(guess.toLowerCase() === correctAnswer.toLowerCase()) return 'green';
        return 'red';
    });

    return (
        <Box display={"flex"} gap={0.5} mt={0.5}>
            {boxes.map((color,i) =>(
                <Box
                    key={i}
                    sx={{
                        width:12,
                        height:12,
                        bgcolor: color,
                        borderRadius: 0.5,
                    }}
                />
            ))}
        </Box>
    )
}