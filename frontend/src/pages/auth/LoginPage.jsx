import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./LoginPage.css"; // import the CSS file here
import logo from "../../assets/logo.png";


// const logoutButton = async () => {
//   try {
//     const res = await fetch("/api/v1/auth/logout", {
//       method: "POST",
//     });
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
<img src={logo} alt="Logo" className="login-image" />

      <div className="login-form-container">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <h1 className="login-header">{"Welcome"} learner.</h1>
          <label className="input-field">
            <MdOutlineMail />
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>

          <label className="input-field">
            <MdPassword />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="login-button" type="submit">
            {isPending ? "Loading..." : "Login"}
          </button>
          {isError && <p className="error-message">{error.message}</p>}
        </form>
        <div className="signup-container">
          <p>{"Don't"} have an account?</p>
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </div>
        {/* <button onClick={logoutButton} className="logout-button">
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default LoginPage;
