import {z} from 'zod';
import {PlayerSchema, TennisMatchSchema} from '../schemas/tennis.schema';

export interface Player {
    name: string;
    level: number;
}

export interface Point {
    pointNumber: number;
    winner: string;
}

export interface Score {
    status: string;
    score: {
        sets: Array<{ player1: number, player2: number }>;
        currentGame: { player1: string, player2: string };
    };
}

export type PlayerSchemaType = z.infer<typeof PlayerSchema>;
export type TennisMatchSchemaType = z.infer<typeof TennisMatchSchema>;