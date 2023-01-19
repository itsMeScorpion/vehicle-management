import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceDetails } from '../action';

const ServiceList = () => {
  const { serviceDetails } = useSelector((state) => state.vehicleData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServiceDetails());
  }, []);

  const columns = [
    {
      name: 'Date',
      selector: (row) => row.date,
    },
    {
      name: 'vehicle',
      selector: (row) => row.vehicle,
    },
    {
      name: 'serviceNo',
      selector: (row) => row.serviceNo,
    },
    {
      name: 'Type',
      selector: (row) => row.checked,
    },
    {
      name: 'centers',
      selector: (row) => row.centers,
    },
    {
      name: 'complaints',
      selector: (row) => row.complaints,
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          <Link
            to={`/EditService/${row.id}`}
            type="button"
            className="btn btn-warning"
          >
            Edit
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="main_container">
      {/* back button */}
      <div className="button_adjust">
        <Link to={'/'} type="button" className="btn btn-secondary btn-sm">
          Back
        </Link>
      </div>

      <div className="whole_container">
        {/* Add Button */}
        <div className="addbutton_adjusted">
          <Link
            to={'/addService'}
            type="button"
            className="btn btn-primary mt-3"
          >
            Add Details
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={serviceDetails}
          className=" mt-4 shadow-lg p-3 mb-5 bg-white rounded-3"
        />
      </div>
    </div>
  );
};

export default ServiceList;
