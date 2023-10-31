
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDriver, getTeam } from '../../redux/actions-types';
import { isErrors } from "./isErrors.js";
// import { cleanFields } from './cleanFields';
import {validate} from './validate'
//import style from "./Form.module.css";

export const Form = () => {

    const dispatch = useDispatch();
    const teams = useSelector((state) => state.teams);

    const [newDriver, setNewDriver] = useState({
        forename: "",
        surname: "",
        nationality: "",
        image: "",
        dob: "",
        description: "",
        teams: [],

    });

    const [errors, setErrors] = useState({
        forename: "",
        surname: "",
        nationality: "",
        image: "",
        dob: "",
        description: "",
        teams: [],

    });

    const [checkbox, setCheckbox] = useState(true);

    

    useEffect(() => {
        dispatch(getTeam());
    }, []);

    useEffect(() => {
        setErrors(validate(newDriver))

        if (newDriver.teams.length > 0) {
            setCheckbox(false);

        }
        else {
            setCheckbox(true);
        }
    }, [newDriver]);

    console.log(teams)

    const cleanFields = () => {
        setNewDriver({
          forename: "",
          surname: "",
          nationality: "",
          dob: "",
          image: "",
          description: "",
          teams: [],
        });
        
      };

    const handleChange = (event) => {

        const { type, name, checked, value } = event.target;

        if (type === "checkbox") {
            if (checked) {
                setNewDriver({
                    ...newDriver,
                    teams: [...newDriver.teams, value], // Agrega el nombre del equipo
                });
            } else {
                setNewDriver({
                    ...newDriver,
                    teams: newDriver.teams.filter((team) => team !== value), // Elimina el nombre del equipo
                });
            }
        } else {
            setNewDriver({
                ...newDriver,
                [name]: value,
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Convierte la fecha de nacimiento a un objeto Date antes de enviarlo
        const dateOfBirth = new Date(newDriver.dob);
        if (!isNaN(dateOfBirth.getTime())) {
            // Solo si la conversión a Date es exitosa
            setNewDriver({
                ...newDriver,
                dob: dateOfBirth,
            });
            dispatch(addDriver(newDriver));
            cleanFields();

        } else {
            console.error("Fecha de nacimiento no válida");
        }



    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>forename</label>
                <input
                    type="text"
                    name="forename"
                    value={newDriver.forename}
                    onChange={handleChange}
                    placeholder="Ejm: David"
                />
                {errors.forename && <p>{errors.forename}</p>}


                <label>surname</label>
                <input
                    type="text"
                    name="surname"
                    value={newDriver.surname}
                    onChange={handleChange}
                />
                {errors.surname && <p>{errors.surname}</p>}

                <label>nationality</label>
                <input
                    type="text"
                    name="nationality"
                    value={newDriver.nationality}
                    onChange={handleChange}
                />
                {errors.nationality && <p>{errors.nationality}</p>}

                <label>image</label>
                <input
                    type="text"
                    name="image"
                    value={newDriver.image}
                    onChange={handleChange}
                    placeholder="Url: .jpg, .jpeg, .png o .gif"
                />
                {errors.image && <p>{errors.image}</p>}

                <label>Date</label>
                <input
                    type="date" // Cambiado a type "date"
                    name="dob"
                    value={newDriver.date}
                    onChange={handleChange}
                />
                {errors.dob && <p>{errors.dob}</p>}

                <label>description</label>
                <input
                    type="text"
                    name="description"
                    value={newDriver.description}
                    onChange={handleChange}
                />
                {errors.description && <p>{errors.description}</p>}



                <label>Teams:</label>
                <div>
                    {teams.map((team) => (
                        <label key={team.id}>
                            <input
                                type="checkbox"
                                name="teams"
                                value={team.id} // Usa el nombre del equipo como valor
                                checked={newDriver.teams.includes(team.id)} // Comprueba si el equipo está en la lista
                                onChange={handleChange}
                            />
                            {team.name}
                        </label>

                    ))}
                </div>
                {errors.teams && <p>{errors.teams}</p>}
                <a href="#" onClick={cleanFields}>
                    Limpiar campos
                </a>

                <button disabled={!isErrors(errors)} type="submit">Create</button>
            </form>
        </>
    );
};