import React from "react";
import { motion } from "framer-motion";

const bestPlayers = [
  {
    name: "Jaxon Wright",
    position: "Quarterback",
    nationality: "USA",
  },
  {
    name: "Elijah Carter",
    position: "Running Back",
    nationality: "USA",
  },
  {
    name: "Dante Holloway",
    position: "Wide Receiver",
    nationality: "USA",
  },
  {
    name: "Micah Bennett",
    position: "Linebacker",
    nationality: "USA",
  },
  {
    name: "Treyvon Lewis",
    position: "Cornerback",
    nationality: "USA",
  },
  {
    name: "Logan Matthews",
    position: "Tight End",
    nationality: "USA",
  },
  {
    name: "Noah Washington",
    position: "Safety",
    nationality: "USA",
  },
  {
    name: "Chase Montgomery",
    position: "Defensive End",
    nationality: "USA",
  },
];

const BestPlayers: React.FC = () => {
  return (
    <div className="p-6 md:p-10 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-10">
          🏈 Top American Football Talents at FIA
        </h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {bestPlayers.map((player) => (
            <motion.div
              key={player.name}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl p-5 text-center transition duration-300"
              whileHover={{ scale: 1.05 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {player.name}
              </h2>
              <p className="text-sm text-gray-600">{player.position}</p>
              <p className="text-sm text-gray-500 italic">{player.nationality}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BestPlayers;
