import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  editVehicleDetails,
  getAllVehicleDetails,
  postVehicleDetails,
} from '../action';
import { Link, useParams } from 'react-router-dom';

const AddVehicles = () => {
  const { vehicleId } = useSelector((state) => state.vehicleData);
  const { vehicleDetails } = useSelector((state) => state.vehicleData);
  const dispatch = useDispatch();

  // get vehicle id
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getAllVehicleDetails(id));
    }
  }, []);

  //   set value on field

  useEffect(() => {
    if (vehicleDetails) {
      setFieldValue('vehicleno', vehicleDetails.vehicleno);
      setFieldValue('vinNumber', vehicleDetails.vinNumber);
      setFieldValue('rcNumber', vehicleDetails.rcNumber);
      setFieldValue('date', vehicleDetails.date);
      setFieldValue('model', vehicleDetails.model);
      setFieldValue('variant', vehicleDetails.variant);

      // setFieldValue('vehicleno',vehicleDetails.vehicleno)
    }
  }, [vehicleDetails]);

  //   restores a form element's default values.

  useEffect(() => {
    resetForm({
      vehicleno: '',
      vinNumber: '',
      rcNumber: '',
      date: '',
      model: '',
      variant: '',
    });
  }, []);

  //   dropdown for model

  const modelValues = [
    { value: 'qwe4', text: 'qwe4' },
    { value: 'sdf77', text: 'sdf77' },
    { value: 'l88', text: 'l88' },
    { value: '66i', text: '66i' },
  ];

  //   dropDown for variant
  const variantList = [
    { value: 'mid', text: 'mid' },
    { value: 'full', text: 'full' },
    { value: 'normal', text: 'normal' },
  ];

  const validate = (values) => {
    const errors = {};
    if (!values.vehicleno) {
      errors.vehicleno = 'Vehicle number Required';
    } else if (values.vehicleno.length > 10) {
      errors.vehicleno = 'Must be 10 characters or less';
    }

    if (!values.vinNumber) {
      errors.vinNumber = 'VIN number Required';
    } else if (values.vinNumber.toString().length > 5) {
      errors.vinNumber = 'Must be 5 numbers or less';
    }
    if (!values.rcNumber) {
      errors.rcNumber = 'RC number Required';
    } else if (values.rcNumber.length > 10) {
      errors.lastName = 'Must be 10 characters or less';
    }

    if (!values.date) {
      errors.date = 'Date  Required';
    }
    if (!values.model) {
      errors.model = 'model  Required';
    }
    if (!values.variant) {
      errors.variant = 'variant  Required';
    }
    return errors;
  };

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
      vehicleno: '',
      vinNumber: '',
      rcNumber: '',
      date: '',
      model: '',
      variant: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (vehicleId) {
        dispatch(editVehicleDetails(vehicleId, values));
        resetForm();
      } else {
        dispatch(postVehicleDetails(values));
        resetForm();
      }
      console.log(JSON.stringify(values));
      // values = {"vehicleno":"ramen","vinNumber":"mountains"}
    },
    enableReinitialize: true,
  });

  return (
    <div className="main_container">
      <div className="button_adjust">
        <Link to={'/'} type="button" className="btn btn-secondary btn-sm">
          Back
        </Link>
      </div>
      <div className="whole_container_adjust">
        <div className="form-group">
          <form
            onSubmit={handleSubmit}
            className=" shadow-lg p-3 mb-5 bg-white rounded"
          >
            <label>Vehicle No:</label>
            <input
              type="text"
              name="vehicleno"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.vehicleno}
              className="form-control"
            />
            {touched.vehicleno && errors.vehicleno ? (
              <div className="text-danger">{errors.vehicleno}</div>
            ) : null}

            {/* model dropdown */}
            <label>Model:</label>
            <select
              onChange={handleChange}
              value={values.model}
              // onChange={(e) => setModel(e.target.value)}
              name="model"
              className="form-control"
            >
              <option>ChooseModels</option>
              {modelValues.map((mop) => (
                <option key={mop.value} value={mop.value}>
                  {mop.text}
                </option>
              ))}
            </select>

            {touched.model && errors.model ? (
              <div className="text-danger">{errors.model}</div>
            ) : null}

            {/* variant dropdown */}
            <label>Variant:</label>
            <select
              value={values.variant}
              name="variant"
              onChange={handleChange}
              // onChange={(e) => setVariant(e.target.value)}
              className="form-control"
            >
              <option value={''}>Choose Variant</option>
              {variantList.map((mop) => (
                <option key={mop.value} value={mop.value}>
                  {mop.text}
                </option>
              ))}
            </select>

            {touched.variant && errors.variant ? (
              <div className="text-danger">{errors.variant}</div>
            ) : null}

            <label>VIN No:</label>
            <input
              type="number"
              name="vinNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.vinNumber}
              className="form-control"
            />

            {touched.vinNumber && errors.vinNumber ? (
              <div className="text-danger">{errors.vinNumber}</div>
            ) : null}

            <label>RC No:</label>
            <input
              type="text"
              name="rcNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rcNumber}
              className="form-control"
            />

            {touched.rcNumber && errors.rcNumber ? (
              <div className="text-danger">{errors.rcNumber}</div>
            ) : null}

            <label>purchase Date:</label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
              className="form-control"
            />

            {touched.date && errors.date ? (
              <div className="text-danger">{errors.date}</div>
            ) : null}

            <button type="submit" className="btn btn-primary mt-5">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVehicles;
