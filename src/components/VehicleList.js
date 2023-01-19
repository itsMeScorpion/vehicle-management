import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getVehicleDetails } from '../action';

const VehicleList = () => {
  const { vehicles } = useSelector((state) => state.vehicleData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicleDetails());
  }, []);

  // datatable components columns

  const columns = [
    {
      name: 'VIN Number',
      selector: (row) => row.vinNumber,
    },
    {
      name: 'vehicle no',
      selector: (row) => row.vehicleno,
    },
    {
      name: 'RC Number ',
      selector: (row) => row.rcNumber,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
    },
    {
      name: 'Model',
      selector: (row) => row.model,
    },
    {
      name: 'Variant',
      selector: (row) => row.variant,
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          <Link
            to={`/Edit/${row.id}`}
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
      <div className="button_adjust">
        <Link to={'/'} type="button" className="btn btn-secondary btn-sm">
          Back
        </Link>
      </div>
      <div className="whole_container">
        <div className="addbutton_adjusted">
          <Link to={'/addVehicles'} type="button" className="btn btn-primary ">
            Add Details
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={vehicles}
          className=" mt-4 shadow-lg p-3 mb-5 bg-white rounded-3"
        />
      </div>
    </div>
  );
};

export default VehicleList;
