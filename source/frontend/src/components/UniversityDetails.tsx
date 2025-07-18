import React from "react";
import PlayerCard from "./PlayerCard";

const UniversityDetails = () => {
  const universityName = "Gridiron State University";
  const yards = [0, 10, 20, 30, 40, 50, 40, 30, 20, 10, 0];
  const players = [
    { name: "Alex Gray", number: 7, left: "45%", top: "20%" },
    { name: "Jayden Smith", number: 11, left: "30%", top: "30%" },
    { name: "Ty Moore", number: 10, left: "60%", top: "30%" },
    { name: "Marcus Hill", number: 22, left: "37%", top: "45%" },
    { name: "Derek Young", number: 25, left: "52%", top: "45%" },
    { name: "Samuel James", number: 55, left: "30%", top: "60%" },
    { name: "Brandon Lee", number: 66, left: "40%", top: "70%" },
    { name: "Kevin White", number: 73, left: "50%", top: "80%" },
    { name: "Lucas Brown", number: 74, left: "60%", top: "55%" },
    { name: "Ryan Clark", number: 70, left: "70%", top: "65%" },
    { name: "Ethan Scott", number: 88, left: "80%", top: "75%" },
  ];

  return (
    <div className="w-full bg-gray-900 min-h-screen px-2 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-white text-center leading-tight mt-6">
        University Football Roster
      </h1>

      {/* University name */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-300 text-center mt-1">
        {universityName}
      </h2>

      {/* Football Pitch */}
      <div
        className="relative mx-auto mt-4 w-full max-w-[900px] sm:w-[90%] rounded-xl border-4 border-white overflow-hidden shadow-2xl"
        style={{
          height: "600px", // shorter height on mobile by default
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
              className="absolute left-2 sm:left-4 text-white font-bold text-base sm:text-xl z-30"
              style={{ top: `${12 + (i / (yards.length - 1)) * 76}%` }}
            >
              {yard}
            </div>
            <div
              className="absolute right-2 sm:right-4 text-white font-bold text-base sm:text-xl z-30"
              style={{ top: `${12 + (i / (yards.length - 1)) * 76}%` }}
            >
              {yard}
            </div>
          </React.Fragment>
        ))}

        {/* Player Positions */}
        {players.map(({ name, number, left, top }, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left,
              top,
              transformOrigin: "center",
              // Slightly scale down on small screens for fitting
              transform: "translate(-50%, -50%)",
              width: "max-content",
            }}
          >
            <PlayerCard name={name} number={number} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityDetails;