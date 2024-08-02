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
import { usersGrid } from "../data/mockData/gridOutlook";

const Users = () => {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const toolbarOptions = ["Search"];

  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    name: "",
    email: "",
    password: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = () => {
    const newUser = {
      id: userData.length + 1,
      ...formData,
    };

    console.log(newUser);
    setUserData([...userData, newUser]);
    setFormData({ date: getTodayDate(), name: "", email: "", password: "" });
    toggleModal();
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <Header category="Page" title="Users" />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={toggleModal}
        >
          Add New User
        </button>
      </div>

      <GridComponent
        dataSource={userData}
        allowPaging={true}
        pageSettings={{ pageCount: 5 }}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {usersGrid.map((column, index) => (
            <ColumnDirective
              key={index}
              field={column.field}
              headerText={column.headerText}
              textAlign={column.textAlign}
              width={column.width}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4">Add New User</h2>
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
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                className="w-full border-gray-300 rounded-sm py-2 px-3"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                className="w-full border-gray-300 rounded-sm py-2 px-3"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={handleAddUser}
              >
                Add User
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

export default Users;
