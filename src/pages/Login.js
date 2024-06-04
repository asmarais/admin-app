import React, { useState, useEffect, useLayoutEffect } from "react";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      clearErrors();
      console.log("Form submitted:", formData);
      const requestData = {
        username: formData.username,
        password: formData.password,
        role: "",
      };
      api
        .post("auth/login", requestData)
        .then((response) => {
          console.log(response.data);
          const token = JSON.stringify(response.data.accessToken);
          localStorage.setItem("Token", token);
          const refreshTokenData = JSON.stringify(response.data.refreshToken);
          console.log("ref", refreshTokenData);
          localStorage.setItem("RefreshToken", refreshTokenData);
          const decodedToken = jwtDecode(token);
          //Get the role from the token
          const auth = {
            userName: decodedToken["name"],
            role: decodedToken["role"],
          };

          localStorage.setItem("Auth", JSON.stringify(auth));
          console.log("auth", JSON.stringify(auth));
          navigate("/");
        })
        .catch((error) => {
          console.error("Error fetching login:", error);
        });
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">
            Username <span className="required">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" className="login">
          Login
        </button>
      </form>
    </div>
  );
}
