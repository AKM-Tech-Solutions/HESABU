import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import Header from "../components/Header";
import "../pages/cssFiles/Inventory.css";
import { productsGrid } from "../data/mockData/gridOutlook";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";

const Inventory = () => {
  const toolbarOptions = ["Search..."];

  const categories = ["Category1", "Category2", "Category3"]; // Example categories to fetch from categories page and backend

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [productsData, setProductsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    name: "",
    cat: "",
    latestCost: 0,
    quantity: 0,
    salesPrice: 0,
    total: 0,
  });
  const [inventoryHistory, setInventoryHistory] = useState([]);
  const [historyData, setHistoryData] = useState([]);

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

  const toggleHistoryModal = () => {
    setIsHistoryModalOpen(!isHistoryModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "quantity" || name === "latestCost" || name === "salesPrice"
          ? parseFloat(value) || 0
          : value,
    });
  };

  const handleAddProduct = () => {
    const newProductTotal = formData.latestCost * formData.quantity;

    // Create a new product addition record latestCost
    const newProduct = {
      id: historyData.length + 1,
      ...formData,
      total: newProductTotal,
    };

    // Add this record to history
    setHistoryData([...historyData, newProduct]);

    // Update productsData to show the latest state of cat *
    const existingProductIndex = productsData.findIndex(
      (product) =>
        product.name === formData.name && product.cat === formData.cat
    );

    if (existingProductIndex !== -1) {
      const updatedProduct = { ...productsData[existingProductIndex] };
      updatedProduct.quantity += formData.quantity;
      updatedProduct.total += newProductTotal;
      updatedProduct.latestCost = formData.latestCost;
      updatedProduct.date = formData.date;

      // Get the two latest cost entries
      const latestCosts = historyData
        .filter(
          (product) =>
            product.name === formData.name && product.cat === formData.cat
        )
        .slice(-1)
        .map((product) => product.latestCost);

      latestCosts.push(formData.latestCost);

      // Calculate the average cost of the latest two entries
      updatedProduct.averageCost =
        latestCosts.reduce((acc, cost) => acc + cost, 0) / latestCosts.length;

      const updatedProductsData = [...productsData];
      updatedProductsData[existingProductIndex] = updatedProduct;

      setProductsData(updatedProductsData);
    } else {
      const newProductSummary = {
        id: productsData.length + 1,
        ...formData,
        total: newProductTotal,
        averageCost: formData.latestCost,
      };

      setProductsData([...productsData, newProductSummary]);
    }

    setFormData({
      date: getTodayDate(),
      name: "",
      cat: "",
      latestCost: 0,
      quantity: 0,
      salesPrice: 0,
    });

    toggleModal();
  };

  const handleCellRender = (args) => {
    if (args.column.field === "quantity") {
      const quantity = args.data[args.column.field];
      if (quantity && parseInt(quantity) < 25) {
        args.cell.classList.add("red");
      } else {
        args.cell.classList.remove("red");
      }
    }
  };

  const handleRowSelected = (args) => {
    const selectedRecord = args.data;
    // Filter the history to get records for the selected
    const history = historyData.filter(
      (product) =>
        product.name === selectedRecord.name &&
        product.cat === selectedRecord.cat
    );
    setInventoryHistory(history);
    toggleHistoryModal();
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <Header category="Page" title="Inventory" />

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={toggleModal}
        >
          Add New Product
        </button>
      </div>

      <GridComponent
        dataSource={productsData}
        allowPaging={true}
        pageSettings={{ pageCount: 5 }}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        toolbar={toolbarOptions}
        queryCellInfo={handleCellRender}
        rowSelected={handleRowSelected}
      >
        <ColumnsDirective>
          {productsGrid.map((column, index) => (
            <ColumnDirective
              key={index}
              field={column.field}
              headerText={column.headerText}
              textAlign={column.textAlign}
            />
          ))}
        </ColumnsDirective>
        <ColumnDirective
          field="averageCost"
          headerText="Average Cost"
          textAlign="Right"
        />
        <ColumnDirective
          field="salesPrice"
          headerText="Sales Price"
          textAlign="Right"
        />
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
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
              <label className="block text-sm mb-2">Category</label>
              <DropDownListComponent
                dataSource={categories}
                placeholder="Select a category"
                change={(e) => setFormData({ ...formData, cat: e.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Latest Cost</label>
              <input
                type="number"
                className="w-full border-gray-300 rounded-sm py-2 px-3"
                name="latestCost"
                value={formData.latestCost}
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
                onClick={handleAddProduct}
              >
                Add Product
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

      {isHistoryModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4">Inventory History</h2>

            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Category ID</th>
                  <th className="py-2 px-4 border-b">Latest Cost</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Total</th>
                </tr>
              </thead>
              <tbody>
                {inventoryHistory.map((product, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{product.date}</td>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.cat}</td>
                    <td className="py-2 px-4 border-b">{product.latestCost}</td>
                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                    <td className="py-2 px-4 border-b">{product.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
                onClick={toggleHistoryModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
