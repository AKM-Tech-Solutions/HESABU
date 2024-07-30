import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { salesSummaryData } from "../data/mockData/gridOutlook";
import Graph from "./Charts/Graph/Graph";
import LatestTransactions from "../components/LatestTransactions";

const Dashboard = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="mt-24  ">
      <div>
        <h2 className="text-xl text-gray-500 ml-6">SALES SUMMARY</h2>
      </div>
      {/*  sales summary */}
      <div className="flex flex-wrap justify-center">
        {salesSummaryData.map((item) => (
          <div
            key={item.title}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-3"
          >
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 rounded-2xl border border-black border-dashed">
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Sock reports */}
      <div>
        <div>
          <h2 className="text-xl text-gray-500 ml-6">STOCK REPORTS</h2>
        </div>

        <Graph currentMode={currentMode} />
      </div>
      {/* transactions */}
      <div>
        <div>
          <h2 className="text-xl text-gray-500 ml-6">TRANSACTIONS</h2>
        </div>
        <LatestTransactions currentMode={currentMode} />
      </div>
    </div>
  );
};

export default Dashboard;
