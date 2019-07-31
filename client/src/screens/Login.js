import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { login, newData, reset } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

export const Login = props => {
  const { url } = props;
  const logged = useSelector(state => state.loggedReducer);
  const dispatch = useDispatch();

  if (logged) return null;

  // basic login to retrieve data
  const signin = values => {
    const credentials = btoa(`${values.username}:${values.password}`);

    axios
      .get(url, {
        headers: {
          authorization: `Basic ${credentials}`
        }
      })
      .then(
        response => {
          dispatch(newData(response.data));
          dispatch(reset(response.data));
          dispatch(login());
        },
        error => {
          alert(error);
        }
      );
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .required("Username required.")
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .matches(/^[a-zA-Z]+$/, "Username must only be letters!"),
        password: Yup.string()
          .required("Password required.")
          .min(2, "Too Short!")
          .max(50, "Too Long!")
      })}
      onSubmit={(values, actions) => {
        signin(values);
      }}
      render={({ errors, status, touched, isSubmitting }) => (
        <Form>
          <Field type="text" name="username" />
          {errors.username && touched.username && <div>{errors.username}</div>}
          <Field type="password" name="password" />
          {errors.password && touched.password && <div>{errors.password}</div>}
          {status && status.msg && <div>{status.msg}</div>}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    />
  );
};
