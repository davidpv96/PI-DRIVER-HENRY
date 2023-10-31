const { Driver,Team } = require('../db');
const axios = require('axios');

const isUUIDv4 = (value) => {
  const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidv4Regex.test(value);
};

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

const findDriverById = async (id) => {


  if (isUUIDv4(id)) { // Verificar si parece un UUID v4
    // Realizar búsqueda en la base de datos
    const driver = await Driver.findByPk(id, {include:{
        model: Team,
        attributes:["name"],
        as: 'teams',
        through:{
            attributes:[]
        }
    }});
      // Transformar los datos de la base de datos
      const transformedDatabaseDrivers = transformDatabaseDriver(driver);
  
      return transformedDatabaseDrivers;
    
    } else {
    // Si no parece un UUID v4, asumimos que es un ID y realizamos una solicitud a la API con Axios
    try {
      // Realizar solicitud a la API utilizando el ID
      const apiResponse = await axios.get(`http://localhost:5000/drivers/${id}`);
      return apiResponse.data;
    } catch (error) {
      throw new Error("No se pudo encontrar el conductor en la base de datos ni en la API");
    }
  }
};

module.exports = findDriverById;

