import { useState, Fragment } from 'react'
import viteLogo from '/vite.svg'

import { Login, Device } from "./components";

import { Routes, Route } from "react-router-dom";

function App() {
  // console.log(import.meta.env.VITE_BASE_PATH);

  return (
    <Fragment>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/device" element={<Device />} />
      </Routes>
    </Fragment>
  )
}

export default App
