import axios from 'axios';
import types from './ActionTypes';
import toastr from 'toastr';


const getUsersSuccess = payload => ({
  type: types.GET_USERS, payload
});

const getUsers = () => dispatch => axios
  .get('/users')
  .then((res) => {
    dispatch(getUsersSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });


const deleteUserSuccess = payload => ({
  type: types.DELETE_USER, payload
});

const deleteUser = id => dispatch => axios
  .delete(`users/${id}`)
  .then((res) => {
    dispatch(deleteUserSuccess(res.data));
  })
  .catch((error) => {
    console.log('delete user', error.response.data.error)
    toastr.error(error.response.data.message);
  });


const updateUserSuccess = payload => ({
  type: types.UPDATE_USER, payload
});
const updateUser = data => dispatch => axios
  .put(`users/${data.id}`, data)
  .then((res) => {
    dispatch(updateUserSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });


const getSingleUserSuccess = payload => ({
  type: types.GET_SINGLE_USER, payload
});

const getSingleUser = id => dispatch => axios
  .get(`users/${id}`)
  .then((res) => {
    dispatch(getSingleUserSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });


export {
  getUsers, deleteUser, updateUser, getSingleUser
};