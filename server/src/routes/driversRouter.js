
const {Router} = require("express")
const {getDriversFromAPI,getDriversFromDatabase}= require('../controllers/getDrivers')
const {searchInDatabase, searchInAPI}= require('../controllers/getDriverByQuery')
const createDriver= require('../controllers/createDrivers');
const findDriverById= require('../controllers/findDriverById');
const driversRouter= Router();



// Ruta para obtener la lista de conductores
driversRouter.get("/drivers", async (req, res) => {
    try {
        const driversFromAPI = await getDriversFromAPI();
        const driversFromDatabase = await getDriversFromDatabase();

        // Combinar los resultados de la API y la base de datos
        const combinedDrivers = [...driversFromAPI, ...driversFromDatabase];

        if (combinedDrivers.length === 0) {
            res.status(404).json({ message: "No se encontraron conductores" });
        } else {
            res.status(200).json(combinedDrivers);
        }
    } catch (error) {
        console.error("Error al obtener la lista combinada de conductores:", error);
        res.status(500).json({ message: "Error al obtener la lista de conductores" });
    }
});

driversRouter.get("/drivers/:idDriver", async (req, res) => {
    try {
      const { idDriver } = req.params;
      const driver= await findDriverById(idDriver);
      res.status(200).json(driver)
  
     
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });



  driversRouter.get('/driver/', async (req, res) => {
    try {
      const {name} = req.query;
      console.log('hola');
      console.log(req.query.name);

      if (!name) {
          return res.status(400).json({ error: 'Debes proporcionar un término de búsqueda' });
      }

      // Realiza la búsqueda insensible a mayúsculas/minúsculas en la base de datos
      const databaseResults = await searchInDatabase(name);
      console.log(databaseResults)

      // Realiza la búsqueda insensible a mayúsculas/minúsculas en la API
      const apiResults = await searchInAPI(name);

      // Combina los resultados de la base de datos y la API
      const allResults = [...databaseResults, ...apiResults];

      if (allResults.length === 0) {
          return res.status(404).json({ message: 'No se encontraron drivers con ese nombre' });
      }

      // Limita la respuesta a los primeros 15 resultados
      const first15Drivers = allResults.slice(0, 15);
      

      res.json(first15Drivers);
  } catch (error) {
      console.error('Error en la ruta /driver:', error);
      res.status(500).json({ message: 'Error en la ruta /driver' });
  }
  });

  // Ruta POST para guardar un nuevo conductor
driversRouter.post('/drivers', async (req, res) => {

  console.log(req.body.name)
    try {
      const { forename, surname, description, image, nationality, dob,teams} = req.body;
     
      const newDriver = await createDriver({
        forename,
        surname,
        description,
        image,
        nationality,
        dob,
        teams
      });
      
  
      res.status(200).json(newDriver);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  module.exports=driversRouter;

