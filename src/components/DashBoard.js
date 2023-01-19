import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getServiceDetails, getVehicleDetails } from '../action';

const DashBoard = () => {
  const { vehicles } = useSelector((state) => state.vehicleData);
  const { serviceDetails } = useSelector((state) => state.vehicleData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicleDetails());
  }, []);

  useEffect(() => {
    dispatch(getServiceDetails());
  }, []);
  //   length of no vehicles
  const lenvehicle = vehicles.map((s) => {
    return <div>{s.rcNumber}</div>;
  });
  const lengthAll = lenvehicle.length;

  //   length of no services
  const lenService = serviceDetails.map((s) => {
    return <div>{s.vehicle}</div>;
  });
  const serviceLength = lenService.length;

  return (
    <div className="main_container">
      <div className="button_adjust">
        <Link to={'/'} type="button" className="btn btn-primary btn-sm">
          Back
        </Link>
      </div>
      <div className="whole_container">
        <div className="container ">
          <div className="rowsAdjust mt-5">
            <div className="four col-md-3">
              <div className="counter-box colored ">
                <i className="fa-solid fa-car "></i>{' '}
                <span className="counter">{lengthAll}</span>
                <p>No. of Vehicles</p>
              </div>
            </div>
            <div className="four col-md-3">
              <div className="counter-box shadow-lg bg-white rounded">
                <i className="fa-solid fa-screwdriver-wrench text-dark"></i>{' '}
                <span className="counter ">{serviceLength}</span>
                <p>No. of Services</p>
              </div>
            </div>
            <div className="four col-md-3">
              <div className="counter-box shadow-lg  bg-white rounded">
                <i className="fa-solid fa-spinner text-dark"></i>{' '}
                <span className="counter">0</span>
                <p>Pending Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
