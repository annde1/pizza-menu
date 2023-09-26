import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
/*Importing external css file: */
import "./index.css";
//Profile Card Challange: "https://codesandbox.io/s/crimson-browser-pqry3v?file=/src/index.js"
// https://codesandbox.io/s/react-challenge-dev-profile-final-v2-e8zj9o?file=/src/index.js
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

//Nesting:
const App = () => {
  return (
    <div className="container">
      <Header></Header>
      <Menu></Menu>
      <Footer></Footer>
    </div>
  );
};
const Header = () => {
  //Css properties with "-" were converted in React to camelCase: text-align -> textAlign
  //   const style = {}; //We can pass style object
  return (
    <header className="header">
      <h1>React Pizza Co.</h1>
    </header>
  );
};
const Menu = () => {
  //I guess that here we will map on the pizzas array and return Pizza component with props
  //Passing the props in the component:
  //Pasing the current Pizza Object
  const pizzas = pizzaData; //Conditional rendering. Render the list of pizzas only if there are some pizzas
  const numOfPizzas = pizzas.length;
  return (
    //we need to check for length of pizzas array, if it's grater than 0. We can't use just a number because if zero will be returned then 0 will be render (that's how short circuting works)
    <main className="menu">
      <h2>Our Menu</h2>

      {numOfPizzas > 0 ? (
        <Fragment>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from out stone oven,a ll organic , all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza, index) => (
              <Pizza key={index} pizzaObj={pizza}>
                {" "}
              </Pizza>
            ))}
          </ul>
        </Fragment>
      ) : (
        <p>We're still working on out menu. Please come back later.</p>
      )}
    </main>
  );
};
// {} accepts anything that produces value. Noo if else
//Passing the props in the component (as function argument) using destructuring. the destructured object needs to exctly match the prop obj name
const Pizza = ({ pizzaObj }) => {
  console.log(pizzaObj);
  //If pizza is sold out return early
  //   if (pizzaObj.soldOut) return null;
  //If we return early this won't be rendered
  //Passing className conditionally using ternary operator
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
        <span></span>
      </div>
    </li>
  );
};
const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 14;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  //Possible to do conditional rendering with multiple returns:
  //   if (!isOpen) {
  //     return <p>CLOSED</p>;
  //   }
  return (
    <footer className="footer">
      {" "}
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour}></Order>
      ) : (
        <p>
          We're happy to welcome you between {openHour} and {closeHour}
        </p>
      )}
    </footer>
  );
  //we're currently open will be rendered or not based on the value returned from isOpen (short circuting). In && operator two values must be true
};
//Extarted the order into it's own component. Passing theclose hour as props using destructurig
const Order = ({ closeHour, openHour }) => {
  return (
    <div className="order">
      <p>We're open until {closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
};

//React version 18 (rendering root):
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); //Root component renders the App
//Before React 18:
//React.render(<App />,document.getElementById("root") )
