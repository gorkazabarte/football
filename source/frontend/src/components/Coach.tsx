import React, { useState } from "react";
import { motion } from "framer-motion";

const coaches = [
  { id: "1", name: "Alex Ferguson", country: "Scotland", experience: 26 },
  { id: "2", name: "Pep Guardiola", country: "Spain", experience: 15 },
  { id: "3", name: "Jürgen Klopp", country: "Germany", experience: 12 },
  { id: "4", name: "Carlo Ancelotti", country: "Italy", experience: 30 },
  { id: "5", name: "Zinedine Zidane", country: "France", experience: 8 },
  { id: "6", name: "Jose Mourinho", country: "Portugal", experience: 20 },
  { id: "7", name: "Diego Simeone", country: "Argentina", experience: 10 },
  { id: "8", name: "Thomas Tuchel", country: "Germany", experience: 9 },
];

const Coach: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");

  const countries = ["All", ...Array.from(new Set(coaches.map(c => c.country)))];
  const experienceLevels = ["All", "0-5", "6-10", "11+"];

  const filteredCoaches = coaches.filter(coach => {
    const matchesQuery =
      coach.name.toLowerCase().includes(query.toLowerCase()) ||
      coach.country.toLowerCase().includes(query.toLowerCase());

    const matchesCountry = selectedCountry === "All" || coach.country === selectedCountry;

    let matchesExperience = true;
    if (selectedExperience !== "All") {
      const exp = coach.experience;
      if (selectedExperience === "0-5") matchesExperience = exp <= 5;
      else if (selectedExperience === "6-10") matchesExperience = exp >= 6 && exp <= 10;
      else if (selectedExperience === "11+") matchesExperience = exp >= 11;
    }

    return matchesQuery && matchesCountry && matchesExperience;
  });

  return (
    <div id="coach" className="scroll-mt-20 p-6 md:p-10 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
          🏆 Our Top Coaches at FIA
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
          <input type="text" placeholder="Search by name or country..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select value={selectedExperience} onChange={(e) => setSelectedExperience(e.target.value)} className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level === "All" ? "All Experience" : level + " years"}
              </option>
            ))}
          </select>
        </div>

        {/* Coach Cards */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" initial="hidden" animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredCoaches.length > 0 ? (
            filteredCoaches.map((coach) => (
              <motion.div key={coach.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl p-5 text-center transition duration-300" whileHover={{ scale: 1.05 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {coach.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Country: {coach.country}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  Experience: {coach.experience} years
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
              No coaches match your filters.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Coach;
