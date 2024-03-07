import React from "react";
import Board from "./Board";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import SpectateButton from "./SpectateButton";

const Login = () => {
  const onLogin = (values, { setSubmitting }) => {
    console.log("logging on with these details", values);
    setSubmitting(false);
  };

  return (
    <Formik initialValues={{ username: "", password: "" }} onSubmit={onLogin}>
      {({ isSubmitting }) => (
        <Form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="username" component="div" />
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
