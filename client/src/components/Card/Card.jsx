import { Link } from "react-router-dom";

const Card= (props)=>{
 console.log(props.image)
 const defaultImageUrl = "https://i.pinimg.com/564x/61/e5/b7/61e5b7973f0ba94eb46dd07b68b3f185.jpg";
 
    return (
        <div>
            <Link to={`/detail/${props.id}`}>
               
            <section>
            <img
            src={props.image ? props.image : defaultImageUrl}
            alt={props.image ? "Imagen del conductor" : "Imagen por defecto"}
          />
                <h3>{props.name}</h3>
                <h3>{props.teams}</h3>
            </section>
            </Link>
            
        </div>
    )

}

export default Card