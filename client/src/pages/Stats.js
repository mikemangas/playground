import { Line } from "react-chartjs-2";
import { useState } from "react";

import useCreateFetchEffect from "../hooks/useCreateFetchEffect";

export default function LineChart() {
  const [dailyVisitsDataGlobal, setDailyVisitsDataGlobal] = useState([]);
  const [dailyCheckins, setDailyCheckins] = useState([]);
  const [currentCheckedInUsers, setCurrentCheckedInUsers] = useState([]);

  useCreateFetchEffect("/api/visitsdaily/overall", setDailyVisitsDataGlobal);
  useCreateFetchEffect("/api/checkinsdaily/", setDailyCheckins);
  useCreateFetchEffect("/api/currentcheckedinusers/", setCurrentCheckedInUsers);

  //Visits Global Settings
  const slicedArrayDailyOverall = dailyVisitsDataGlobal.slice(1);
  function subtractDailyVisitsArrayValues() {
    const originalArray = dailyVisitsDataGlobal.map((original) => {
      return original?.counter;
    });
    const subtractedArray = slicedArrayDailyOverall.map((subtracted) => {
      return subtracted?.counter;
    });
    function absSubtract(arr1, arr2) {
      return arr2.map(function (el, i) {
        return Math.abs(el - arr1[i]);
      });
    }
    return absSubtract(originalArray, subtractedArray);
  }
  const dailyVisitsCounterDataGlobal = subtractDailyVisitsArrayValues();

  //check-in settings

  const slicedArrayDailyCheckins = dailyCheckins.slice(1);
  function subtractDailyCheckinsArrayValues() {
    const originalArray = dailyCheckins.map((original) => {
      return original?.counter;
    });
    const subtractedArray = slicedArrayDailyCheckins.map((subtracted) => {
      return subtracted?.counter;
    });
    function absSubtract(arr1, arr2) {
      return arr2.map(function (el, i) {
        return Math.abs(el - arr1[i]);
      });
    }
    return absSubtract(originalArray, subtractedArray);
  }
  const dailyCheckinsCounter = subtractDailyCheckinsArrayValues();

  return (
    <div>
      <p>{`Eingecheckte User aktuell: ${currentCheckedInUsers.length}`}</p>
      <div>
        <Line
          data={{
            labels: slicedArrayDailyOverall.map(
              (date) => date?.createdAt.split("T")[0]
            ),
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
      <div>
        <div>
          <Line
            data={{
              labels: slicedArrayDailyCheckins.map(
                (date) => date?.createdAt.split("T")[0]
              ),
              datasets: [
                {
                  label: "Checkins Daily",
                  data: dailyCheckinsCounter.map(
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
      </div>
    </div>
  );
}
