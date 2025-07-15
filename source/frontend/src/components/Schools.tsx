import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface School {
  name: string;
  state: string;
}

const Schools: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const schoolsPerPage = 16;

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("https://ysvadm2b2a.execute-api.us-west-2.amazonaws.com/dev/schools");
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();

        const formatted: School[] = data.map((item: any) => ({
          name: item.Name?.S ?? "",
          state: item.State?.S ?? "",
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

  const states = ["All", ...Array.from(new Set(schools.map((s) => s.state)))];

  const filteredSchools = schools.filter((school) => {
    const matchesQuery = `${school.name} ${school.state}`.toLowerCase().includes(query.toLowerCase());
    const matchesState = selectedState === "All" || school.state === selectedState;
    return matchesQuery && matchesState;
  });

  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);
  const startIndex = (currentPage - 1) * schoolsPerPage;
  const currentSchools = filteredSchools.slice(startIndex, startIndex + schoolsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedState]);

  return (
    <div
      id="schools"
      className="scroll-mt-20 p-6 md:p-10 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Partner Schools
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading schools...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <input
                type="text"
                placeholder="Search by name or state..."
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
              {currentSchools.length > 0 ? (
                currentSchools.map((school, i) => (
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
                    <p className="text-sm text-blue-600 dark:text-gray-500 italic">
                      {school.state}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
                  No schools match your filters.
                </p>
              )}
            </motion.div>

            {/* Pagination */}
            {filteredSchools.length > schoolsPerPage && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    );
                  })
                  .map((page, idx, arr) => (
                    <React.Fragment key={page}>
                      {idx > 0 && page - arr[idx - 1] > 1 && (
                        <span className="text-gray-500 dark:text-gray-400">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                        } hover:bg-blue-600`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Schools;
