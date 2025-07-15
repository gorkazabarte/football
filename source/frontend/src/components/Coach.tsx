import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Coach {
  id: string;
  name: string;
  type: string;
  university: string
}

const Coach: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedUniversity, setSelectedUniversity] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch(
          "https://ysvadm2b2a.execute-api.us-west-2.amazonaws.com/dev/coaches"
        );
        if (!res.ok) throw new Error("Failed to fetch coaches");
        const data = await res.json();

        const parsed = data.map((c: any) => ({
          name: c.Name.S,
          type: c.Type.S,
          university: c.University.S
        }));

        setCoaches(parsed);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  const types = ["All", ...Array.from(new Set(coaches.map((c) => c.type)))];
  const universities = ["All", ...Array.from(new Set(coaches.map((c) => c.university)))];

  const filteredCoaches = coaches.filter((coach) => {
    const matchesQuery =
      coach.name.toLowerCase().includes(query.toLowerCase()) ||
      coach.type.toLowerCase().includes(query.toLowerCase());

    const matchesType = selectedType === "All" || coach.type === selectedType;
    const matchesUniversity = selectedUniversity === "All" || coach.university === selectedUniversity;

    return matchesQuery && matchesType && matchesUniversity;
  });

  return (
    <div
      id="coach"
      className="scroll-mt-20 p-6 md:p-10 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Our Top Coaches at FIA
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading coaches...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
              <input
                type="text"
                placeholder="Search by name or type..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {universities.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
            </div>

            {/* Coach Cards */}
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
              {filteredCoaches.length > 0 ? (
                filteredCoaches.slice(0, 16).map((coach) => (
                  <motion.div
                    key={coach.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl p-5 text-center transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {coach.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-500">
                      Type: {coach.type}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      University: {coach.university}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
                  No coaches match your filters.
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Coach;
