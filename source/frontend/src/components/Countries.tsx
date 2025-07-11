import React from "react";
import { motion } from "framer-motion";

const countries = [
  { name: "Spain", flag: "🇪🇸" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "France", flag: "🇫🇷" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "England", flag: "🇬🇧" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "USA", flag: "🇺🇸" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Australia", flag: "🇦🇺" }
];

const FiaCountries: React.FC = () => {
  return (
    <div id="countries" className="scroll-mt-20 p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-10">
          🌍 Countries We Operate In
        </h1>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
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
          {countries.map(({ name, flag }) => (
            <motion.div
              key={name}
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 text-center text-lg font-medium text-gray-700 dark:text-gray-200 hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="text-3xl mb-2">{flag}</div>
              <div>{name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FiaCountries;
