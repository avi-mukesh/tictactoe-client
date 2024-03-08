import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authAction";

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
    console.log("logging in with these details", values);
    setSubmitting(false);
    dispatch(loginUser(values));
    navigate("/profile");
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
