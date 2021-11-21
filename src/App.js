import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Products,
  Navbar,
  Cart,
  Checkout,
  AddProductToDatabase,
} from "./components/index.js";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState();
  const [lengthOfCart, setLengthOfCart] = useState(0);

  function fetchProducts() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        const response = JSON.parse(request.response);
        setProducts(response);
      }
    };
    request.open("GET", "/products", true);
    request.send();
  }



  const handleAddToCart = async (product, quantity) => {
    let tempCart = cart;
    
    let isPresent = false;

    if (tempCart != null) {
      for(let item of tempCart){
        if (item._id === product._id) {
          isPresent = true;
          item.quantity = item.quantity + 1;
          setQuantity(item.quantity);
        }
      }
    }

    if (isPresent === false) {
      tempCart.push({ ...product, quantity: quantity });
    }
    setCart(tempCart);
  };

  const handleSubtractCart = async (product, quantity) => {
    let tempCart = cart;
    
    let isPresent = false;

    if (tempCart != null) {
      for(let item of tempCart){
        if (item._id === product._id) {
          isPresent = true;
          item.quantity = Math.max(item.quantity - 1, 0);

          if(item.quantity === 0)
            tempCart.splice(item._id, 1);

          setQuantity(item.quantity);
        }
      }
    }

    if (isPresent === false) {
      tempCart.push({ ...product, quantity: quantity });
    }

    setCart(tempCart);
  };

  const handleEmptyCart = async () => {
    let tempCart = cart;
    tempCart.length = 0;
    setCart(tempCart);
  };

   useEffect(() => {
    fetchProducts();
  }, []);

  useEffect (()=>{
    let len = cart.length;
    setLengthOfCart(len);
    console.log(lengthOfCart);

  },[cart])

  return (
    <Router>
      <div className="App">
        <Navbar lengthOfCart={lengthOfCart} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>

          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleAddToCart={handleAddToCart}
              handleSubtractCart={handleSubtractCart}
              handleEmptyCart={handleEmptyCart}
              quantity = {quantity}
            />
          </Route>

          <Route exact path="/add">
            <AddProductToDatabase />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
