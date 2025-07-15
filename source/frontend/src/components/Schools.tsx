import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface School {
  name: string;
  country: string;
}

const Schools: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("https://your-api-url.com/schools"); // Replace with real endpoint
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();

        const formatted: School[] = data.map((item: any) => ({
          name: item.Name?.S ?? "",
          country: item.Country?.S ?? "",
        }));

        setSchools(formatted);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const countries = ["All", ...Array.from(new Set(schools.map(s => s.country)))];

  const filteredSchools = schools.filter((school) => {
    const matchesQuery = `${school.name} ${school.country}`.toLowerCase().includes(query.toLowerCase());
    const matchesCountry = selectedCountry === "All" || school.country === selectedCountry;
    return matchesQuery && matchesCountry;
  });

  return (
    <div id="schools" className="scroll-mt-20 p-6 md:p-10 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
          🏫 Partner Schools
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading schools...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
              <input
                type="text"
                placeholder="Search by name or country..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full md:w-2/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* School Cards */}
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
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school, i) => (
                  <motion.div
                    key={i}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl p-5 text-center transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {school.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                      {school.country}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
                  No schools match your filters.
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Schools;
