import React from "react";

interface PlayerStats {
  games?: number;
  touchdowns?: number;
  yards?: number;
  tackles?: number;
  interceptions?: number;
}

export interface PlayerProfileProps {
  name: string;
  number?: number;
  position?: string;
  height?: string;
  weight?: string;
  year?: string;
  hometown?: string;
  stats?: PlayerStats;
  imageUrl?: string;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({
  name,
  number,
  position,
  height,
  weight,
  year,
  hometown,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-lg p-6 max-w-md w-full mx-auto">
      {/* Player header */}
      <div className="flex items-center space-x-4">
        <img
          src="https://dev-fia7-frontend.s3.us-west-2.amazonaws.com/pictures/player.png"
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            #{number} • {position}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {height}, {weight} • {year}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Hometown: {hometown}
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-300 dark:border-gray-700" />
    </div>
  );
};

export default PlayerProfile;
