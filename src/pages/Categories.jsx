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
import { Header } from "../components";
import { categoriesGrid } from "../data/mockData/gridOutlook";

const Categories = () => {
  const toolbarOptions = ["Search"];

  const [categoryData, setCategoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    type: "",
  });

  const toggleModal = (category = null) => {
    setEditingCategory(category);
    if (category) {
      setFormData({
        image: category.image || "",
        name: category.name || "",
        type: category.type || "",
      });
    } else {
      setFormData({ image: "", name: "", type: "" });
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (jpeg, png, gif).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleAddOrUpdateCategory = () => {
    if (editingCategory) {
      // Update existing category
      const updatedCategoryData = categoryData.map((cat) =>
        cat.id === editingCategory.id
          ? { ...editingCategory, ...formData }
          : cat
      );
      setCategoryData(updatedCategoryData);
    } else {
      // Add new category
      const newCategory = {
        id: categoryData.length + 1,
        ...formData,
        backgroundColor: generateRandomColor(),
      };
      setCategoryData([...categoryData, newCategory]);
    }
    setFormData({ image: "", name: "", type: "" });
    toggleModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const updatedCategoryData = categoryData.filter((cat) => cat.id !== id);
      setCategoryData(updatedCategoryData);
    }
  };

  const imageTemplate = (props) => {
    if (props.image) {
      return (
        <div className="flex justify-center items-center">
          <img
            src={props.image}
            alt={props.name}
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
          />
        </div>
      );
    } else {
      return <div className="flex justify-center items-center">No Image</div>;
    }
  };

  const actionTemplate = (props) => {
    return (
      <div className=" ml-20 flex gap-5">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
          onClick={() => toggleModal(props)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-800"
          onClick={() => handleDelete(props.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  const onQueryCellInfo = (args) => {
    if (args.data.backgroundColor) {
      args.cell.style.backgroundColor = args.data.backgroundColor;
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-4 md:p-10 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Header category="Page" title="Categories" />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={() => toggleModal(null)}
        >
          Add New Category
        </button>
      </div>

      <GridComponent
        dataSource={categoryData}
        allowPaging={true}
        pageSettings={{ pageCount: 5 }}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        toolbar={toolbarOptions}
        queryCellInfo={onQueryCellInfo}
      >
        <ColumnsDirective>
          {categoriesGrid.map((column, index) => (
            <ColumnDirective
              key={index}
              field={column.field}
              headerText={column.headerText}
              textAlign={column.textAlign}
              template={column.field === "image" ? imageTemplate : null}
              width={column.width}
            />
          ))}
          <ColumnDirective
            headerText="Actions"
            template={actionTemplate}
            textAlign="Center"
            headerTextAlign="Center"
            width="80"
          />
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                onChange={handleFileChange}
              />
              {formData.image && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Category Type</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={handleAddOrUpdateCategory}
              >
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
              <button
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                onClick={() => toggleModal(null)}
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

export default Categories;
