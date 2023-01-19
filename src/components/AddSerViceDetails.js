import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  editServiceDetails,
  getAllServiceDetails,
  postServiceDetails,
} from '../action';
import { Link, useParams } from 'react-router-dom';

const AddServiceDetails = () => {
  const { serviceIdDetails } = useSelector((state) => state.vehicleData);
  const { serviceid } = useSelector((state) => state.vehicleData);

  const [centers, setCenters] = useState('');

  //   to get vehicle id
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getAllServiceDetails(id));
    }
  }, []);

  //   set value on field

  useEffect(() => {
    if (serviceIdDetails) {
      setFieldValue('date', serviceIdDetails.date);
      setFieldValue('vehicle', serviceIdDetails.vehicle);
      setFieldValue('kms', serviceIdDetails.kms);
      setFieldValue('complaints', serviceIdDetails.complaints);
      setFieldValue('checked', serviceIdDetails.checked);
      setFieldValue('test', serviceIdDetails.test);
      setFieldValue('centers', serviceIdDetails.centers);

      // setFieldValue('vehicleno',vehicleDetails.vehicleno)
    }
  }, [serviceIdDetails]);

  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.date) {
      errors.date = 'Date Required';
    }

    if (!values.vehicle) {
      errors.vehicle = 'Vehicle Required';
    }
    if (!values.kms) {
      errors.kms = 'KMs Required';
    }
    if (!values.checked) {
      errors.checked = 'Choose any value';
    }
    if (!values.test) {
      errors.test = 'Choose any value';
    }
    if (!values.centers) {
      errors.centers = 'Choose any value';
    }
    if (!values.complaints) {
      errors.complaints = 'complaints Required';
    }
    return errors;
  };

  // select for dropDown

  const serviceAll = [
    { value: 'kollam', text: 'kollam' },
    { value: 'Tvm', text: 'Tvm' },
    { value: 'calicut', text: 'calicut' },
    { value: 'kochi', text: 'kochi' },
  ];

  //   restores a form element's default values.

  useEffect(() => {
    resetForm({
      date: '',
      vehicle: '',
      rcNumber: '',
      kms: '',
      complaints: '',
      checked: '',
      test: '',
      centers: '',
      serviceNo: '',
    });
  }, []);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    values, // use this if you want controlled components
    errors,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      date: '',
      vehicle: '',
      kms: '',
      complaints: '',
      checked: '',
      test: '',
      centers: '',
      serviceNo: '',
    },
    validate,
    onSubmit: (values) => {
      if (serviceid) {
        dispatch(editServiceDetails(serviceid, values));
      } else {
        dispatch(postServiceDetails(values));
      }

      console.log(JSON.stringify(values));
      // values = {"Date":"ramen","vehicle":"mountains"}
    },
  });

  return (
    <div className="main_container">
      <div className="button_adjust">
        <Link to={'/'} type="button" className="btn btn-secondary btn-sm">
          Back
        </Link>
      </div>
      <div className="adjust_container ">
        <form
          onSubmit={handleSubmit}
          className="mt-1 shadow-lg p-3 mb-5 bg-white rounded"
        >
          <label htmlFor="Date">Date:</label>
          <input
            className="form-control"
            type="date"
            name="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.date}
          />
          {touched.date && errors.date ? (
            <div className="text-danger">{errors.date}</div>
          ) : null}

          <label htmlFor="vehicle">Vehicle:</label>
          <input
            className="form-control"
            type="text"
            name="vehicle"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.vehicle}
          />

          {touched.vehicle && errors.vehicle ? (
            <div className="text-danger">{errors.vehicle}</div>
          ) : null}

          <label htmlFor="vehicle">KMs:</label>
          <input
            className="form-control"
            type="text"
            name="kms"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.kms}
          />

          {touched.kms && errors.kms ? (
            <div className="text-danger">{errors.kms}</div>
          ) : null}

          <div className="radio-item">
            <input
              className="form-check-input"
              value="paid"
              name="checked"
              checked={values.checked === 'paid'}
              type="radio"
              onChange={handleChange}
            />
            <label>paid</label>
          </div>

          <div className="radio-item">
            <input
              className="form-check-input"
              value="free"
              name="checked"
              checked={values.checked === 'free'}
              type="radio"
              onChange={handleChange}
            />
            <label>Free</label>
          </div>

          {touched.checked && errors.checked ? (
            <div className="text-danger">{errors.checked}</div>
          ) : null}

          {/* variant dropdown */}
          <label>Service Center:</label>
          <select
            value={centers}
            onChange={handleChange}
            name="centers"
            className="form-control"
          >
            <option>Choose Center</option>
            {serviceAll.map((mop) => (
              <option key={mop.value} value={mop.value}>
                {mop.text}
              </option>
            ))}
          </select>

          {touched.centers && errors.centers ? (
            <div className="text-danger">{errors.centers}</div>
          ) : null}

          <div className="radio-item">
            <input
              className="form-check-input"
              value="repair"
              name="test"
              checked={values.test === 'repair'}
              type="radio"
              onChange={handleChange}
            />
            <label>repair</label>
          </div>

          <div className="radio-item">
            <input
              className="form-check-input"
              value="service"
              name="test"
              checked={values.test === 'service'}
              type="radio"
              onChange={handleChange}
            />
            <label>service</label>
          </div>

          {touched.test && errors.test ? (
            <div className="text-danger">{errors.test}</div>
          ) : null}

          {/* add service number if  radio service is clicked */}

          {values.test === 'service' ? (
            <div>
              <label htmlFor="vehicle">Service No:</label>
              <input
                type="number"
                name="serviceNo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.serviceNo}
                className="form-control"
              />

              {touched.serviceNo && errors.serviceNo ? (
                <div className="text-danger">{errors.serviceNo}</div>
              ) : null}
            </div>
          ) : null}

          <label htmlFor="vehicle">complaints:</label>
          <input
            type="text"
            name="complaints"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.complaints}
            className="form-control"
          />

          {touched.complaints && errors.complaints ? (
            <div className="text-danger">{errors.complaints}</div>
          ) : null}

          <button type="submit" className="btn btn-primary mt-2">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServiceDetails;
