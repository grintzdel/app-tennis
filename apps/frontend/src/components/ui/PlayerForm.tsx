import {Player} from '../../types/tennis.types';

interface PlayerFormProps {
    player: Player;
    setPlayer: (player: Player) => void;
    label: string;
    errors?: string[];
}

export const PlayerForm = ({player, setPlayer, label, errors}: PlayerFormProps) => (
    <div>
        <h2 className="text-xl mb-3">{label}</h2>
        <input
            type="text"
            value={player.name}
            onChange={(e) => setPlayer({...player, name: e.target.value})}
            placeholder={`Nom du ${label.toLowerCase()}`}
            className={`w-full p-2 mb-2 border rounded ${errors ? 'border-red-500' : ''}`}
        />
        <input
            type="number"
            min="1"
            max="10"
            value={player.level}
            onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                    setPlayer({...player, level: value});
                }
            }}
            className={`w-full p-2 border rounded ${errors ? 'border-red-500' : ''}`}
        />
        {errors && (
            <div className="text-red-500 text-sm mt-1">
                {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                ))}
            </div>
        )}
    </div>
);