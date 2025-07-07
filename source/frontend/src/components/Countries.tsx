import React from "react";
import { motion } from "framer-motion";

const countries = [
  "Spain",
  "Italy",
  "France",
  "Germany",
  "England",
  "Portugal",
  "Brazil",
  "Argentina",
  "Netherlands",
  "Belgium",
  "USA",
  "Japan",
  "Turkey",
  "Sweden",
  "South Africa",
];

const FiaCountries: React.FC = () => {
  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-10">
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
          {countries.map((country) => (
            <motion.div
              key={country}
              className="bg-white shadow-md rounded-2xl p-4 text-center text-lg font-medium text-gray-700 hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {country}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FiaCountries;
