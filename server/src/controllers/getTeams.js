const axios = require('axios');
const {Team} = require('../db')
// Función para obtener todos los equipos de la base de datos
const getAllTeams = async () => {
    try {
      const teamsFromDB = await Team.findAll();
      return teamsFromDB;
    } catch (error) {
      console.error('Error al obtener equipos desde la base de datos:', error);
      throw error;
    }
  };
const getTeams = async () => {
    try {
        // Realiza una solicitud GET a la API para obtener los equipos
        const response = await axios.get('http://localhost:5000/drivers'); // Reemplaza 'URL_DE_LA_API_AQUI' con la URL de tu API
    
        const teamsFromAPI = response.data;
        console.log(teamsFromAPI)
    
        for (const teamData of teamsFromAPI) {
          // La propiedad 'teams' de la API contiene nombres de equipos separados por comas
          if (teamData.teams) {
            const teamNames = teamData.teams.split(',').map((teamName) => teamName.trim());
        
    
          // Itera a través de los nombres de los equipos
          for (const teamName of teamNames) {
            // Verifica si el equipo ya existe en la base de datos por su nombre
            const existingTeam = await Team.findOne({ where: { name: teamName } });
    
            if (!existingTeam) {
              // El equipo no existe en la base de datos, por lo que lo guardamos
              await Team.create({
                name: teamName,
                // Otros campos que desees guardar en la base de datos
              });
            }
          }
        }
        }
        console.log('Equipos obtenidos y guardados en la base de datos.');
      } catch (error) {
        console.error('Error al obtener y guardar equipos desde la API:', error);
        throw error;
      }
  };
  
  module.exports = {getTeams,getAllTeams}