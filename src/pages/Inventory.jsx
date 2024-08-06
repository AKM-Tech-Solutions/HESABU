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

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [productsData, setProductsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityLimits, setQuantityLimits] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditProduct, setCurrentEditProduct] = useState(null);

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

  const toggleLimitModal = () => {
    setSelectedProduct(null);
    setIsLimitModalOpen(!isLimitModalOpen);
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

  const handleLimitChange = (e) => {
    const { value } = e.target;
    setQuantityLimits((prevLimits) => ({
      ...prevLimits,
      [selectedProduct]: parseInt(value, 10) || 0,
    }));
  };

  const handleAddProduct = () => {
    if (isEditMode) {
      handleUpdateProduct();
      return;
    }

    const newProductTotal = formData.latestCost * formData.quantity;

    const newProduct = {
      id: historyData.length + 1,
      ...formData,
      total: newProductTotal,
    };

    setHistoryData([...historyData, newProduct]);

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
      updatedProduct.salesPrice = formData.salesPrice;

      const latestCosts = historyData
        .filter(
          (product) =>
            product.name === formData.name && product.cat === formData.cat
        )
        .slice(-1)
        .map((product) => product.latestCost);

      latestCosts.push(formData.latestCost);

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

  const handleUpdateProduct = () => {
    const updatedProducts = productsData.map((product) =>
      product.id === currentEditProduct.id
        ? {
            ...product,
            ...formData,
            total: formData.latestCost * formData.quantity,
          }
        : product
    );

    setProductsData(updatedProducts);

    setFormData({
      date: getTodayDate(),
      name: "",
      cat: "",
      latestCost: 0,
      quantity: 0,
      salesPrice: 0,
    });

    setIsEditMode(false);
    setCurrentEditProduct(null);
    toggleModal();
  };

  const handleCellRender = (args) => {
    if (args.column.field === "actions") {
      const editButton = args.cell.querySelector(".edit-btn");
      const deleteButton = args.cell.querySelector(".delete-btn");

      if (editButton) {
        editButton.addEventListener("click", () => handleEdit(args.data));
      }

      if (deleteButton) {
        deleteButton.addEventListener("click", () =>
          handleDelete(args.data.id)
        );
      }
    }

    if (args.column.field === "quantity") {
      const quantity = args.data[args.column.field];
      const category = args.data.name;
      const limit = quantityLimits[category];
      if (quantity && parseInt(quantity) < limit) {
        args.cell.classList.add("red");
      } else {
        args.cell.classList.remove("red");
      }
    }
  };

  const handleEdit = (product) => {
    setIsEditMode(true);
    setCurrentEditProduct(product);
    setFormData({
      date: product.date,
      name: product.name,
      cat: product.cat,
      latestCost: product.latestCost,
      quantity: product.quantity,
      salesPrice: product.salesPrice,
    });
    toggleModal();
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = productsData.filter(
        (product) => product.id !== productId
      );
      setProductsData(updatedProducts);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRecord = args.data;
    const history = historyData.filter(
      (product) =>
        product.name === selectedRecord.name &&
        product.cat === selectedRecord.cat
    );
    setInventoryHistory(history);
    toggleHistoryModal();
  };

  const getProductOptions = () => {
    const productOptions = productsData.map((product, index) => ({
      id: index,
      name: product.name,
    }));
    return productOptions;
  };

  const categories = ["Category1", "Category2", "Category3"];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <Header category="Page" title="Inventory" />
        <div className="flex">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
            onClick={() => {
              setIsEditMode(false);
              toggleModal();
            }}
          >
            Add New Product
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
            onClick={toggleLimitModal}
          >
            Set Quantity Limit
          </button>
        </div>
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
              width={column.width}
              textAlign={column.textAlign}
              template={column.template}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4">
              {isEditMode ? "Edit Product" : "Add New Product"}
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
                id="categories"
                fields={{ text: "category", value: "id" }}
                dataSource={categories.map((cat, index) => ({
                  id: index,
                  category: cat,
                }))}
                placeholder="Select a category"
                change={(e) =>
                  setFormData({ ...formData, cat: e.itemData.category })
                }
                value={formData.cat}
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
                {isEditMode ? "Update" : "Save"}
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
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
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Category</th>
                    <th className="py-2 px-4 border-b">Latest Cost</th>
                    <th className="py-2 px-4 border-b">Quantity</th>
                    <th className="py-2 px-4 border-b">Sales Price</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryHistory.map((product, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{product.date}</td>
                      <td className="py-2 px-4 border-b">{product.name}</td>
                      <td className="py-2 px-4 border-b">{product.cat}</td>
                      <td className="py-2 px-4 border-b">
                        {product.latestCost}
                      </td>
                      <td className="py-2 px-4 border-b">{product.quantity}</td>
                      <td className="py-2 px-4 border-b">
                        {product.salesPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                onClick={toggleHistoryModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isLimitModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4">Set Quantity Limit</h2>
            <div className="mb-4">
              <label className="block text-sm mb-2">Product</label>
              <DropDownListComponent
                id="products"
                fields={{ text: "name", value: "id" }}
                dataSource={getProductOptions()}
                placeholder="Select a product"
                change={(e) => setSelectedProduct(e.itemData.name)}
                value={selectedProduct}
              />
            </div>
            {selectedProduct && (
              <div className="mb-4">
                <label className="block text-sm mb-2">Quantity Limit</label>
                <input
                  type="number"
                  className="w-full border-gray-300 rounded-sm py-2 px-3"
                  name="limit"
                  value={quantityLimits[selectedProduct] || ""}
                  onChange={handleLimitChange}
                />
              </div>
            )}
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={toggleLimitModal}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                onClick={toggleLimitModal}
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
