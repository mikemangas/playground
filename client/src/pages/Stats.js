import { Line } from "react-chartjs-2";
import { useState } from "react";

import useCreateFetchEffect from "../hooks/useCreateFetchEffect";

export default function LineChart() {
  const [dailyVisitsDataGlobal, setDailyVisitsDataGlobal] = useState([]);

  useCreateFetchEffect("/api/visitsdaily/overall", setDailyVisitsDataGlobal);

  //Visits Global Settings
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
  const dailyVisitsCounterDataGlobal = subtractArrayValues();

  return (
    <div>
      <Line
        data={{
          labels: slicedArray.map((date) => date?.createdAt.split("T")[0]),

          datasets: [
            {
              label: "Page (GLOBAL) Views Daily",
              data: dailyVisitsCounterDataGlobal.map(
                (singleDayValue) => singleDayValue
              ),
              borderColor: ["rgba(44, 130, 201, 1)"],
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 10,
            },
          },
        }}
      />
    </div>
  );
}

//  (
//   <>
//     <ul>
//       <h1>Overall</h1>
//       {dailyVisitsCounterDataGlobal.map((singleDay) => {
//         return <li>{singleDay}</li>;
//       })}
//       {slicedArray.map((singleDate) => {
//         return <li>{singleDate.createdAt.split("T")[0]}</li>;
//       })}
//     </ul>
//     <ul>
//       <h1>Map</h1>
//       {dailyVisitsDataMap.map((singleDay) => {
//         return <li>{singleDay?.counter}</li>;
//       })}
//     </ul>
//   </>
// );
