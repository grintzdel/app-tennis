<?php

namespace App\Service;

class TennisScoreCalculator
{
    private const POINTS_TO_SCORE = [
        0 => '0',
        1 => '15',
        2 => '30',
        3 => '40'
    ];

    /**
     * Calcule le score d'un match de tennis en fonction des points donnés.
     *
     * @param array $points Tableau des points avec les gagnants de chaque point.
     * @return array Retourne le score actuel du match, y compris l'état, les sets et le jeu en cours.
     */
    public function calculateScore(array $points): array
    {
        $score = [
            'status' => 'En cours',
            'score' => [
                'sets' => [
                    ['player1' => 0, 'player2' => 0],
                    ['player1' => 0, 'player2' => 0],
                    ['player1' => 0, 'player2' => 0],
                    ['player1' => 0, 'player2' => 0],
                    ['player1' => 0, 'player2' => 0]
                ],
                'currentGame' => ['player1' => '0', 'player2' => '0']
            ]
        ];

        $currentGame = [
            'player1' => 0,
            'player2' => 0
        ];

        $currentSet = 0;
        $gamesInCurrentSet = [
            'player1' => 0,
            'player2' => 0
        ];

        foreach ($points as $point) {
            $winner = $point['winner'];
            $player = $winner === $point['player1'] ? 'player1' : 'player2';

            // Gérer le point dans le jeu actuel
            $currentGame[$player]++;

            // Vérifier si le jeu est gagné
            if ($this->isGameWon($currentGame)) {
                $gamesInCurrentSet[$player]++;
                $currentGame = ['player1' => 0, 'player2' => 0];

                // Vérifier si le set est gagné
                if ($this->isSetWon($gamesInCurrentSet)) {
                    $score['score']['sets'][$currentSet] = $gamesInCurrentSet;
                    $currentSet++;
                    $gamesInCurrentSet = ['player1' => 0, 'player2' => 0];

                    // Vérifier si le match est terminé
                    if ($this->isMatchWon($score['score']['sets'])) {
                        $score['status'] = 'Terminé - Vainqueur : ' . $winner;
                        $score['score']['currentGame'] = ['player1' => '-', 'player2' => '-'];
                        break;
                    }
                }
            }

            // Mettre à jour le score du jeu en cours seulement si le match n'est pas terminé
            if ($score['status'] === 'En cours') {
                $score['score']['currentGame'] = $this->formatGameScore($currentGame);
                $score['score']['sets'][$currentSet] = $gamesInCurrentSet;
            }
        }

        return $score;
    }


    /**
     * Vérifie si un joueur a gagné le jeu.
     *
     * Un joueur gagne le jeu s'il a au moins 4 points et au moins 2 points de plus que l'adversaire.
     *
     * @param array $game Tableau contenant les points des joueurs dans le jeu actuel.
     * @return bool Retourne true si un joueur a gagné le jeu, sinon false.
     */
    private function isGameWon(array $game): bool
    {
        if ($game['player1'] >= 4 && $game['player1'] >= $game['player2'] + 2) {
            return true;
        }
        if ($game['player2'] >= 4 && $game['player2'] >= $game['player1'] + 2) {
            return true;
        }
        return false;
    }


    /**
     * Vérifie si un joueur a gagné le set.
     *
     * Un joueur gagne le set s'il a au moins 6 jeux et au moins 2 jeux de plus que l'adversaire,
     * ou s'il a 7 jeux et l'adversaire en a 6.
     *
     * @param array $games Tableau contenant le nombre de jeux gagnés par chaque joueur dans le set actuel.
     * @return bool Retourne true si un joueur a gagné le set, sinon false.
     */
    private function isSetWon(array $games): bool
    {
        if (($games['player1'] >= 6 && $games['player1'] >= $games['player2'] + 2) ||
            ($games['player1'] === 7 && $games['player2'] === 6)) {
            return true;
        }
        if (($games['player2'] >= 6 && $games['player2'] >= $games['player1'] + 2) ||
            ($games['player2'] === 7 && $games['player1'] === 6)) {
            return true;
        }
        return false;
    }


    /**
     * Vérifie si le match est gagné par l'un des joueurs.
     *
     * Parcourt les sets et compte le nombre de sets gagnés par chaque joueur.
     * Un joueur gagne le match s'il remporte au moins 2 sets.
     *
     * @param array $sets Tableau des sets avec les scores des joueurs.
     * @return bool Retourne true si un joueur a gagné le match, sinon false.
     */
    private function isMatchWon(array $sets): bool
    {
        $player1Sets = 0;
        $player2Sets = 0;

        foreach ($sets as $set) {
            if ($set['player1'] > $set['player2']) {
                $player1Sets++;
            } elseif ($set['player2'] > $set['player1']) {
                $player2Sets++;
            }

            if ($player1Sets >= 2 || $player2Sets >= 2) {
                return true;
            }
        }

        return false;
    }


    /**
     * Formate le score du jeu actuel en fonction des points des joueurs.
     *
     * Si les deux joueurs ont au moins 3 points, gère les cas d'égalité (deuce) et d'avantage.
     * Sinon, convertit les points en scores de tennis standard (0, 15, 30, 40).
     *
     * @param array $game Tableau contenant les points des joueurs dans le jeu actuel.
     * @return array Retourne un tableau avec les scores formatés des joueurs.
     */
    private function formatGameScore(array $game): array
    {
        // Gestion avantage + deuce
        if ($game['player1'] >= 3 && $game['player2'] >= 3) {
            if ($game['player1'] === $game['player2']) {
                return ['player1' => '40', 'player2' => '40'];
            }
            if ($game['player1'] > $game['player2']) {
                return ['player1' => 'AV', 'player2' => '-'];
            }
            return ['player1' => '-', 'player2' => 'AV'];
        }

        return [
            'player1' => self::POINTS_TO_SCORE[$game['player1']] ?? '40',
            'player2' => self::POINTS_TO_SCORE[$game['player2']] ?? '40'
        ];
    }
}