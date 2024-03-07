import React from "react";
import Board from "./Board";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import SpectateButton from "./SpectateButton";

const Login = () => {
  const navigate = useNavigate();

  const onLogin = (values, { setSubmitting }) => {
    console.log("logging in with these details", values);
    setSubmitting(false);

    navigate("/play");
  };

  return (
    <Formik initialValues={{ username: "", password: "" }} onSubmit={onLogin}>
      {({ isSubmitting }) => (
        <Form>
          <div className="input-group">
            <Field type="text" name="username" required />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-group">
            <Field type="password" name="password" required />
            <label htmlFor="password">Password</label>
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </button>
          <p className="form-message">
            Don't have an account? <Link to="/register">Sign up now</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
