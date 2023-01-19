import React from 'react';

import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { logout, passwordChange } from '../action';
import { Link } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  currentPassword: Yup.string()

    .min(2, 'Too Short!')

    .max(50, 'Too Long!')

    .required('Required'),

  newPassword: Yup.string()

    .min(2, 'Too Short!')

    .max(50, 'Too Long!')

    .required('Required'),
  confirmPassword: Yup.string()

    .min(2, 'Too Short!')

    .max(50, 'Too Long!')

    .required('Required'),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const {
    vehicleData: { isLogin },
  } = useSelector((state) => state);
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
              <div className=" card-registration my-4 shadow-lg p-3 mb-5 bg-white rounded-3">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src=" https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7966.jpg?w=740&t=st=1672680125~exp=1672680725~hmac=f37b819c6846c1383c4c6031cfab72b68b1997abfa446b7924b64a365cb10bae "
                      alt="Sample photo"
                      className="img-fluid"
                      style={{ height: '500px' }}
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">
                        Change Your Password
                      </h3>

                      <Formik
                        initialValues={{
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                          if (values.newPassword === values.confirmPassword) {
                            alert('password Changed Successfully');
                            console.log(values);

                            dispatch(
                              passwordChange(
                                isLogin,
                                values.currentPassword,
                                values.newPassword
                              )
                            );
                            dispatch(logout());
                          } else {
                            alert('try another password');
                          }
                        }}

                        // same shape as initial values
                      >
                        {({ errors, touched }) => (
                          <Form>
                            <div className="form-outline mb-4">
                              <Field
                                name="currentPassword"
                                className="form-control"
                                placeholder="currentPassword"
                              />

                              {errors.currentPassword &&
                              touched.currentPassword ? (
                                <div className="text-danger">
                                  {errors.currentPassword}
                                </div>
                              ) : null}
                            </div>

                            <div className="form-outline mb-4">
                              <Field
                                name="newPassword"
                                className="form-control"
                                placeholder="newPassword"
                              />

                              {errors.newPassword && touched.newPassword ? (
                                <div className="text-danger">
                                  {errors.newPassword}
                                </div>
                              ) : null}
                            </div>

                            <div className="form-outline mb-4">
                              <Field
                                name="confirmPassword"
                                className="form-control"
                                placeholder="confirmPassword"
                              />

                              {errors.confirmPassword &&
                              touched.confirmPassword ? (
                                <div className="text-danger">
                                  {errors.confirmPassword}
                                </div>
                              ) : null}
                            </div>

                            <button
                              type="submit"
                              className="btn btn-primary mt-3"
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

export default ChangePassword;
