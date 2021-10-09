import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import SelectDate from "../components/SelectDate";
import useCreateFetchEffect from "../hooks/useCreateFetchEffect";

export default function LineChart() {
  const [today, setToday] = useState();
  const [tenDaysAgo, setTenDaysAgo] = useState();

  const [dailyVisitsDataGlobal, setDailyVisitsDataGlobal] = useState([]);
  const [dailyVisitsDataHome, setDailyVisitsDataHome] = useState([]);
  const [dailyVisitsDataMap, setDailyVisitsDataMap] = useState([]);

  useCreateFetchEffect("/api/visitsdaily/overall", setDailyVisitsDataGlobal);
  useCreateFetchEffect("/api/visitsdaily/home", setDailyVisitsDataHome);
  useCreateFetchEffect("/api/visitsdaily/map", setDailyVisitsDataMap);

  const slicedArray = dailyVisitsDataGlobal.slice(1);
  function subtractArrayValues() {
    const originalArray = dailyVisitsDataGlobal.map((original) => {
      return original?.counter;
    });
    const subtractedArray = slicedArray.map((subtracted) => {
      return subtracted?.counter;
    });
    function absSubtract(arr1, arr2) {
      return arr2.map(function (el, i) {
        return Math.abs(el - arr1[i]);
      });
    }
    return absSubtract(originalArray, subtractedArray);
  }
  const boss = subtractArrayValues();
  console.log(boss);

  return (
    <>
      <ul>
        <h1>Overall</h1>

        {boss.map((singleDay) => {
          return <li>{`hey ${singleDay}`}</li>;
        })}
      </ul>
      {/* <ul>
        <h1>Home</h1>
        {dailyVisitsDataHome.map((singleDay) => {
          return <li>{singleDay?.counter}</li>;
        })}
      </ul> */}
      <ul>
        <h1>Map</h1>
        {dailyVisitsDataMap.map((singleDay) => {
          return <li>{singleDay?.counter}</li>;
        })}
      </ul>
    </>
  );
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
