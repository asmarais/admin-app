import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h1>Unauthorized Access</h1>
      <p>
        You don't have permission to access this page.You don't have permission
        to access this page.You don't have permission to access this page.You
        don't have permission to access this page.You don't have permission to
        access this page.
      </p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Unauthorized;
