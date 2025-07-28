import React, { useState } from 'react';
import ScreenshotDisplay from '../components/ScreenshotDisplay';
import GuessInput from '../components/GuessInput';
import GuessHistory from '../components/GuessHistory';

const mockGame = {
    name: "Hollow Knight",
    images: [
        "/images/hollow1.png",
        "/images/hollow2.png",
        "/images/hollow3.png",
        "/images/hollow4.png",
        "/images/hollow5.png",
        "/images/hollow6.png",
    ],
};

const GamePage: React.FC = () => {
    const [guesses, setGuesses] = useState<string[]>([]);
    const [step, setStep] = useState(0);

    const handleGuess = (guess: string) => {
        setGuesses((prev) => [...prev, guess]);
        if (step < mockGame.images.length - 1) {
            setStep(step + 1);
        }
    };

    return (
        <>
            <ScreenshotDisplay imageUrl={mockGame.images[step]} guessNumber={step} />
            <GuessInput options={[mockGame.name, "Celeste", "Hades", "Cuphead"]} onGuess={handleGuess} />
            <GuessHistory guesses={guesses} correctAnswer={mockGame.name} />
        </>
    );
};

export default GamePage;
