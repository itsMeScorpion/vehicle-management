import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../action';

const Homepage = () => {
  const { isLogin } = useSelector((state) => state.vehicleData);
  const dispatch = useDispatch();
  return (
    <div>
      <header id="header" className="fixed-top">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="logo mr-auto">
            <a href="">Carserv</a>
          </h1>

          <nav className="nav-menu">
            {isLogin ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                  <Link to={'/dashboard'} className="nav-link">
                    {' '}
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/vehicleLists'} className="nav-link">
                    Vehicle Management
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/service'} className="nav-link">
                    {' '}
                    Service Management
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={'/change'} className="nav-link" href="#">
                    Change Password
                  </Link>
                </li>
              </ul>
            ) : null}
          </nav>

          {isLogin ? (
            <button
              className=" btn btn-primary get-start"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          ) : (
            <Link
              to={'/login'}
              className=" btn btn-primary get-start"
              type="button"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      <div className="container contant">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="subheading">
              Let's run smoothly <span className="lankid">Carserv.</span>{' '}
              Perfection Redefined
            </h1>
            <p className="subcontent mt-3">
              We take care of all your auto repair needs brakes,tires,oil
              changes and everything in between.
            </p>
            <button className="btn btn-primary p-3 mt-5">Read More</button>
          </div>
          <div className="col-lg-6">
            <img
              src="https://img.freepik.com/free-vector/car-tuning-abstract-concept-illustration_335657-1844.jpg?w=740&t=st=1672936426~exp=1672937026~hmac=0ee9077f2e79dd311f05eb007f27e852043c4937772003376b463f7c57f95741"
              alt="no"
              style={{ height: '500px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
