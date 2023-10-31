import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterDriverByOrigin } from '../../redux/actions-types';
import { filterDriversByTeam } from '../../redux/actions-types';

const Filter = () => {
  const [filterType, setFilterType] = useState(''); // Filtro por origen (UUID o ID)
  const [selectedTeam, setSelectedTeam] = useState('all'); // Equipo seleccionado
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  console.log(teams)


  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === 'filterType') {
      setFilterType(value);
    } else if (name === 'selectedTeam') {
      setSelectedTeam(value);
    }
  };

  useEffect(() => {
    // Aplicar ambos filtros cuando cambie el tipo de filtro o el equipo seleccionado
    dispatch(filterDriverByOrigin(filterType));
    dispatch(filterDriversByTeam(selectedTeam));
  }, [filterType, selectedTeam, dispatch]);
  return (
    <div>
      <label>
        Filtrar por Origen:
        <select name="filterType" value={filterType} onChange={handleFilterChange}>
          <option value="all">Mostrar todos los conductores</option>
          <option value="uuid">UUID</option>
          <option value="id">ID</option>
        </select>
      </label>

      <label>
        Filtrar por Equipo:
        <select name="selectedTeam" value={selectedTeam} onChange={handleFilterChange}>
          <option value="all">Todos los equipos</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filter;