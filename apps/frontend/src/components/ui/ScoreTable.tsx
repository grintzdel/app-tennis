import {Player, Score} from '../../types/tennis.types';

interface ScoreTableProps {
    score: Score;
    player1: Player;
    player2: Player;
}

export const ScoreTable = ({score, player1, player2}: ScoreTableProps) => {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Score :</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b"></th>
                        {score.score.sets.map((_, index) => (
                            <th key={index} className="py-2 px-4 border-b">
                                Set {index + 1}
                            </th>
                        ))}
                        <th className="py-2 px-4 border-b">Jeu en cours</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b font-medium">
                            {player1.name}
                        </td>
                        {score.score.sets.map((set, index) => (
                            <td key={index} className="py-2 px-4 border-b text-center">
                                {set.player1}
                            </td>
                        ))}
                        <td className="py-2 px-4 border-b text-center">
                            {score.score.currentGame.player1}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-medium">
                            {player2.name}
                        </td>
                        {score.score.sets.map((set, index) => (
                            <td key={index} className="py-2 px-4 border-b text-center">
                                {set.player2}
                            </td>
                        ))}
                        <td className="py-2 px-4 border-b text-center">
                            {score.score.currentGame.player2}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-lg font-semibold text-gray-700">
                Statut : {score.status}
            </div>
        </div>
    );
};