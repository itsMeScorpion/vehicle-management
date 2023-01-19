import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ImageUploader from 'react-images-upload';
import { useDispatch } from 'react-redux';
import { createuser } from '../action';
import { Link } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(' userName Required'),
  phone: Yup.string()
    .min(10, 'required valid number!')
    .max(10, 'required valid number!')
    .required('phone number Required'),
  email: Yup.string().email('Invalid email').required('email Required'),
  currentAddress: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('currentAddress Required'),
  presentAddress: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(' presentAddress Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('password Required'),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setImage(pictureDataURLs[0]);
  };
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
              <div className="shadow p-3 mb-5 bg-white rounded card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://img.freepik.com/free-vector/emails-concept-illustration_114360-1365.jpg?w=740&t=st=1672678825~exp=1672679425~hmac=36eade5970385a1bf17e95d4bfb3a16e826678b827982ebd023a56cf3ecbaf44"
                      alt="Sample photo"
                      className="img-fluid"
                      style={{ height: '550px' }}
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">
                        User registration form
                      </h3>

                      <Formik
                        initialValues={{
                          userName: '',
                          phone: '',
                          email: '',
                          currentAddress: '',
                          presentAddress: '',
                          password: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                          values = { ...values, image };
                          dispatch(createuser(values));
                          // same shape as initial values
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form>
                            <div className="form-group">
                              <Field
                                name="userName"
                                placeholder="userName"
                                className="form-control"
                              />
                              {errors.userName && touched.userName ? (
                                <div className="text-danger">
                                  {errors.userName}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group">
                              <Field
                                name="phone"
                                type="number"
                                placeholder="phone Number"
                                className="form-control"
                              />
                              {errors.phone && touched.phone ? (
                                <div className="text-danger">
                                  {errors.phone}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group">
                              <Field
                                name="email"
                                type="email"
                                placeholder="email"
                                className="form-control"
                              />
                              {errors.email && touched.email ? (
                                <div className="text-danger">
                                  {errors.email}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group">
                              <Field
                                name="currentAddress"
                                type="text"
                                placeholder="currentAddress"
                                className="form-control"
                              />
                              {errors.currentAddress &&
                              touched.currentAddress ? (
                                <div className="text-danger">
                                  {errors.currentAddress}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group">
                              <Field
                                name="presentAddress"
                                type="text"
                                placeholder="presentAddress"
                                className="form-control"
                              />
                              {errors.presentAddress &&
                              touched.presentAddress ? (
                                <div className="text-danger">
                                  {errors.presentAddress}
                                </div>
                              ) : null}
                            </div>

                            {/* image uploading */}

                            <ImageUploader
                              withIcon={true}
                              buttonText="Choose images"
                              onChange={onDrop}
                              imgExtension={['.jpg', '.gif', '.png', '.gif']}
                              maxFileSize={5242880}
                              withPreview={true}
                            />
                            <div className="form-group">
                              <Field
                                name="password"
                                type="text"
                                placeholder="password"
                                className="form-control"
                              />
                              {errors.password && touched.password ? (
                                <div className="text-danger">
                                  {errors.password}
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

export default SignUp;
