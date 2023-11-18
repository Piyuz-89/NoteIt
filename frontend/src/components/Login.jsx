import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { Container } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Loader from './Loader';

const FormSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("Invalid Email")
    .required("Required!"),
  pass: Yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit and one special character.")
    .required("Required!"),
})


export default function Login() {

  const { login, user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    await login(values);
    navigate("/")
  }


  if (user) return <Navigate to='/' />

  return (
    isLoading ?
      <Loader />
      :
      <Container className='d-flex justify-content-center'>
        <Formik
          initialValues={{
            email: "",
            pass: ""
          }}

          validationSchema={FormSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, isSubmitting, isValid }) => (
            <Form className='col-5 mt-5 bg-light rounded p-5 fw-semibold' style={{ boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
              <h1 className='text-center fw-bold text-success' >Login </h1>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email ID</label>
                <Field type="email" id="email" name='email' className="form-control" />
                {errors.email && <p className="form-text text-danger">{errors.email}</p>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type='password' id='password' name='pass' className="form-control" />
                {errors.pass && <p className="form-text text-danger">{errors.pass}</p>}
              </div>
              <div>
                <p>Don't have an account? <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link></p>
              </div>

              <button type='submit' disabled={!isValid || isSubmitting} className='btn btn-success mt-2'>Login</button>

            </Form>
          )}
        </Formik>
      </Container>

  )
}