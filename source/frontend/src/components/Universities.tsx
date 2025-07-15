import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface University {
  name: string;
  state: string;
  conference: string;
}

const Universities: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedConference, setSelectedConference] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch("https://ysvadm2b2a.execute-api.us-west-2.amazonaws.com/dev/universities");
        if (!res.ok) throw new Error("Failed to fetch universities");
        const data = await res.json();

        const formattedUniversities: University[] = data.map((item: any) => ({
          name: item.Name?.S ?? "",
          state: item.State?.S ?? "",
          conference: item.Conference?.S ?? "",
        }));

        setUniversities(formattedUniversities);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const states = ["All", ...Array.from(new Set(universities.map((u) => u.state)))];
  const conferences = ["All", ...Array.from(new Set(universities.map((u) => u.conference)))];

  const filteredUniversities = universities.filter((uni) => {
    const matchesQuery = `${uni.name} ${uni.state} ${uni.conference}`.toLowerCase().includes(query.toLowerCase());
    const matchesState = selectedState === "All" || uni.state === selectedState;
    const matchesConference = selectedConference === "All" || uni.conference === selectedConference;
    return matchesQuery && matchesState && matchesConference;
  });

  return (
    <div
      id="universities"
      className="scroll-mt-20 p-6 md:p-10 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Partner Universities
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading universities...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={selectedConference}
                onChange={(e) => setSelectedConference(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {conferences.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* University Cards */}
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
              {filteredUniversities.length > 0 ? (
                filteredUniversities.slice(0, 16).map((uni, i) => (
                  <Link key={i} to={`/university/${encodeURIComponent(uni.name)}`}>
                    <motion.div
                     className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl p-5 text-center transition duration-300 cursor-pointer"
                     whileHover={{ scale: 1.05 }}
                     variants={{
                       hidden: { opacity: 0, y: 20 },
                       visible: { opacity: 1, y: 0 },
                     }}
                    >
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{uni.name}</h2>
                      <p className="text-sm text-gray-400 dark:text-gray-500">{uni.state}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 italic">{uni.conference}</p>
                    </motion.div>
                  </Link>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
                  No universities match your filters.
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Universities;
