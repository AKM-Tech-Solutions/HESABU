import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import {
  LineSeries,
  Inject as ChartInject,
  Tooltip,
  Legend,
  Category,
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  DataLabel,
} from "@syncfusion/ej2-react-charts";
import Header from "../components/Header";
import { transactionsGrid } from "../data/mockData/gridOutlook";
import Loaders from "../components/Loaders/Loaders";

const Transactions = () => {
  const toolbarOptions = ["Search"];
  const [transactionsData, setTransactionsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    quantity: 0,
    total: 0,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTransaction = () => {
    const newTransaction = {
      id: transactionsData.length + 1,
      ...formData,
    };
    setTransactionsData([...transactionsData, newTransaction]);

    // Reset formData state after adding
    setFormData({
      date: "",
      name: "",
      quantity: 0,
      total: 0,
    });

    // Close modal after adding Transaction
    toggleModal();
  };

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch data (replace with your actual logic)
  const fetchData = async () => {
    setIsLoading(true);
    // Simulate data fetching
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve([]), 3000)
    );
    setTransactionsData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <Header category="Page" title="Transaction" />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={toggleModal}
        >
          Add New Transaction
        </button>
      </div>

      {/* Grid Component */}
      <GridComponent
        dataSource={transactionsData}
        allowPaging={true}
        pageSettings={{ pageCount: 5 }}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {transactionsGrid.map((column, index) => (
            <ColumnDirective
              key={index}
              field={column.field}
              headerText={column.headerText}
              textAlign={column.textAlign}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>

      {/* Line Chart */}
      {isLoading ? (
        <div className="flex justify-center">
          <Loaders />
        </div>
      ) : (
        <div className="mb-6 mt-6">
          <LineSeriesChart graphData={transactionsData} />
        </div>
      )}

      {/* Modal for Adding New Transaction */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4">Add New Transaction</h2>
            <div className="mb-4">
              <label className="block text-sm mb-2">Date</label>
              <input
                type="date"
                className="w-full border-gray-300 rounded-sm py-2 px-3"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                className="w-full border-gray-300 rounded-sm py-2 px-3"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Quantity</label>
              <input
                type="number"
                className="w-full border-gray-300 rounded-sm py-2 px-3"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Total</label>
              <input
                type="number"
                className="w-full border-gray-300 rounded-sm py-2 px-3"
                name="total"
                value={formData.total}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={handleAddTransaction}
              >
                Add Transaction
              </button>
              <button
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LineSeriesChart = ({ graphData }) => {
  //grouping the transactions by product name
  const groupedData = graphData.reduce((acc, transaction) => {
    acc[transaction.name] =
      (acc[transaction.name] || 0) + parseInt(transaction.total);
    return acc;
  }, {});

  // connnvert groupedData to chartData format
  const chartData = Object.entries(groupedData)
    .map(([name, total]) => ({ name, total }))
    .filter((entry) => entry.name && entry.total !== undefined);
  console.log("Chart Data:", chartData);

  return (
    <ChartComponent
      title="Transactions Analysis"
      primaryXAxis={{ valueType: "Category", title: " Name" }}
      primaryYAxis={{ tilte: "Total" }}
      legendSettings={{ visible: true }}
    >
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={
            chartData.length > 0 ? chartData : [{ name: "No Data", total: 0 }]
          }
          xName="name"
          yName="total"
          type="Line"
          name="Product Name"
          // marker={{ dataLabel: { visible: true }, visible: true }}
        />
      </SeriesCollectionDirective>
      <ChartInject services={[LineSeries, Category, Legend, DataLabel]} />
    </ChartComponent>
  );
};

export default Transactions;
