import React, { useState } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import {
  transactionsData,
  transactionsGrid,
} from "../data/mockData/gridOutlook";
import { useStateContext } from "../contexts/ContextProvider";
import "../pages/cssFiles/LatestTransactions.css";

const LatestTransactions = () => {
  const [filteredData, setFilteredData] = useState(transactionsData);
  const [selectedDate, setSelectedDate] = useState("");
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentMode } = useStateContext();
  const themeClass = currentMode === "Dark" ? "Dark" : "Light";

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    const filtered = transactionsData.filter(
      (transaction) => transaction.date === selectedDate
    );
    setFilteredData(filtered);
  };

  const uniqueDates = [...new Set(transactionsData.map((item) => item.date))];

  return (
    <div className={`Transactions ${themeClass}`}>
      <div className={`dropdown  ${themeClass}`}>
        <label htmlFor="dateFilter">Filter by Date: </label>
        <select
          id="dateFilter"
          value={selectedDate}
          onChange={handleDateChange}
        >
          <option value="">All</option>
          {uniqueDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <GridComponent
        dataSource={filteredData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageSize: 5 }}
        editSettings={editing}
        style={{ border: "none" }}
      >
        <ColumnsDirective>
          {transactionsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default LatestTransactions;
