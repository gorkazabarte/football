import React from "react";

interface PlayerCardProps {
  name: string;
  position: string;
  number: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name, position, number }) => {
  return (
    <div className="bg-white text-black rounded-xl shadow-lg px-3 py-2 text-center text-sm w-24 z-40">
      <div className="font-bold">{name}</div>
      <div className="text-xs text-gray-600">{position}</div>
      <div className="text-lg font-semibold">#{number}</div>
    </div>
  );
};

export default PlayerCard;
