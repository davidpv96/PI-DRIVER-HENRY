
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDriverDetail, cleanDetail } from "../../redux/actions-types";

const Detail = () => {
  const { id } = useParams();
  const driver = useSelector((state) => state.driverDetail);
  const dispatch = useDispatch();
 
  

  useEffect(() => {
    /*Cuando el componente se monta */
    dispatch(getDriverDetail(id));
    

    return () => {
      /*Cuando el componente se desmonta */
      dispatch(cleanDetail());
    };
  }, [id]);
  

  /*NOTA: Siempre limpiar el estado cuando un componente ya no esté siendo utilizado: por ejemplo en detail es necesario
  porque solo necesitamos el estado para la vista de detalle cuando se hace click sobre el personaje, pero
  cuando abandonas la vista de detalle ya no es necesario, por lo tanto hay que limpiar el detalle */
  
  const { name, image, nationality, description, dob, teams } = driver;

  const fullName = name ? `${name.forename} ${name.surname}` : 'Nombre no disponible';

  const defaultImageUrl = "https://i.pinimg.com/564x/61/e5/b7/61e5b7973f0ba94eb46dd07b68b3f185.jpg";

  console.log(driver)
  return (
    <div>
       <div>
        {image && image.url ? (
          <img src={image.url} alt="" />
        ) : (
          // Si no hay imagen, muestra la imagen por defecto
          <img src={defaultImageUrl} alt="Imagen por defecto" />
        )}
        <h3>NACIONALIDAD: {nationality}</h3>
        <h3>DESCRIPCION: {description}</h3>
        <h3>FECHA DE NACIMIENTO: {dob}</h3>
        <h3>NOMBRE COMPLETO: {fullName}</h3>
        <h3>EQUIPOS: {teams}</h3>
      </div>
    </div>
  );
};

export default Detail;
