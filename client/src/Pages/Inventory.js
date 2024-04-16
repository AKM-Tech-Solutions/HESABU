import { useState } from "react";

function Inventory() {
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(new Date());

  const [users] = useState([]);
  const [name, setName] = useState();

  const [sum, setSum] = useState();

  function Calculation() {
    users.push({ date, name, qty, price, sum });

    const total = users.reduce((total, user) => {
      total += Number(user.sum);
      return total;
    }, 0);

    setTotal(total);

    setName(""); //the input fields are cleared
    setQty("");
    setPrice("");
    setSum("");
    setDate("");
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
  };
  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
      calculateTotal(newPrice, qty);
    }
  };

  // Event handler for quantity selection
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQty(newQuantity);
      calculateTotal(price, newQuantity);
    }
  };

  // Calculate the total based on price and quantity
  const calculateTotal = (price, qty) => {
    const newTotal = price * qty;
    setSum(newTotal);
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-sm-8">
          <table className="table table-bordered text-[20px] text-black ">
            <h3 align="left" className="text-[36px] text-white font-semibold">
              {" "}
              New Stock{" "}
            </h3>
            <tr>
              <th>Date</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Option</th>
            </tr>
            <tr className="gap-3">
              <td>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date"
                  value={date.toLocaleString()}
                  onChange={handleDateChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Qty"
                  value={qty}
                  onChange={handleQuantityChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={sum}
                  className="form-control"
                  placeholder="Enter Total"
                  id="total_cost"
                  name="total_cost"
                  disabled
                />
              </td>
              <td>
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={Calculation}
                >
                  Add
                </button>
              </td>
            </tr>
          </table>
          <h3 align="left"> Products </h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Item Name</th>

                <th>Price</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {users.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.name}</td>
                  <td>{row.price}</td>

                  <td>{row.qty}</td>
                  <td>{row.sum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-sm-4">
          <div className="form-group" align="left">
            <h3>Total</h3>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Total"
              required
              disabled
              value={total}
            />
            <br />
            <button
              type="button"
              className="btn btn-success"
              onClick={refreshPage}
            >
              {" "}
              <span>Export</span>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
