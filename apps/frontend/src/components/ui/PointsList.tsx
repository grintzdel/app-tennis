import {Point} from '../../types/tennis.types';

interface PointsListProps {
    points: Point[];
}

export const PointsList = ({points}: PointsListProps) => {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Points générés :</h2>
            <div className="border border-gray-200 rounded-lg shadow-sm">
                <div className="h-[400px] overflow-y-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {points.map((point) => (
                            <div
                                key={point.pointNumber}
                                className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                            >
                                <span className="text-gray-600">🎾 Point {point.pointNumber} : </span>
                                <span className="font-medium">
                                    remporté par {point.winner}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-sm text-gray-500">
                    {points.length} points au total
                </div>
            </div>
        </div>
    );
};