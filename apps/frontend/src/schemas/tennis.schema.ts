// Vérification des données envoyées par le formulaire (DTO côté front en gros) avec la librairie Zod
import {z} from 'zod';

export const PlayerSchema = z.object({
    name: z.string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
    level: z.number()
        .min(1, 'Le niveau doit être entre 1 et 10')
        .max(10, 'Le niveau doit être entre 1 et 10')
});

export const TennisMatchSchema = z.object({
    player1: PlayerSchema,
    player2: PlayerSchema
});

export type PlayerSchemaType = z.infer<typeof PlayerSchema>;
export type TennisMatchSchemaType = z.infer<typeof TennisMatchSchema>;