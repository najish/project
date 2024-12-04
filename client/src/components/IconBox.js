import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const IconBox = () => {
  const iconStyle = {
    background: "none", // Ensures no background is applied
    width: "100px",     // Set icon width
    height: "100px",    // Set icon height
    display: "block",   // Optional for centering or alignment
  };

  return <FaShoppingCart style={iconStyle} />;
};

export default IconBox;
