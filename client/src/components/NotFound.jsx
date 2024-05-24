import React from "react";
import img from "../assets/405.jpg";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <img src={img} alt="page not found" />
    </div>
  );
};

export default NotFound;
