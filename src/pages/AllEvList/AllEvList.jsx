import React, { useContext, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import Loading from "../../components/Loading/Loading";

function AllEvList() {
  const {
    data,
    displayData,
    error,
    loading,
    currentPage,
    handleNext,
    itemsPerPage,
    handlePrev,
  } = useContext(ApiContext);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = displayData?.filter((item) => {
    const searchTerm = searchQuery?.toLowerCase();
    return (
      item?.Model?.toLowerCase()?.includes(searchTerm) ||
      item?.Make?.toLowerCase()?.includes(searchTerm) ||
      item["Model Year"]?.toString()?.includes(searchTerm) ||
      item["Electric Range"]?.toString()?.includes(searchTerm)
    );
  });

  return (
    <div className="p-[10px]  mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        EV Dashboard
      </h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Make, Model, Year, or Range..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-xl text-red-500">Error: {error}</p>
      ) : (
        <div>
          {filteredData?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredData?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                >
                  <h2 className="text-lg font-bold text-gray-700 mb-2">
                    {item.Model}
                  </h2>
                  <p className="text-gray-600">
                    <strong>Make:</strong> {item.Make}
                  </p>
                  <p className="text-gray-600">
                    <strong>Year:</strong> {item["Model Year"]}
                  </p>
                  <p className="text-gray-600">
                    <strong>Range:</strong> {item["Electric Range"]} miles
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-6">No results found.</p>
          )}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage * itemsPerPage >= data.length}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllEvList;
