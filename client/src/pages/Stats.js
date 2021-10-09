import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import SelectDate from "../components/SelectDate";

export default function LineChart() {
  const [today, setToday] = useState();
  const [tenDaysAgo, setTenDaysAgo] = useState();

  const [dailyVisitsData, setDailyVisitsData] = useState([]);

  useEffect(() => {
    fetch(`/api/visit-stats`)
      .then((response) => response.json())
      .then((data) => {
        setDailyVisitsData(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return <h1>hi</h1>;
  // (
  //   <div>
  //     <SelectDate toDay={setToday} todayMinusTen={setTenDaysAgo} />
  //     <Line
  //       data={{
  //         labels: dailyVisitsData.map((date) => date?.timestamp.split("T")[0]),
  //         datasets: [
  //           {
  //             label: "USD/BITCOIN",
  //             data: dailyVisitsData.map((rates) => Number(rates?.rate)),
  //             borderColor: ["rgba(44, 130, 201, 1)"],
  //             borderWidth: 1,
  //           },
  //         ],
  //       }}
  //       height={400}
  //       width={600}
  //       options={{
  //         maintainAspectRatio: false,
  //         scales: {
  //           yAxes: [
  //             {
  //               ticks: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           ],
  //         },
  //         legend: {
  //           labels: {
  //             fontSize: 10,
  //           },
  //         },
  //       }}
  //     />
  //   </div>
  // );
}
