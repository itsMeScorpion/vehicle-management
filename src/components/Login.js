import React from 'react';

import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginUsers } from '../action';
import { Link } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  userName: Yup.string()

    .min(2, 'Too Short!')

    .max(50, 'Too Long!')

    .required('Required'),

  password: Yup.string()

    .min(2, 'Too Short!')

    .max(50, 'Too Long!')

    .required('Required'),
});

const Login = () => {
  const { userData } = useSelector((state) => state.vehicleData);
  const dispatch = useDispatch();
  return (
    <div className="main_container">
      <div className="button_adjust">
        <Link to={'/'} type="button" className="btn btn-primary btn-sm ">
          Back
        </Link>{' '}
      </div>
      <div className="h-100 bg-white">
        <div className="containers">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="shadow  bg-white rounded card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4582.jpg?w=740&t=st=1672680188~exp=1672680788~hmac=f6f1c87b0dcdb1789683105d51c5b0dea90815cd9ff47e559f8f649638980c4d"
                      alt="Sample photo"
                      className="img-fluid"
                      style={{ height: '500px' }}
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">User Login form</h3>

                      <Formik
                        initialValues={{
                          userName: '',

                          password: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                          dispatch(setLoginUsers(values));

                          // same shape as initial values
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form>
                            <div className="form-outline mb-4">
                              <Field
                                name="userName"
                                className="form-control"
                                placeholder="userName"
                              />

                              {errors.userName && touched.userName ? (
                                <div className="text-danger">
                                  {errors.userName}
                                </div>
                              ) : null}
                            </div>

                            <div className="form-outline mb-4">
                              <Field
                                name="password"
                                className="form-control"
                                placeholder="password"
                              />

                              {errors.password && touched.password ? (
                                <div className="text-danger">
                                  {errors.password}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <p className="small fw-bold mt-2 pt-1 mb-0">
                                Don't have an account?{' '}
                                <Link to={'/signup'} className="link-danger">
                                  Register
                                </Link>
                              </p>
                            </div>

                            <button
                              type="submit"
                              className="btn btn-success mt-5"
                            >
                              Submit
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
