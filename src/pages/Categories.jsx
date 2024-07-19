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
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    catId: "",
  });

  const toggleModal = () => {
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
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    const newCategory = {
      id: categoryData.length + 1,
      ...formData,
    };

    console.log(newCategory);
    setCategoryData([...categoryData, newCategory]);
    setFormData({ image: "", name: "", catId: "" });
    toggleModal();
  };

  const imageTemplate = (props) => {
    if (props.image) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: `<img src="${props.image}" alt="${props.name}" style="width:120px; height:135px; border-radius:8px;" />`,
          }}
        />
      );
    } else {
      return <span>No Image</span>;
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <Header category="Page" title="Categories" />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={toggleModal}
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
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <div className="mb-4">
              <label className="block text-sm mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-30 h-30 border-gray-300 rounded-sm py-2 px-3"
                onChange={handleFileChange}
              />
              {formData.image && (
                <div className="mb-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
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

            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={handleAddCategory}
              >
                Add Category
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

export default Categories;
