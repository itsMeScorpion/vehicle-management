import React, { useEffect } from 'react';
import '../css/index.css';
import { Route, Router } from 'react-router-dom';
import History from '../History';
import Homepage from './Homepage';
import VehicleList from './VehicleList';
import AddVehicles from './AddVehicles';
import DashBoard from './DashBoard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetsuccessMessage } from '../action';
import ServiceList from './ServiceList';
import AddServiceDetails from './AddSerViceDetails';
import Login from './Login';
import SignUp from './SignUp';
import PrivateRouter from './PrivateRoute';
import ChangePassword from './ChangePswd';

const App = () => {
  const { successMessage } = useSelector((state) => state.vehicleData);
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.vehicleData);

  // toaster success
  const tostFig = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, tostFig);
      dispatch(resetsuccessMessage());
    }
  }, [successMessage]);

  return (
    <div>
      <Router history={History}>
        <ToastContainer />
        <Route path="/" exact component={Homepage}></Route>
        <PrivateRouter
          path="/vehicleLists"
          component={VehicleList}
          exact
          authDetail={isLogin}
        ></PrivateRouter>
        <PrivateRouter
          path="/addVehicles"
          component={AddVehicles}
          exact
          authDetail={isLogin}
        ></PrivateRouter>
        <PrivateRouter
          path="/Edit/:id"
          component={AddVehicles}
          exact
          authDetail={isLogin}
        ></PrivateRouter>
        <PrivateRouter
          path="/dashboard"
          component={DashBoard}
          exact
          authDetail={isLogin}
        ></PrivateRouter>
        <PrivateRouter
          path="/service"
          component={ServiceList}
          exact
          authDetail={isLogin}
        ></PrivateRouter>
         <PrivateRouter
          path="/change"
          component={ChangePassword}
          exact
          authDetail={isLogin}
        ></PrivateRouter>
        <PrivateRouter
          path="/addService"
          component={AddServiceDetails}
          exact
          authDetail={isLogin}
        ></PrivateRouter>
        <PrivateRouter
          path="/EditService/:id"
          component={AddServiceDetails}
          exact
          authDetail={isLogin}
        ></PrivateRouter>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={SignUp}></Route>
        
      </Router>
    </div>
  );
};

export default App;
