import { useState,useEffect } from 'react'
import axios from "axios"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Form} from "./components/Form/Form";
import Nav from "./components/Nav/Nav.jsx"
import Landing from "./views/Landing/Landing.jsx"
import Home from "./views/Home/Home.jsx"
import Detail from "./views/Detail/Detail.jsx";
import Error from "./views/Error/Error.jsx"
import {Routes, Route, useLocation, useNavigate}  from "react-router-dom";
import {getDriver} from "./redux/actions-types"
import { useDispatch, useSelector } from "react-redux";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Llamar a la acción getDriver para cargar los datos al inicio
    dispatch(getDriver(/* proporciona el ID o los parámetros necesarios aquí */));
  }, [dispatch]);

  
  
  
  return (
    <>
      <div className='App'>
      {location.pathname !== "/" ? (
        <Nav  />
      ) : (
        ""
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <Home />
          }
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />


        <Route path="*" element={<Error />} />
      </Routes>
      </div>
    </>
  )
}

export default App
