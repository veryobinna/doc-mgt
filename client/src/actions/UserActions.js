import axios from 'axios';
import toastr from 'toastr';
import types from './ActionTypes';


/**
 * GetUserSuccess contains the user details
 * @param {any} payload
 * @returns {null} no return
 */
const getUsersSuccess = payload => ({
  type: types.GET_USERS, payload
});

/**
 * getUsers gets users from the API and sends it to
 * getUSerSuccess
 * @param {any} offset
 * @returns{promise} returns a promise
 */
const getUsers = offset => dispatch => axios
  .get(`/users/?offset=${offset}`)
  .then((res) => {
    dispatch(getUsersSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });

/**
 * GetUserSuccess contains the user details
 * @param {any} payload
 * @returns {null} no return
 */
const searchUsersSuccess = payload => ({
  type: types.SEARCH_USERS, payload
});

/**
 * searchUsers gets users from the API and sends it to
 * searchUserSuccess
 * @param {any} query
 * @param {any} offset
 * @returns{promise} returns a promise
 */
const searchUsers = (query, offset) => dispatch => axios
  .get(`/search/users/?q=${query}&offset=${offset}`)
  .then((res) => {
    dispatch(searchUsersSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });

/**
 * deleteUserSuccess contains the user details
 * @param {any} payload
 * @returns {null} no return
 */
const deleteUserSuccess = payload => ({
  type: types.DELETE_USER, payload
});

/**
 * deleteUser delete a user via the API
 * @param {any} id
 * @returns{promise} returns a promise
 */
const deleteUser = id => dispatch => axios
  .delete(`/users/${id}`)
  .then((res) => {
    dispatch(deleteUserSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });

/**
 * updateUserSuccess contains the user details
 * @param {any} payload
 * @returns {null} no return
 */
const updateUserSuccess = payload => ({
  type: types.UPDATE_USER, payload
});

/**
 * updateUser updates a user via the API
 * @param {any} data
 * @returns{promise} returns a promise
 */
const updateUser = data => dispatch => axios
  .put(`users/${data.id}`, data)
  .then((res) => {
    dispatch(updateUserSuccess(res.data));
    toastr.success('successful');
  })
  .catch((error) => {
    toastr.error(error.response.data.errors[0].message);
  });

/**
 * GetSingleUserSuccess contains the user details
 * @param {any} payload
 * @returns {null} no return
 */
const getSingleUserSuccess = payload => ({
  type: types.GET_SINGLE_USER, payload
});

/**
 * getSingleUser gets users from the API and sends it to
 * getUSerSuccess
 * @param {any} id
 * @returns{promise} returns a promise
 */
const getSingleUser = id => dispatch => axios
  .get(`/users/${id}`)
  .then((res) => {
    dispatch(getSingleUserSuccess(res.data));
  })
  .catch((error) => {
    toastr.error(error.response.data.message);
  });


export {
  getUsers, deleteUser, updateUser, getSingleUser, searchUsers,
  getUsersSuccess, searchUsersSuccess, deleteUserSuccess,
  updateUserSuccess, getSingleUserSuccess,
};
