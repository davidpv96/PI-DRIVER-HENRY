const {Driver, Team} = require('../db');
const axios = require("axios");
// Función para transformar los datos de la base de datos
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
      teams: teams, // Mapeo de nombres de equipos
      description: databaseDriver.description,
    };
  };
  
  // Función para obtener conductores de la base de datos
  const getDriversFromDatabase = async () => {
    
      const driversFromDatabase = await Driver.findAll({
        include: {
          model: Team,
          attributes: ['name'],
          as: 'teams',
          through: {
            attributes: [],
          },
        },
      });
  
      // Transformar los datos de la base de datos
      const transformedDatabaseDrivers = driversFromDatabase.map(transformDatabaseDriver);
  
      return transformedDatabaseDrivers;
    }
  

const getDriversFromAPI = async () => {
    const response = await axios.get('http://localhost:5000/drivers'); // Cambia la URL a la de tu API
    return response.data;
};

module.exports= {
    getDriversFromDatabase,
    getDriversFromAPI
}