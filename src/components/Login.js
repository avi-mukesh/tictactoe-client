import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authAction";
import ValidationError from "./ValidationError";

const Login = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const onLogin = (values, { setSubmitting }) => {
    setSubmitting(false);
    // if logged in successfully, userInfo will be updated, causing the callback in the above useEffect to be run
    dispatch(loginUser(values));
  };

  return (
    <Formik initialValues={{ username: "", password: "" }} onSubmit={onLogin}>
      {() => (
        <Form>
          <div className="input-group">
            <Field type="text" name="username" required />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-group">
            <Field type="password" name="password" required />
            <label htmlFor="password">Password</label>
          </div>
          {error && <ValidationError>{error}</ValidationError>}
          <button
            className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
            type="submit"
            disabled={loading}
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
