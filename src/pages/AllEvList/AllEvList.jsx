import React, { useContext, useState } from "react";
import { ApiContext } from "../../context/ApiContext";

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
    <div className="App">
      <h1 className="text-2xl font-bold text-start mb-4">EV List</h1>
      <input
        type="text"
        placeholder="Search by Make, Model, Year, or Range"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      {loading ? (
        <p className="text-[24px]">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Model
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Make
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Year
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Range (miles)
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.length > 0 ? (
                filteredData?.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {item.Model}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.Make}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item["Model Year"]}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item["Electric Range"]}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
