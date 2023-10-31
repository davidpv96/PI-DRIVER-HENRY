const { Driver, Team } = require('../db');
const axios = require('axios');

// Función para buscar en la base de datos (simulada)

const transformDatabaseDriver = (databaseDriver) => {
  const teams = databaseDriver.teams.map((team) => team.name).join(', ');
  return {
    id: databaseDriver.id,
    driverRef: databaseDriver.driverRef,
    number: databaseDriver.number,
    code: databaseDriver.code,
    name: {
      forename: databaseDriver.forename,
      surname: databaseDriver.surname,
    },
    image: {
      url: databaseDriver.image, // Ajusta con el atributo correcto de tu base de datos
      imageby: databaseDriver.image_by, // Ajusta con el atributo correcto de tu base de datos
    },
    dob: databaseDriver.dob,
    nationality: databaseDriver.nationality,
    url: databaseDriver.url,
    teams: teams,// Mapeo de nombres de equipos
    description: databaseDriver.description,
  };
};

async function searchInDatabase(query) {
  
  const drivers = await Driver.findAll({
    where: {
      // Realiza una búsqueda insensible a mayúsculas/minúsculas usando JavaScript puro
      forename: query
    },
    include: {
      model: Team,
      attributes: ["name"],
      as: "teams",
      through: {
        attributes: []
      }
    }
  });
  const transformedDatabaseDrivers = drivers.map(transformDatabaseDriver);
  
      return transformedDatabaseDrivers;

  
  }
  
  // Función para buscar en la API externa
  async function searchInAPI(query) {
    try {
      // Realiza una solicitud GET a la API externa
      const response = await axios.get('http://localhost:5000/drivers'); // Reemplaza con la URL real de tu API
      
      // Filtra los conductores cuyo nombre (forename) coincide con la búsqueda
      const apiDrivers = response.data.filter(driver =>
        driver.name.forename.toLowerCase().includes(query.toLowerCase())
      );
  
      return apiDrivers;
    } catch (error) {
      console.error('Error al buscar en la API:', error);
      return [];
    }
  }

  module.exports={
    searchInAPI,
    searchInDatabase

  }