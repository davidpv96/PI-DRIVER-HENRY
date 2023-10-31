export const validate = (newDrivers) => {
    const { forename, surname, nationality, image, dob, description, teams } = newDrivers
    const errors = {}
    console.log(forename)

    /*Validaciones de name */
    if (forename.trim() === '' || (typeof forename !== 'string')) {
        errors["forename"] = "Nombre no puede estár vacío";
    } else if ((forename.length > 30)) {
        errors["forename"] = "Nombre muy largo";
    } else if (!/^[A-Za-z]+$/.test(forename)) {
        errors["forename"] = "Nombre no válido (solo letras son permitidas)";
    } else {
        errors["forename"] = "";
    }

    if (surname.trim() === '' || (typeof surname !== 'string')) {
        errors["surname"] = "apellido no puede estár vacío";
    } else if ((surname.length > 50)) {
        errors["surname"] = "apellido muy largo";
    } else if (!/^[A-Za-z]+$/.test(surname)) {
        errors["surname"] = "Apellido no válido (solo letras son permitidas)";
    } else {
        errors["surname"] = "";
    }

    if (nationality.trim() === '' || (typeof nationality !== 'string')) {
        errors["nationality"] = "Nacionalidad no puede estár vacío";
    } else if ((nationality.length > 50)) {
        errors["nationality"] = "muy largo";
    } else if (!/^[A-Za-z]+$/.test(nationality)) {
        errors["nationality"] = "Nacionalidad no válido";
    } else {
        errors["nationality"] = "";
    }

    /*Validaciones de images */
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*\.(gif|png|jpg)$/i;
    if (image.trim() === '' || (typeof image !== 'string')) {
        errors["image"] = "Image no puede estár vacío";
    } else if (!urlPattern.test(image)) {
        errors["image"] = "Url no válida ";
    } else {
        errors["image"] = "";
    }

 

     /*Validaciones de description */
     if (description.trim() === '' || (typeof description !== 'string')) {
        errors["description"] = "Descripcion no puede estar vacio";
    } else if ((description.length > 200)) {
        errors["description"] = "Descripcion muy larga";
    } 
     else {
        errors["description"] = "";
    }

    if(teams.length === 0){
        errors["teams"] = "Seleccione al menos un team";
      }else{
        errors["teams"] = "";
      }

    return errors;


}