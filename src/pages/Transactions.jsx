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
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

const Transactions = () => {
  const toolbarOptions = ["Search"];
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const products = ["Products1", "Products2", "Products3"];
  const [transactionsData, setTransactionsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditTransaction, setCurrentEditTransaction] = useState(null);
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    name: "",
    quantity: 0,
    salesPrice: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: getTodayDate(),
      }));
    }
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateTransaction = () => {
    const newProductTotal = formData.salesPrice * formData.quantity;
    const updatedTransaction = transactionsData.map((transaction) =>
      transaction.id === currentEditTransaction.id
        ? { ...transaction, ...formData, total: newProductTotal }
        : transaction
    );

    setTransactionsData(updatedTransaction);
    resetForm();
  };

  const handleAddTransaction = () => {
    if (isEditMode) {
      handleUpdateTransaction();
      return;
    }

    const newProductTotal = formData.salesPrice * formData.quantity;
    const newTransaction = {
      id: transactionsData.length + 1,
      ...formData,
      total: newProductTotal,
    };

    setTransactionsData([...transactionsData, newTransaction]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: getTodayDate(),
      name: "",
      quantity: 0,
      salesPrice: 0,
      total: 0,
    });
    setIsEditMode(false);
    setCurrentEditTransaction(null);
    toggleModal();
  };

  const fetchData = async () => {
    setIsLoading(true);
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve([]), 3000)
    );
    setTransactionsData(response);
    setIsLoading(false);
  };

  const handleEdit = (transaction) => {
    setIsEditMode(true);
    setCurrentEditTransaction(transaction);
    setFormData({
      date: transaction.date,
      name: transaction.name,
      quantity: transaction.quantity,
      salesPrice: transaction.salesPrice,
      total: transaction.total,
    });
    toggleModal();
  };

  const handleDelete = (transactionId) => {
    const updatedTransactions = transactionsData.filter(
      (transaction) => transaction.id !== transactionId
    );
    setTransactionsData(updatedTransactions);
  };

  const onGridDataBound = () => {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const transactionId = parseInt(e.target.getAttribute("data-id"), 10);
        const transaction = transactionsData.find(
          (t) => t.id === transactionId
        );
        if (transaction) {
          handleEdit(transaction);
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const transactionId = parseInt(e.target.getAttribute("data-id"), 10);
        if (
          window.confirm("Are you sure you want to delete this transaction?")
        ) {
          handleDelete(transactionId);
        }
      });
    });
  };

  const actionTemplate = (props) => (
    <div>
      <button
        className="edit-btn bg-blue-500 text-white px-2 py-1 rounded mr-2"
        data-id={props.id}
      >
        Edit
      </button>
      <button
        className="delete-btn bg-red-500 text-white px-2 py-1 rounded"
        data-id={props.id}
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <Header category="Page" title="Transactions" />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
          onClick={() => {
            setIsEditMode(false);
            toggleModal();
          }}
        >
          Add New Transaction
        </button>
      </div>

      <GridComponent
        dataSource={transactionsData}
        allowPaging={true}
        pageSettings={{ pageCount: 5 }}
        toolbar={toolbarOptions}
        dataBound={onGridDataBound}
      >
        <ColumnsDirective>
          {transactionsGrid.map((column, index) => (
            <ColumnDirective
              key={index}
              field={column.field}
              width={column.width}
              headerText={column.headerText}
              textAlign={column.textAlign}
              template={column.template}
            />
          ))}
          <ColumnDirective
            headerText="Actions"
            width="150"
            textAlign="Center"
            template={actionTemplate}
          />
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>

      {isLoading ? (
        <div className="flex justify-center">
          <Loaders />
        </div>
      ) : (
        <div className="mb-6 mt-6">
          <LineSeriesChart graphData={transactionsData} />
        </div>
      )}

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4">
              {isEditMode ? "Edit Transaction" : "Add New Transaction"}
            </h2>
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
              <label className="block text-sm mb-2">Product Name</label>
              <DropDownListComponent
                dataSource={products}
                placeholder="Select a product"
                change={(e) => setFormData({ ...formData, name: e.value })}
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
              <label className="block text-sm mb-2">Sales Price</label>
              <input
                type="number"
                className="w-full border-gray-300 rounded-sm py-2 px-3"
                name="salesPrice"
                value={formData.salesPrice}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={handleAddTransaction}
              >
                {isEditMode ? "Update" : "Save"}
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
  const groupedData = graphData.reduce((acc, transaction) => {
    const { date, name, total } = transaction;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push({ date, total: parseInt(total, 10) });
    return acc;
  }, {});

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  };

  return (
    <ChartComponent
      title="Transactions Analysis"
      primaryXAxis={{ valueType: "Category", title: "Date" }}
      primaryYAxis={{ title: "Total" }}
      legendSettings={{ visible: true }}
    >
      <SeriesCollectionDirective>
        {Object.entries(groupedData).map(([name, data], index) => {
          const color = getRandomColor();
          return (
            <SeriesDirective
              key={index}
              dataSource={data}
              xName="date"
              yName="total"
              type="Line"
              name={name}
              tooltip={{ enable: true }}
              marker={{
                visible: true,
                width: 10,
                height: 10,
                border: { width: 2, color },
              }}
              width={4}
              fill={color}
            />
          );
        })}
      </SeriesCollectionDirective>
      <ChartInject services={[LineSeries, Category, Legend, DataLabel]} />
    </ChartComponent>
  );
};

export default Transactions;
