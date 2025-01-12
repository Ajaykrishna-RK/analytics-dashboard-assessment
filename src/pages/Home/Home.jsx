import React, { useContext } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaCar, FaBatteryFull, FaChartBar } from "react-icons/fa";
import { MdOutlineElectricCar } from "react-icons/md";
import _ from "lodash";
import { ApiContext } from "../../context/ApiContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const { data, loading } = useContext(ApiContext);

  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      colors.push(randomColor);
    }
    return colors;
  };
  const aggregatedData = _.chain(data)
    .groupBy("Make")
    .map((items, Make) => ({
      Make,
      count: items.length,
    }))
    .value();

  const chartData = {
    labels: aggregatedData?.map((item) => item?.Make),
    datasets: [
      {
        label: "Number of Vehicles",
        data: aggregatedData?.map((item) => item?.count),
        backgroundColor: generateRandomColors(aggregatedData?.length || 0),
      },
    ],
  };

  const topMakes = aggregatedData
    ?.sort((a, b) => b.count - a.count)
    ?.slice(0, 10);
  const topChartData = {
    labels: topMakes?.map((item) => item?.Make),
    datasets: [
      {
        label: "Number of Vehicles",
        data: topMakes?.map((item) => item?.count),
        backgroundColor: generateRandomColors(topMakes?.length || 0),
      },
    ],
  };

  const ChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      tooltip: {
        bodyColor: "white",
      },
      title: {
        display: true,
        text: "Electric Vehicle Makers",
        color: "white",
      },
    },
    responsive: true,
  };

  const topChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      tooltip: {
        bodyColor: "white",
      },

      title: {
        display: true,
        text: "Top Makers",
        color: "white",
      },
    },
    responsive: true,
  };

  const mileageByYear = data
    ?.filter((item) => {
      const year = parseInt(item["Model Year"], 10);
      return year >= 2020 && year <= 2025;
    })
    ?.reduce((acc, item) => {
      const year = item["Model Year"];
      const range = parseFloat(item["Electric Range"]);
      if (!acc[year]) acc[year] = { totalRange: 0, count: 0 };
      acc[year].totalRange += range;
      acc[year].count += 1;
      return acc;
    }, {});

  const averagedMileage = Object.keys(mileageByYear).map((year) => ({
    year,
    averageRange: mileageByYear[year].totalRange / mileageByYear[year].count,
  }));
  console.log(data, "data");
  const lineData = {
    labels: averagedMileage?.map((item) => item?.year),
    datasets: [
      {
        label: "Average Range (Miles)",
        data: averagedMileage?.map((item) => item?.averageRange),
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };
  const countyCounts = data?.reduce((acc, item) => {
    const county = item.County;
    if (county) {
      acc[county] = (acc[county] || 0) + 1;
    }
    return acc;
  }, {});
  const optionsOfMostUsedCity = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  const top5Counties = Object.entries(countyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const lineDataOfMostUsedCity = {
    labels: top5Counties?.map(([county]) => county),
    datasets: [
      {
        label: "Number of EVs",
        data: top5Counties.map(([, count]) => count),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };
  const cafvEligibilityCounts = data?.reduce(
    (acc, item) => {
      const cafvEligibility =
        item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
      const evType = item["Electric Vehicle Type"];

      if (cafvEligibility?.includes("eligible")) {
        acc.cafvEligible += 1;
      } else {
        acc.cafvNotEligible += 1;
      }

      if (evType === "Plug-in Hybrid Electric Vehicle (PHEV)") {
        acc.phev += 1;
      }

      return acc;
    },
    { cafvEligible: 0, cafvNotEligible: 0, phev: 0 }
  );

  const pieChartData = {
    labels: ["CAFV Eligible", "CAFV Not Eligible", "PHEV Vehicles"],
    datasets: [
      {
        label: "Vehicle Distribution",
        data: [
          cafvEligibilityCounts.cafvEligible,
          cafvEligibilityCounts.cafvNotEligible,
          cafvEligibilityCounts.phev,
        ],
        backgroundColor: ["#4CAF50", "#FF5722", "#2196F3"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="min-h-[500px] text-[#fff] ">
          <h1 className="text-start text-[#111] text-3xl font-bold mb-4">
            EV Population Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {/* Total Electric Vehicles */}
            <div className="bg-gray-800 h-auto p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Electric Vehicle Makers
              </h2>
              <Doughnut data={chartData} options={ChartOptions} />
            </div>

            {/* Popular Electric Vehicles Makers */}
            <div className="bg-gray-800  p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Top Electric Vehicle Makers
              </h2>
              <Doughnut data={topChartData} options={topChartOptions} />
            </div>

            {/* Average Electric Vehicles Range */}

            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Average Range (Miles)
              </h2>
              <Line data={lineData} options={optionsOfMostUsedCity} />
            </div>

            {/* Most Electric Vehicles Using Countries */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-start gap-[10px]">
                {" "}
                <FaCar className="text-4xl text-blue-500" />{" "}
                <h2 className="text-xl font-semibold ">
                  {" "}
                  Most Ev Using Countries
                </h2>
              </div>
              <div className="mt-4">
                <Line
                  data={lineDataOfMostUsedCity}
                  options={optionsOfMostUsedCity}
                />
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-white mb-4">
                Distribution of CAFV Eligibility and PHEV Vehicles
              </h2>
              <Doughnut data={pieChartData} options={topChartOptions} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
