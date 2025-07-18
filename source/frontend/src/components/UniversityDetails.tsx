import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import PlayerProfile from "./PlayerProfile";

const UniversityDetails = () => {
  const universityName = "Gridiron State University";

  const players = [
    {
      name: "Alex Gray",
      number: 7,
      left: "45%",
      top: "20%",
      position: "QB",
      height: "6'2\"",
      weight: "215 lbs",
      year: "Senior",
      hometown: "Dallas, TX",
      stats: { games: 12, touchdowns: 28, yards: 3400, interceptions: 4 },
    },
    {
      name: "Jayden Smith",
      number: 11,
      left: "30%",
      top: "30%",
      position: "WR",
      height: "6'0\"",
      weight: "190 lbs",
      year: "Junior",
      hometown: "Austin, TX",
      stats: { games: 11, touchdowns: 12, yards: 1100 },
    },
    {
      name: "Ty Moore",
      number: 10,
      left: "60%",
      top: "30%",
      position: "RB",
      height: "5'11\"",
      weight: "205 lbs",
      year: "Sophomore",
      hometown: "Houston, TX",
      stats: { games: 10, touchdowns: 9, yards: 850 },
    },
    {
      name: "Marcus Hill",
      number: 22,
      left: "37%",
      top: "45%",
      position: "LB",
      height: "6'1\"",
      weight: "225 lbs",
      year: "Senior",
      hometown: "San Antonio, TX",
      stats: { games: 12, tackles: 98, sacks: 5 },
    },
    {
      name: "Derek Young",
      number: 25,
      left: "52%",
      top: "45%",
      position: "CB",
      height: "5'10\"",
      weight: "185 lbs",
      year: "Junior",
      hometown: "El Paso, TX",
      stats: { games: 12, interceptions: 3, tackles: 35 },
    },
    {
      name: "Samuel James",
      number: 55,
      left: "30%",
      top: "60%",
      position: "DL",
      height: "6'3\"",
      weight: "280 lbs",
      year: "Senior",
      hometown: "Lubbock, TX",
      stats: { games: 12, sacks: 6 },
    },
    {
      name: "Brandon Lee",
      number: 66,
      left: "40%",
      top: "70%",
      position: "OL",
      height: "6'4\"",
      weight: "310 lbs",
      year: "Junior",
      hometown: "Plano, TX",
      stats: {},
    },
    {
      name: "Kevin White",
      number: 73,
      left: "50%",
      top: "80%",
      position: "OL",
      height: "6'5\"",
      weight: "320 lbs",
      year: "Senior",
      hometown: "Waco, TX",
      stats: {},
    },
    {
      name: "Lucas Brown",
      number: 74,
      left: "60%",
      top: "55%",
      position: "OL",
      height: "6'3\"",
      weight: "305 lbs",
      year: "Sophomore",
      hometown: "Frisco, TX",
      stats: {},
    },
    {
      name: "Ryan Clark",
      number: 70,
      left: "70%",
      top: "65%",
      position: "OL",
      height: "6'2\"",
      weight: "295 lbs",
      year: "Junior",
      hometown: "Irving, TX",
      stats: {},
    },
    {
      name: "Ethan Scott",
      number: 88,
      left: "80%",
      top: "75%",
      position: "TE",
      height: "6'4\"",
      weight: "250 lbs",
      year: "Senior",
      hometown: "Garland, TX",
      stats: { games: 12, touchdowns: 6, yards: 500 },
    },
  ];

  const [selectedPlayer, setSelectedPlayer] = useState<typeof players[0] | null>(null);

  const yards = [0, 10, 20, 30, 40, 50, 40, 30, 20, 10, 0];

  return (
    <div className="w-full min-h-screen px-2 sm:px-6 bg-white dark:bg-gray-900">
      <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white text-center leading-tight mt-6">
        University Football Roster
      </h1>

      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-300 text-center mt-1">
        {universityName}
      </h2>

      {/* Football Pitch */}
      <div
        className="relative mx-auto mt-4 w-full max-w-[900px] sm:w-[90%] rounded-xl border-4 border-white overflow-hidden shadow-2xl"
        style={{
          height: "600px",
          background: `
            repeating-linear-gradient(
              to bottom,
              #1a781a,
              #1a781a 40px,
              #229922 40px,
              #229922 80px
            )
          `,
          transform: "perspective(1400px) rotateX(20deg)",
          transformOrigin: "bottom center",
        }}
      >
        {/* End Zones */}
        <div className="absolute top-0 left-0 w-full h-[60px] bg-[#0e4e0e] flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl tracking-wider z-20">
          DEFENSE
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-[#0e4e0e] flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl tracking-wider z-20 rotate-180">
          OFFENSE
        </div>

        {/* Yard Numbers */}
        {yards.map((yard, i) => (
          <React.Fragment key={i}>
            <div
              className="absolute left-2 sm:left-4 font-bold text-base sm:text-xl z-30 text-white dark:text-white"
              style={{ top: `${12 + (i / (yards.length - 1)) * 76}%` }}
            >
              {yard}
            </div>
            <div
              className="absolute right-2 sm:right-4 font-bold text-base sm:text-xl z-30 text-white dark:text-white"
              style={{ top: `${12 + (i / (yards.length - 1)) * 76}%` }}
            >
              {yard}
            </div>
          </React.Fragment>
        ))}

        {/* Player Positions */}
        {players.map((player, index) => (
          <div
            key={index}
            className="absolute cursor-pointer"
            onClick={() => setSelectedPlayer(player)}
            style={{
              left: player.left,
              top: player.top,
              transform: "translate(-50%, -50%)",
              width: "max-content",
            }}
          >
            <PlayerCard name={player.name} number={player.number} />
          </div>
        ))}
      </div>

      {/* Player Profile Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl max-w-lg w-full relative">
            <button
              onClick={() => setSelectedPlayer(null)}
              className="absolute top-2 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <PlayerProfile {...selectedPlayer} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityDetails;
