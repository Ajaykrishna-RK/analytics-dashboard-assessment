import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Papa from "papaparse";

export const ApiContext = createContext();

export function ApiContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/Electric_Vehicle_Population_Data.csv");
      const parsedData = Papa.parse(response?.data, { header: true });
      setData(parsedData?.data || []);
      setDisplayData(parsedData?.data.slice(0, itemsPerPage) || []); // Load the first set
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching or parsing the CSV file:", err);
      setError(err.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (startIndex < data.length) {
      setDisplayData(data.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      const startIndex = prevPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      setDisplayData(data.slice(startIndex, endIndex));
      setCurrentPage(prevPage);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        data,
        displayData,
        error,
        loading,
        currentPage,
        handleNext,
        itemsPerPage,
        handlePrev,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
