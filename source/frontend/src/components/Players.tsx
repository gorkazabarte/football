import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Player {
  name: string;
  position: string;
  nationality: string;
}

const BestPlayers: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [query, setQuery] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("All");
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch("YOUR_API_ENDPOINT_HERE");
        if (!res.ok) throw new Error("Failed to fetch players");
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const nationalities = ["All", ...Array.from(new Set(players.map(p => p.nationality)))];
  const positions = ["All", ...Array.from(new Set(players.map(p => p.position)))];

  const filteredPlayers = players.filter((player) => {
    const matchesQuery = `${player.name} ${player.position} ${player.nationality}`
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesNationality = selectedNationality === "All" || player.nationality === selectedNationality;
    const matchesPosition = selectedPosition === "All" || player.position === selectedPosition;

    return matchesQuery && matchesNationality && matchesPosition;
  });

  return (
    <div id="players" className="scroll-mt-20 p-6 md:p-10 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
          🏈 Top American Football Talents at FIA
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading players...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
              <input
                type="text"
                placeholder="Search by name, position or nationality..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <select
                value={selectedNationality}
                onChange={(e) => setSelectedNationality(e.target.value)}
                className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {nationalities.map((nat) => (
                  <option key={nat} value={nat}>
                    {nat}
                  </option>
                ))}
              </select>

              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* Player Cards */}
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
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <motion.div
                    key={player.name}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl p-5 text-center transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {player.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {player.position}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                      {player.nationality}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
                  No players match your filters.
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default BestPlayers;
