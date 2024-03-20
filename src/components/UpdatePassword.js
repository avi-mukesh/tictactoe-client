import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ValidationError from "./ValidationError";
import { useUpdatePasswordMutation } from "../app/services/user/userService";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import * as Yup from "yup";

const PasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
      "Password must be at least 8 characters, have a number, a lower case letter, an uppercase letter and a special character."
    )
    .required("Required"),
  confirmNewPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("newPassword")], "Passwords don't match"),
});

const UpdatePassword = () => {
  useTitle("Reset password");

  const [message, setMessage] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const [updatePassword] = useUpdatePasswordMutation();

  const handlePasswordUpdate = async (data) => {
    const { data: response } = await updatePassword(data);
    setMessage(response.message);
  };

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }}
      validationSchema={PasswordSchema}
      onSubmit={(values, { resetForm }) => {
        handlePasswordUpdate({ id: userInfo.id, ...values });
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="input-group">
            <Field type="password" name="currentPassword" required />
            <label htmlFor="currentPassword">Current password</label>
          </div>
          <ErrorMessage name="password" component={ValidationError} />
          <div className="input-group">
            <Field type="password" name="newPassword" required />
            <label htmlFor="newPassword">New password</label>
          </div>
          {errors.newPassword && touched.newPassword && (
            <ErrorMessage name="newPassword" component={ValidationError} />
          )}
          <div className="input-group">
            <Field type="password" name="confirmNewPassword" required />
            <label htmlFor="confirmNewPassword">Confirm new password</label>
          </div>
          {errors.confirmNewPassword && touched.confirmNewPassword && (
            <ErrorMessage
              name="confirmNewPassword"
              component={ValidationError}
            />
          )}
          {message && <p className="form-message">{message}</p>}
          <button
            className={`btn btn-primary ${false ? "btn-disabled" : ""}`}
            type="submit"
            disabled={false}
          >
            Update
          </button>

          <Link to="/profile" className="btn btn-secondary">
            Back to profile
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePassword;
