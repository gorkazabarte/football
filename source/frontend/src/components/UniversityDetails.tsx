import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UniversityDetails: React.FC = () => {
  const { name } = useParams();
  const [university, setUniversity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const res = await fetch("https://ysvadm2b2a.execute-api.us-west-2.amazonaws.com/dev/universities");
        const data = await res.json();
        const uni = data.find((item: any) => item.Name?.S === name);
        setUniversity(uni);
      } catch (error) {
        console.error("Error fetching university", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [name]);

  if (loading) return <p className="text-center text-white font-bold">Loading...</p>;
  if (!university) return <p className="text-center text-white font-bold">University not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">{university.Name?.S}</h1>
      <p className="mb-2 text-white font-bold"><strong>State:</strong> {university.State?.S}</p>
      <p className="mb-2 text-white font-bold"><strong>Conference:</strong> {university.Conference?.S}</p>
      <p className="mb-2 text-white font-bold"><strong>Type:</strong> {university.Type?.S}</p>
      <p className="mb-2 text-white font-bold"><strong>Division:</strong> {university.Division?.S}</p>
    </div>
  );
};

export default UniversityDetails;