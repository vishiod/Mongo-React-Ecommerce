import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";

import { Link, useLocation } from "react-router-dom";


const AddProductToDatabase = () => {
  return (
    <>
      <div class="container">
        <h1 class="brand">
          <span>Add Data To Database</span> 
        </h1>
        <div class="wrapper">
          <div class="contact">
            <form id="contactForm" action="http://localhost:8000/submit" method="post">
              <p>
                <label>Name: </label>
                <input type="text" name="name" id="name" required />
              </p>
              <p>
                <label>Price: </label>
                <input type="text" name="price" id="price" />
              </p>
              <p>
                <label>Image: </label>
                <input type="file" name="image" id="image" required />
              </p>
              <p>
                <label>Description: </label>
                <input type="text" name="description" id="description" />
              </p>
              <p class="full">
                <button type="submit">Submit</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductToDatabase;
