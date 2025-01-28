import {Player, Point, Score} from '../types/tennis.types';

export const calculateTennisScore = async (
    player1: Player,
    player2: Player,
    points: Point[]
): Promise<Score> => {
    const response = await fetch('/tennis/calculate-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({player1: player1.name, player2: player2.name, points})
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Erreur serveur');
    }

    return response.json();
};