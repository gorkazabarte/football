import React from "react";

interface PlayerCardProps {
  name: string;
  number: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name, number }) => {
  return (
    <>
      {/* Full card for sm and up */}
      <div
        className="
          hidden sm:flex
          flex-col items-center
          bg-gray-800 text-white
          rounded-md shadow
          px-2 py-1
          w-20 sm:w-24
          text-[9px] sm:text-[10px]
        "
      >
        <div className="font-bold text-sm sm:text-base">#{number}</div>
        <div className="truncate text-center mt-0.5">{name}</div>
      </div>

      {/* Minimal version for smaller screens */}
      <div className="sm:hidden text-white text-[9px] text-center">
        {name}
      </div>
    </>
  );
};

export default PlayerCard;