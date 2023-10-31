
import axios from 'axios';

import {

  GET_DRIVER,
  GET_TEAM,
  GET_DRIVER_DETAIL,
  ADD_DRIVER,
  CLEAN_DETAIL,
  SEARCH_DRIVERS_BY_NAME,
  CHANGE_PAGE,
  SORT_DRIVERS_BY_NAME,
  SORT_DRIVERS_BY_DOB,
  FILTER_DRIVERS_BY_ORIGIN,
  FILTER_DRIVERS_BY_TEAM

} from './actions';

// const API = "url de la api drivers";
const LOCAL = "localhost:3001";

/*actions-type CREATORS*/
// add character in home
export const getDriver = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://${LOCAL}/drivers`);
      dispatch({ type: GET_DRIVER, payload: data });
    } catch (error) {
      window.alert(error.response.data.message);
    }
    // axios.get(`http://${LOCAL}/character/${id}`).then(({ data }) => {
    //   dispatch({ type: GET_CHARACTER, payload: data });
    // });
  };
};

export const getTeam = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://${LOCAL}/teams`);
      dispatch({ type: GET_TEAM, payload: data });
      console.log('getTeam action called successfully');
    } catch (error) {
      window.alert(error.response.data.message);
    }
  }
}


/* Añade driver*/
export const addDriver = (driver) => {
  return async function (dispatch) {
    console.log(driver)
    try {
      const { data } = await axios.post(`http://${LOCAL}/drivers`, {
        ...driver,
      });
      dispatch({ type: ADD_DRIVER, payload: data });
      window.alert("Driver creado");
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };
};


export const filterDriversByTeam = (team) => {
  return {
    type: FILTER_DRIVERS_BY_TEAM,
    payload: team,
  };
};




// use character in detail
export const getDriverDetail = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://${LOCAL}/drivers/${id}`);
      dispatch({ type: GET_DRIVER_DETAIL, payload: data });
    } catch (error) {
      window.alert(error.response.data.message);
    }
    // axios.get(`http://${LOCAL}/character/${id}`).then(({ data }) => {
    //   dispatch({ type: GET_CHARACTER_DETAIL, payload: data });
    // });
  };
};

//clean detail
export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const searchDriversByName = (name) => {
  return (dispatch) => {
    axios.get(`http://localhost:3001/driver?name=${name}`)
      .then((response) => {
        const filteredDrivers = response.data;
        dispatch({
          type: SEARCH_DRIVERS_BY_NAME,
          payload: filteredDrivers,
        });
      })
      .catch((error) => {
        console.error('Error al buscar conductores:', error);
      });
  };
};

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  payload: page,
});


export const sortDriversByName = (order) => ({
  type: SORT_DRIVERS_BY_NAME,
  payload: order,
});

export const sortDriversByDob = (order) => ({
  type: SORT_DRIVERS_BY_DOB,
  payload: order,
});

export const filterDriverByOrigin = (filterType) => {
  return {
    type: FILTER_DRIVERS_BY_ORIGIN,
    payload: filterType, // Pasa el tipo de filtro en el payload
  };
};

