import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

/**CONFIGURACIÓN DEL STORE CON EL MIDDLEWARE */
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(
    rootReducer,
    composeWithDevTools(composeEnhancer(applyMiddleware(thunk))),
    
);
export default store



/*CONFIGURACIÓN DEL STORE SIN EL MIDDLEWARE */
// import { createStore } from "redux";
// import rootReducer from "./reducer";
// const store = createStore(rootReducer);
// export default store;




/*NOTA:
La razón principal para configurar un middleware en el store de Redux es 
permitir la manipulación y el procesamiento de acciones antes de que lleguen 
al reducer o después de que el reducer haya realizado su trabajo
Los middlewares permiten manejar efectos 
secundarios, como llamadas a API, actualizaciones asíncronas y otras operaciones 
que no deberían realizarse directamente en el reducer, ya que podrían bloquear 
el flujo de la aplicación. */