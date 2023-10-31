const {Router} = require("express")
const teamsRouter= Router();
const getTeams= require('../controllers/getTeams')

teamsRouter.get("/", async (req, res) => {
    try {
      await getTeams.getTeams()
      const teams = await getTeams.getAllTeams(); // Llama al controlador para obtener los equipos desde la base de datos
      
  
      res.status(200).json(teams);
    } catch (error) {
      console.error('Error al obtener equipos:', error);
      res.status(500).json({ error: 'Error al obtener equipos' });
    }
  });


module.exports=teamsRouter