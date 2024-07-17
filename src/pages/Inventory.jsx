import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
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

  const [productsData, setProductsData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    catId: "",
    defaultPrice: 0,
    quantity: 0,
    total: 0,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? parseInt(value, 10) || 0 : value, // always make sure the quantity is number
    });
  };

  const handleAddProduct = () => {
    const newProductTotal = formData.defaultPrice * formData.quantity;
    const existingProductIndex = productsData.findIndex(
      (product) =>
        product.name === formData.name && product.catId === formData.catId
    );

    if (existingProductIndex !== -1) {
      // Update existing product
      const updatedProduct = { ...productsData[existingProductIndex] };
      updatedProduct.quantity += parseInt(formData.quantity, 10);
      updatedProduct.total += newProductTotal;
      const updatedProductsData = [...productsData];
      updatedProductsData[existingProductIndex] = updatedProduct;

      setProductsData(updatedProductsData);
    } else {
      // Add as new product
      const newProduct = {
        id: productsData.length + 1,
        ...formData,
        total: newProductTotal,
      };

      setProductsData([...productsData, newProduct]);
    }

    // Reset formData state after adding
    setFormData({
      date: "",
      name: "",
      catId: "",
      defaultPrice: 0,
      quantity: 0,
    });

    // Close modal after adding product
    toggleModal();
  };

  //correct
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

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <Header category="Page" title="Inventory" />

        {/* Add New Product button */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={toggleModal}
        >
          Add New Product
        </button>
      </div>
      {/* Grid Component */}
      <GridComponent
        dataSource={productsData}
        allowPaging={true}
        pageSettings={{ pageCount: 5 }}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        toolbar={toolbarOptions}
        queryCellInfo={handleCellRender}
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
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>

      {/* Modal for Adding New Product */}
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
              <label className="block text-sm mb-2">Category ID</label>
              <input
                type="text"
                className="w-full border-gray-300 rounded-sm py-2 px-3"
                name="catId"
                value={formData.catId}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Default Price</label>
              <input
                type="number"
                className="w-full border-gray-300 rounded-sm py-2 px-3"
                name="defaultPrice"
                value={formData.defaultPrice}
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
    </div>
  );
};

export default Inventory;