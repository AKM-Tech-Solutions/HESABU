import React from "react";
import { Header } from "../components";
import { FaDownload } from "react-icons/fa";

const Reports = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <Header category="Page" title="Reports" />

        {/* Add New Product button */}
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex justify-between items-center gap-1">
          <FaDownload /> Download Reports
        </button>
      </div>
    </div>
  );
};

export default Reports;
