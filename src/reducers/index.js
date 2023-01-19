import Cookies from 'js-cookie';
import { combineReducers } from 'redux';

const initialState = {
  vehicles: [],
  vehicleId: null,
  vehicleDetails: [],
  successMessage: null,
  serviceDetails: [],
  serviceid: null,
  serviceIdDetails: [],
  userData: [],
  isLogin: Cookies.get('User') ? Cookies.get('User') : null,
};

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DETAILS':
      return {
        ...state,
        vehicles: [...action.payload],
      };
    case 'GET_ID':
      return {
        ...state,
        vehicleId: action.payload,
      };
    case 'GET_IDDETAILS':
      return {
        ...state,
        vehicleDetails: action.payload,
      };
    case 'SUCCESS':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'GET_SERVICEDETAILS':
      return {
        ...state,
        serviceDetails: [...action.payload],
      };
    case 'GET_SERVICEID':
      return {
        ...state,
        serviceid: action.payload,
      };
    case 'GET_SERVICEIDDETAILSON':
      return {
        ...state,
        serviceIdDetails: action.payload,
      };
    case 'SET_USERS':
      return {
        ...state,
        userData: action.payload,
      };
    case 'CHECK_USER':
      return {
        ...state,
        isLogin: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLogin: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
  vehicleData: vehicleReducer,
});
