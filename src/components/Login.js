import React, { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authAction";
import ValidationError from "./ValidationError";
import useTitle from "../hooks/useTitle";
import { useSendPasswordResetEmailMutation } from "../app/services/auth/authService";

const Login = () => {
  useTitle("Login");

  const { state } = useLocation();
  console.log("login state", state);

  const justRegistered = state?.registered;
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

  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <Formik initialValues={{ username: "", password: "" }} onSubmit={onLogin}>
      {() => (
        <Form>
          <div className="input-group">
            <Field
              innerRef={usernameRef}
              type="text"
              name="username"
              required
            />
            <label
              htmlFor="username"
              onClick={() => usernameRef.current.focus()}
            >
              Username
            </label>
          </div>
          <div className="input-group">
            <Field
              innerRef={passwordRef}
              type="password"
              name="password"
              required
            />
            <label
              htmlFor="password"
              onClick={() => passwordRef.current.focus()}
            >
              Password
            </label>
          </div>
          {error && <ValidationError>{error}</ValidationError>}
          <button
            className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
            type="submit"
            disabled={loading}
          >
            Login
          </button>
          {justRegistered && (
            <p className="form-message form-message-success">
              Sign up successful! You can now log in.
            </p>
          )}
          <p className="form-message">
            Forgot password? Click <Link to="/register">here</Link> to reset it.
          </p>
          <p className="form-message">
            Don't have an account? <Link to="/register">Sign up now</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
