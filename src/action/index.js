import Service from '../Service';
import History from '../History';
import { decrypt, encrypt } from '../utils/HashPassword';
import Cookies from 'js-cookie';

// action to get vehicle Details
export const getVehicleDetails = () => async (dispatch) => {
  const { data } = await Service.getDetails();
  dispatch({
    type: 'GET_DETAILS',
    payload: data,
  });
};
// action to add vehicle Details

export const postVehicleDetails = (val) => async (dispatch) => {
  const { data } = await Service.postDetails(val);
  History.push('/vehicleLists');
  dispatch(successMessage('Added successFully'));
};

// action to edit vehicle Details

export const getAllVehicleDetails = (id) => async (dispatch) => {
  dispatch({
    type: 'GET_ID',
    payload: id,
  });
  const { data } = await Service.getAllDetails(id);
  dispatch({
    type: 'GET_IDDETAILS',
    payload: data,
  });
};

export const editVehicleDetails = (id, payload) => async (dispatch) => {
  dispatch({
    type: 'GET_ID',
    payload: id,
  });
  const { data } = await Service.editDetails(id, payload);
  History.push('/vehicleLists');
  dispatch(successMessage('Edited successFully'));
};

// toaster

export const successMessage = (payload) => {
  return {
    type: 'SUCCESS',
    payload: payload,
  };
};

export const resetsuccessMessage = (payload) => {
  return {
    type: 'RESET',
    payload: null,
  };
};

// service

// action to get vehicle Details
export const getServiceDetails = () => async (dispatch) => {
  const { data } = await Service.getService();
  dispatch({
    type: 'GET_SERVICEDETAILS',
    payload: data,
  });
};
// action to add vehicle Details

export const postServiceDetails = (val) => async (dispatch) => {
  const { data } = await Service.postService(val);
  History.push('/service');
  dispatch(successMessage('Added successFully'));
};

// action to edit vehicle Details

export const getAllServiceDetails = (id) => async (dispatch) => {
  dispatch({
    type: 'GET_SERVICEID',
    payload: id,
  });
  const { data } = await Service.getAllService(id);
  dispatch({
    type: 'GET_SERVICEIDDETAILSON',
    payload: data,
  });
};

export const editServiceDetails = (id, payload) => async (dispatch) => {
  dispatch({
    type: 'GET_SERVICEID',
    payload: id,
  });
  const { data } = await Service.editService(id, payload);
  History.push('/service');
  dispatch(successMessage('Edited successFully'));
};

// Logout action
export const logout = () => async (dispatch) => {
  Cookies.remove('login');
  Cookies.remove('User');
  Cookies.remove('UserName');

  dispatch({
    type: 'LOGOUT',
    payload: null,
  });
  History.push('/');
  window.location.reload();
};

// Action to create a new user and encrypt password
export const createuser = (data) => async (dispatch) => {
  const encryptedusersdata = await encrypt(data.password);
  const { password, ...values } = data;

  Service.setuserdata({
    ...values,
    encryptedusersdata,
  });

  History.push('/login');
  dispatch(successMessage('SignUp successFully'));
};

// Action to get the admin data from JSON and decrypt
export const setLoginUsers = (admindata) => async (dispatch) => {
  let payload;

  const User = await Service.getuserdata();

  const usersCheck = await User.data.find(
    ({ userName }) => userName === admindata.userName
  );
  if (!usersCheck) {
    alert('not valid ');
  }
  const userDecrypt = decrypt(usersCheck.encryptedusersdata);

  if (userDecrypt === admindata.password) {
    payload = admindata.userName;
    Cookies.set('User', admindata.userName);
    Cookies.set('UserName', admindata.userName);

    dispatch({
      type: 'CHECK_USER ',
      payload,
    });
    History.push('/');
    window.location.reload();
  } else {
    payload = false;
    alert('incorrect password or Username');
    dispatch(successMessage('Login SuccessFully'));
    // History.push('/');
  }
};

// change password

export const passwordChange =
  (user, currentPassword, newPassword) => async (dispatch) => {
    const { data } = await Service.getuserdata();
    const usersCheck = data.find((item) => item.userName === user);
    const decrypted = decrypt(usersCheck.encryptedusersdata);

    if (decrypted === currentPassword) {
      let newPs = encrypt(newPassword);
      let userName = usersCheck.userName;
      const query = await Service.updatePass('users', usersCheck.id, {
        userName: userName,
        encryptedusersdata: newPs,
      });
      alert('password updated successfully');
    } else {
      alert('current password is wrong');
    }
    History.push('/');
  };
