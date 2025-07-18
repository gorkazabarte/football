import React from "react";
import PlayerCard from "./PlayerCard";

const UniversityDetails = () => {
  const universityName = "Gridiron State University";
  const yards = [0, 10, 20, 30, 40, 50, 40, 30, 20, 10, 0];
  const players = [
    { name: "Alex Gray", position: "QB", number: 7, left: "45%", top: "12%" },
    { name: "Jayden Smith", position: "WR", number: 11, left: "30%", top: "20%" },
    { name: "Ty Moore", position: "WR", number: 10, left: "60%", top: "20%" },
    { name: "Marcus Hill", position: "RB", number: 22, left: "40%", top: "30%" },
    { name: "Derek Young", position: "RB", number: 25, left: "50%", top: "30%" },
    { name: "Samuel James", position: "OL", number: 55, left: "30%", top: "45%" },
    { name: "Brandon Lee", position: "OL", number: 66, left: "40%", top: "55%" },
    { name: "Kevin White", position: "OL", number: 73, left: "50%", top: "65%" },
    { name: "Lucas Brown", position: "OL", number: 74, left: "60%", top: "40%" },
    { name: "Ryan Clark", position: "OL", number: 70, left: "70%", top: "50%" },
    { name: "Ethan Scott", position: "TE", number: 88, left: "80%", top: "60%" },
  ];

  return (
    <div className="w-full bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white text-center leading-none">
        University Football Roster
      </h1>

      {/* University name and field with no gap */}
      <div className="flex flex-col items-center text-center leading-none">
        <h2 className="text-2xl font-semibold text-gray-300 mb-0 leading-none">
          {universityName}
        </h2>

        {/* Football Pitch */}
        <div
          className="relative w-[90%] h-[900px] border-4 border-white rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: `
              repeating-linear-gradient(
                to bottom,
                #1a781a,
                #1a781a 55px,
                #229922 55px,
                #229922 110px
              )
            `,
            transform: "perspective(1400px) rotateX(20deg)",
            transformOrigin: "bottom center",
          }}
        >
          {/* End Zones */}
          <div className="absolute top-0 left-0 w-full h-[80px] bg-[#0e4e0e] flex items-center justify-center text-white font-extrabold text-2xl tracking-wider z-20">
            DEFENSE
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[80px] bg-[#0e4e0e] flex items-center justify-center text-white font-extrabold text-2xl tracking-wider z-20 rotate-180">
            OFFENSE
          </div>

          {/* Yard Numbers with spacing */}
          {yards.map((yard, i) => (
              <React.Fragment key={i}>
                <div
                  className="absolute left-4 text-white text-xl font-bold z-30"
                  style={{ top: `${12 + (i / (yards.length - 1)) * 76}%` }}
                >
                  {yard}
                </div>
                <div
                  className="absolute right-4 text-white text-xl font-bold z-30"
                  style={{ top: `${12 + (i / (yards.length - 1)) * 76}%` }}
                >
                  {yard}
                </div>
              </React.Fragment>
            ))}

          {/* Example Player Positions */}
          {players.map(({ name, position, number, left, top }, index) => (
            <div
              key={index}
              className="absolute"
              style={{ left, top }}
            >
              <PlayerCard name={name} position={position} number={number} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityDetails;
