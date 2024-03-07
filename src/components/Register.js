import React from "react";
import Board from "./Board";
import SpectateButton from "./SpectateButton";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ValidationError from "./ValidationError";
import { Link } from "react-router-dom";

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
  const onRegister = (values, { setSubmitting }) => {
    console.log("registeirng with these details", values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={RegistrationSchema}
      onSubmit={onRegister}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <div className="input-group">
            <Field type="text" name="username" required />
            <label htmlFor="username">Username</label>
          </div>
          {errors.username && touched.username && (
            <ErrorMessage name="username" component={ValidationError} />
          )}
          <div className="input-group">
            <Field type="email" name="email" required />
            <label htmlFor="username">Email</label>
          </div>
          {errors.email && touched.email && (
            <ErrorMessage name="email" component={ValidationError} />
          )}
          <div className="input-group">
            <Field type="password" name="password" required />
            <label htmlFor="password">Password</label>
          </div>
          {errors.password && touched.password && (
            <ErrorMessage name="password" component={ValidationError} />
          )}
          <div className="input-group">
            <Field type="password" name="confirmPassword" required />
            <label htmlFor="password">Confirm password</label>
          </div>
          {errors.password && touched.password && (
            <ErrorMessage name="confirmPassword" component={ValidationError} />
          )}
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
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
