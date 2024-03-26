import React, { useEffect, useRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ValidationError from "./ValidationError";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authAction";
import { useDispatch, useSelector } from "react-redux";
import useTitle from "../hooks/useTitle";

const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address.").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
      "Password must be at least 8 characters, have a number, a lower case letter, an uppercase letter and a special character."
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords don't match"),
});

const Register = () => {
  useTitle("Register");

  const { loading, userInfo, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (success) navigate("/", { state: { registered: true } });
    if (userInfo) navigate("/profile");
  }, [navigate, userInfo, success]);

  const onRegister = (values, { setSubmitting }) => {
    console.log("registeirng with these details", values);
    setSubmitting(false);
    dispatch(registerUser(values));
  };

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={RegistrationSchema}
      onSubmit={onRegister}
    >
      {({ isSubmitting, errors, touched }) => (
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
          {errors.username && touched.username && (
            <ErrorMessage name="username" component={ValidationError} />
          )}
          <div className="input-group">
            <Field innerRef={emailRef} type="email" name="email" required />
            <label htmlFor="email" onClick={() => emailRef.current.focus()}>
              Email
            </label>
          </div>
          {errors.email && touched.email && (
            <ErrorMessage name="email" component={ValidationError} />
          )}
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
          {errors.password && touched.password && (
            <ErrorMessage name="password" component={ValidationError} />
          )}
          <div className="input-group">
            <Field
              innerRef={confirmPasswordRef}
              type="password"
              name="confirmPassword"
              required
            />
            <label
              htmlFor="confirmPassword"
              onClick={() => confirmPasswordRef.current.focus()}
            >
              Confirm password
            </label>
          </div>
          {errors.password && touched.password && (
            <ErrorMessage name="confirmPassword" component={ValidationError} />
          )}
          <button
            className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
            type="submit"
            disabled={loading}
          >
            Register
          </button>
          <p className="form-message">
            Already have an account? <Link to="/">Log in</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
