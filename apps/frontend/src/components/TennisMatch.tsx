import {PlayerForm} from './ui/PlayerForm';
import {useTennisMatch} from '../hooks/useTennisMatch';
import {ScoreTable} from './ui/ScoreTable';
import {PointsList} from './ui/PointsList';

export default function TennisMatch() {
    const {
        player1,
        player2,
        points,
        score,
        errors,
        setPlayer1,
        setPlayer2,
        generatePoints,
        calculateScore
    } = useTennisMatch();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="grid grid-cols-2 gap-8 mb-6">
                <PlayerForm
                    player={player1}
                    setPlayer={setPlayer1}
                    label="Joueur 1"
                    errors={errors.player1}
                />
                <PlayerForm
                    player={player2}
                    setPlayer={setPlayer2}
                    label="Joueur 2"
                    errors={errors.player2}
                />
            </div>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={generatePoints}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Générer les points
                </button>
                <button
                    onClick={calculateScore}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Calculer le score
                </button>
            </div>

            {points.length > 0 && <PointsList points={points}/>}
            {score && <ScoreTable score={score} player1={player1} player2={player2}/>}
        </div>
    );
}