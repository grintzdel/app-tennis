import {useState} from 'react';
import {Player, Point, Score} from '../types/tennis.types';
import {calculateTennisScore} from '../services/tennisService';

export const useTennisMatch = () => {
    const [player1, setPlayer1] = useState<Player>({name: '', level: 5});
    const [player2, setPlayer2] = useState<Player>({name: '', level: 5});
    const [points, setPoints] = useState<Point[]>([]);
    const [score, setScore] = useState<Score | null>(null);
    const [errors, setErrors] = useState<{ player1?: string[], player2?: string[] }>({});

    const generatePoints = () => {
        if (!player1.name || !player2.name) {
            setErrors({
                player1: !player1.name ? ['Nom requis'] : undefined,
                player2: !player2.name ? ['Nom requis'] : undefined
            });
            return;
        }

        const newPoints: Point[] = [];
        for (let i = 1; i <= 150; i++) {
            const totalLevel = player1.level + player2.level;
            const randomNum = Math.random() * totalLevel;
            const winner = randomNum <= player1.level ? player1.name : player2.name;

            newPoints.push({pointNumber: i, winner});
        }
        setPoints(newPoints);
        setErrors({});
    };

    const calculateScore = async () => {
        if (points.length === 0) {
            setErrors({player1: ['Veuillez d\'abord générer des points']});
            return;
        }

        try {
            const result = await calculateTennisScore(player1, player2, points);
            setScore(result);
            setErrors({});
        } catch (error) {
            console.error('Erreur lors du calcul du score:', error);
            const message = error instanceof Error ? error.message : 'Erreur inconnue';
            setErrors({player1: [message]});
        }
    };

    return {
        player1,
        player2,
        points,
        score,
        errors,
        setPlayer1,
        setPlayer2,
        generatePoints,
        calculateScore
    };
};