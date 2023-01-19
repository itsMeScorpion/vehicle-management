import jsonServer from './api/jsonServer';

const getDetails = () => jsonServer.get('vehicles');
const postDetails = (data) => jsonServer.post('vehicles', data);
const getAllDetails = (id) => jsonServer.get(`vehicles/${id}`);
const editDetails = (id, data) => jsonServer.patch(`vehicles/${id}`, data);

// service management
const getService = () => jsonServer.get('service');
const postService = (data) => jsonServer.post('service', data);
const getAllService = (id) => jsonServer.get(`service/${id}`);
const editService = (id, data) => jsonServer.patch(`service/${id}`, data);

// userLogin
const getLogin = () => jsonServer.get('login');
const postLogin = (data) => jsonServer.post('login', data);

////
const setuserdata = (data) => jsonServer.post('users', data);
const getuserdata = () => jsonServer.get('users');

// get auth details
const getChangePassword = () => jsonServer.get('users');

// update password
const updatePass = (url, id, data) => jsonServer.patch(`${url}/${id}`, data);

export default {
  getDetails,
  postDetails,
  getAllDetails,
  editDetails,
  postService,
  getService,
  getAllService,
  editService,
  getLogin,
  postLogin,
  setuserdata,
  getuserdata,
  getChangePassword,
  updatePass,
};
