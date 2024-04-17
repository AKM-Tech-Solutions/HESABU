import React from "react";
import "./Styles/Dashboard.css";
import { useEffect, useState } from "react";
import Card from "../Components/Card";

function Dashboard() {
  const [cards, setCards] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/cards")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="dashboard section">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            {cards &&
              cards.length > 0 &&
              cards.map((card) => <Card key={card._id} card={card} />)}
          </div>
        </div>
        <div className="col-lg-8"></div>
      </div>
    </section>
  );
}

export default Dashboard;
