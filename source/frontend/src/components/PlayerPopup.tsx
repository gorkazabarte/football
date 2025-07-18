import React from "react";
import PlayerProfile from "./PlayerProfile";
import type { PlayerProfileProps } from "./PlayerProfile";

interface PlayerPopupProps {
  player: PlayerProfileProps;
  onClose: () => void;
}

const PlayerPopup: React.FC<PlayerPopupProps> = ({ player, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
      onClick={onClose}
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>

        {/* Player Profile */}
        <PlayerProfile {...player} />
      </div>
    </div>
  );
};

export default PlayerPopup;
