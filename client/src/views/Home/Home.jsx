import React, { useEffect } from 'react';
import style from './Home.module.css';
import Cards from "../../components/Cards/Cards";
import { getTeam } from '../../redux/actions-types'; // Importa la acción
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../../redux/actions-types'; // Importa la acción
import Pagination from '../../components/Pagination/Pagination'; // Importa el componente de paginación
import Filter from '../../components/Filter/Filter';
import Sort from '../../components/Sort/Sort';
function Home() {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers); // Obtener los drivers del estado
  const currentPage = useSelector((state) => state.currentPage);
  const itemsPerPage = useSelector((state) => state.itemsPerPage);
  

  // Calcula el índice de inicio y fin para mostrar los conductores en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const driversToShow = drivers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };

  
  useEffect(() => {
    // Llama a la acción getTeam cuando el componente se monta
    dispatch(getTeam());
  }, [dispatch]); // Asegúrate de incluir dispatch como dependencia
  console.log('hola')
  console.log(drivers)

  return (
    <div>
      <h1>List of Drivers</h1>
      <div>
        <Filter /> {/* Componente de filtrado */}
        <Sort /> {/* Componente de ordenamiento */}
        <Cards drivers={driversToShow} />    
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={drivers.length}
          onPageChange={handlePageChange}
        />     

      </div>
    </div>
  );
}

export default Home;