import {
  GET_DRIVER,
  GET_TEAM,
  GET_DRIVER_DETAIL,
  CLEAN_DETAIL,
  SEARCH_DRIVERS_BY_NAME,
  CHANGE_PAGE,
  FILTER_DRIVERS_BY_ORIGIN,
  FILTER_DRIVERS_BY_TEAM,
  SORT_DRIVERS_BY_NAME,
  SORT_DRIVERS_BY_DOB,
  ADD_DRIVER
} from "./actions";

const initialState = {
  drivers: [], // home state
  teams: [],
  driverDetail: [],
  originalDrivers: [],
  createdDriver:{},
  currentPage: 1, // Página actual
  itemsPerPage: 9, // Cantidad de conductores por página
  totalItems: 0, // Total de conductores disponibles
  selectedTeam: null,
  filterType: 'all'
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    /*AÑADE DRIVER */
    case GET_DRIVER:
      return {
        ...state,
        drivers: action.payload,
        originalDrivers: action.payload, // Almacenar los drivers en el estado
      };
    case GET_TEAM:
      return {
        ...state,
        teams: action.payload,
      }
    
    case ADD_DRIVER:
        return { ...state, createdDriver: action.payload };
  


    case FILTER_DRIVERS_BY_TEAM:
      const selectedTeam = action.payload;
  const originalDriver = state.originalDrivers;

  let filteredDriver = originalDriver;

  if (selectedTeam !== "all") {
    filteredDriver = originalDriver.filter(driver => {
      if (typeof driver.teams === 'string') {
        const driverTeams = driver.teams.split(',').map(team => team.trim());
        return driverTeams.includes(selectedTeam);
      }
      return false;
    });
  }

  if (state.filterType === 'uuid') {
    filteredDriver = filteredDriver.filter(driver => {
      return typeof driver.id === 'string' && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(driver.id);
    });
  } else if (state.filterType === 'id') {
    filteredDriver = filteredDriver.filter(driver => typeof driver.id === 'number');
  }

  return {
    ...state,
    drivers: filteredDriver,
    selectedTeam: selectedTeam,
    currentPage: 1,
  };





    /*DETALLA  UN PERSONAJE */
    case GET_DRIVER_DETAIL:
      return {
        ...state,
        driverDetail: action.payload,
      };

    /*LIMPIA EL DETALLE DE UN PERSONAJE */
    case CLEAN_DETAIL:
      return {
        ...state,
        driverDetail: {},
      };

    case SEARCH_DRIVERS_BY_NAME:
      return {
        ...state,
        drivers: action.payload, // Utiliza los datos de la acción
      };

    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };


    case SORT_DRIVERS_BY_NAME:
      const nameOrder = action.payload;
      const sortedDriversByName = [...state.drivers].sort((a, b) => {
        if (nameOrder === 'asc') {
          return a.name.forename.localeCompare(b.name.forename);
        } else {
          return b.name.forename.localeCompare(a.name.forename);
        }
      });
      return {
        ...state,
        drivers: sortedDriversByName,
      };

    case SORT_DRIVERS_BY_DOB:
      const dobOrder = action.payload;
      const sortedDriversByDob = [...state.drivers].sort((a, b) => {
        if (dobOrder === 'asc') {
          return a.dob.localeCompare(b.dob);
        } else {
          return b.dob.localeCompare(a.dob);
        }
      });
      return {
        ...state,
        drivers: sortedDriversByDob,
      };
    case FILTER_DRIVERS_BY_ORIGIN:
      const filterType = action.payload;
  const originalDrivers = state.originalDrivers;

  let filteredDrivers = originalDrivers;

  if (state.selectedTeam !== "all") {
    filteredDrivers = originalDrivers.filter(driver => {
      if (typeof driver.teams === 'string') {
        const driverTeams = driver.teams.split(',').map(team => team.trim());
        return driverTeams.includes(state.selectedTeam);
      }
      return false;
    });
  }

  if (filterType === 'uuid') {
    filteredDrivers = filteredDrivers.filter(driver => {
      return typeof driver.id === 'string' && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(driver.id);
    });
  } else if (filterType === 'id') {
    filteredDrivers = filteredDrivers.filter(driver => typeof driver.id === 'number');
  }

  return {
    ...state,
    drivers: filteredDrivers,
    filterType: filterType,
    currentPage: 1,
  };

    default:
      return { ...state };
  }

}

export default rootReducer;