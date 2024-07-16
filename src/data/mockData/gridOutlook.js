// export const gridCategoryImage = (props) => (
//   <div>
//     <img
//       className="rounded-xl h-20 md:ml-3"
//       alt="Category"
//       src={
//         props.image.startsWith("data:image/")
//           ? props.image
//           : `data:image/png;base64,${props.image}`
//       }
//     />
//   </div>
// );
const gridCategoryImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      alt="Category"
      src={props.image}
      onError={(e) => {
        e.target.src = "../../../public/favicon.ico";
      }}
    />
  </div>
);

export const productsGrid = [
  {
    field: "date",
    headerText: "Date",
    width: "135",
    textAlign: "Center",
  },
  {
    field: "name",
    headerText: "Products Name",
    width: "135",
    textAlign: "Center",
  },
  {
    field: "catId",
    headerText: "Category ID",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "defaultPrice",
    headerText: "Default Price",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "quantity",
    headerText: "Quantity",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "total",
    headerText: "Total",
    width: "135",
    textAlign: "Center",
  },
];
export const transactionsGrid = [
  {
    field: "date",
    headerText: "Date",
    width: "135",
    textAlign: "Center",
  },
  {
    field: "name",
    headerText: "Products Name",
    width: "135",
    textAlign: "Center",
  },
  {
    field: "quantity",
    headerText: "Quantity",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "total",
    headerText: "Total",
    width: "135",
    textAlign: "Center",
  },
];

export const categoriesGrid = [
  {
    field: "image",
    headerText: "Category Image",
    template: gridCategoryImage,
    width: "120",
    textAlign: "Center",
  },
  {
    field: "name",
    headerText: "Category Name",
    width: "135",

    textAlign: "Center",
  },
  {
    field: "catId",
    headerText: "Category ID",
    width: "120",

    textAlign: "Center",
  },
];
