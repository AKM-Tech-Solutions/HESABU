// import React, { useEffect, useState } from "react";
// import {
//   GridComponent,
//   ColumnsDirective,
//   ColumnDirective,
//   Inject,
//   Search,
//   Page,
//   Toolbar,
// } from "@syncfusion/ej2-react-grids";
// import {
//   LineSeries,
//   Inject as ChartInject,
//   Legend,
//   Category,
//   ChartComponent,
//   SeriesCollectionDirective,
//   SeriesDirective,
//   DataLabel,
// } from "@syncfusion/ej2-react-charts";
// import Header from "../components/Header";
// import { transactionsGrid } from "../data/mockData/gridOutlook";
// import Loaders from "../components/Loaders/Loaders";
// import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

// const Transactions = () => {
//   const toolbarOptions = ["Search"];
//   const products = ["Products1", "Products2", "Products3"];
//   const [transactionsData, setTransactionsData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // function for today's date
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   };
//   const [formData, setFormData] = useState({
//     date: getTodayDate(),
//     name: "",
//     quantity: 0,
//     salesPrice: 0,
//     total: 0,
//   });

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddTransaction = () => {
//     const newProductTotal = formData.salesPrice * formData.quantity;

//     const newTransaction = {
//       id: transactionsData.length + 1,
//       ...formData,
//       total: newProductTotal,
//     };
//     setTransactionsData([...transactionsData, newTransaction]);

//     // Reset formData state after adding
//     setFormData({
//       date: "",
//       name: "",
//       quantity: 0,
//       salesPrice: 0,

//       total: 0,
//     });

//     // Close modal after adding Transaction
//     toggleModal();
//   };

//   // Loader
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to fetch data (replace with your actual logic)
//   const fetchData = async () => {
//     setIsLoading(true);
//     // Simulate data fetching
//     const response = await new Promise((resolve) =>
//       setTimeout(() => resolve([]), 3000)
//     );
//     setTransactionsData(response);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//     if (isModalOpen) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         date: getTodayDate(),
//       }));
//     }
//   }, [isModalOpen]);

//   return (
//     <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
//       <div className="flex justify-between items-center mb-4">
//         <Header category="Page" title="Transaction" />
//         <button
//           className="bg-blue-500 text-white py-2 px-4 rounded-lg"
//           onClick={toggleModal}
//         >
//           Add New Transaction
//         </button>
//       </div>

//       {/* Grid Component */}
//       <GridComponent
//         dataSource={transactionsData}
//         allowPaging={true}
//         pageSettings={{ pageCount: 5 }}
//         editSettings={{ allowDeleting: true, allowEditing: true }}
//         toolbar={toolbarOptions}
//       >
//         <ColumnsDirective>
//           {transactionsGrid.map((column, index) => (
//             <ColumnDirective
//               key={index}
//               field={column.field}
//               headerText={column.headerText}
//               textAlign={column.textAlign}
//             />
//           ))}
//         </ColumnsDirective>
//         <Inject services={[Search, Page, Toolbar]} />
//       </GridComponent>

//       {/* Line Chart */}
//       {isLoading ? (
//         <div className="flex justify-center">
//           <Loaders />
//         </div>
//       ) : (
//         <div className="mb-6 mt-6">
//           <LineSeriesChart graphData={transactionsData} />
//         </div>
//       )}

//       {/* Modal for Adding New Transaction */}
//       {isModalOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg p-8">
//             <h2 className="text-lg font-semibold mb-4">Add New Transaction</h2>
//             <div className="mb-4">
//               <label className="block text-sm mb-2">Date</label>
//               <input
//                 type="date"
//                 className="w-full border-gray-300 rounded-sm py-2 px-3"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-2">Product Name</label>
//               <DropDownListComponent
//                 dataSource={products}
//                 placeholder="Select a product"
//                 change={(e) => setFormData({ ...formData, name: e.value })}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm mb-2">Quantity</label>
//               <input
//                 type="number"
//                 className="w-full border-gray-300 rounded-sm py-2 px-3"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-2">Sales Price</label>
//               <input
//                 type="number"
//                 className="w-full border-gray-300 rounded-sm py-2 px-3"
//                 name="salesPrice"
//                 value={formData.salesPrice}
//                 onChange={handleChange}
//               />
//             </div>
//             {/* <div className="mb-4">
//               <label className="block text-sm mb-2">Total</label>
//               <input
//                 type="number"
//                 className="w-full border-gray-300 rounded-sm py-2 px-3"
//                 name="total"
//                 value={formData.total}
//                 onChange={handleChange}
//               />
//             </div> */}

//             <div className="flex justify-end">
//               <button
//                 className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
//                 onClick={handleAddTransaction}
//               >
//                 Add Transaction
//               </button>
//               <button
//                 className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
//                 onClick={toggleModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const LineSeriesChart = ({ graphData }) => {
//   // Grouping the transactions by product name and date
//   const groupedData = graphData.reduce((acc, transaction) => {
//     const date = transaction.date;
//     const name = transaction.name;
//     const total = parseInt(transaction.total);

//     if (!acc[name]) {
//       acc[name] = [];
//     }

//     // push the data point into the corresponding product array
//     acc[name].push({ date, total });
//     return acc;
//   }, {});

//   //  generate a random color
//   function getRandomColor() {
//     return `#${Math.floor(Math.random() * 16777215)
//       .toString(16)
//       .padStart(6, "0")}`;
//   }

//   return (
//     <ChartComponent
//       title="Transactions Analysis"
//       primaryXAxis={{ valueType: "Category", title: "Date" }}
//       primaryYAxis={{ title: "Total" }}
//       legendSettings={{ visible: true }}
//     >
//       <SeriesCollectionDirective>
//         {Object.entries(groupedData).map(([name, data], index) => {
//           const color = getRandomColor();
//           return (
//             <SeriesDirective
//               key={index}
//               dataSource={data}
//               xName="date"
//               yName="total"
//               type="Line"
//               name={name}
//               marker={{ visible: true }}
//               fill={color}
//             />
//           );
//         })}
//       </SeriesCollectionDirective>
//       <ChartInject services={[LineSeries, Category, Legend, DataLabel]} />
//     </ChartComponent>
//   );
// };

// export default Transactions;

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
  const products = ["Products1", "Products2", "Products3"];
  const [transactionsData, setTransactionsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // function for today's date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    date: getTodayDate(),
    name: "",
    quantity: 0,
    salesPrice: 0,
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
    const newProductTotal = formData.salesPrice * formData.quantity;

    const newTransaction = {
      id: transactionsData.length + 1,
      ...formData,
      total: newProductTotal,
    };

    setTransactionsData([...transactionsData, newTransaction]);

    // Reset formData state after adding
    setFormData({
      date: getTodayDate(),
      name: "",
      quantity: 0,
      salesPrice: 0,
      total: 0,
    });

    // Close modal after adding Transaction
    toggleModal();
  };

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch data
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

  useEffect(() => {
    if (isModalOpen) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: getTodayDate(),
      }));
    }
  }, [isModalOpen]);

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
  // Grouping the transactions by product name and date
  const groupedData = graphData.reduce((acc, transaction) => {
    const date = transaction.date;
    const name = transaction.name;
    const total = parseInt(transaction.total);

    if (!acc[name]) {
      acc[name] = [];
    }

    // push the data point into the corresponding product array
    acc[name].push({ date, total });
    return acc;
  }, {});

  //  generate a random color
  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  }

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
                border: { width: 2, color: color },
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
