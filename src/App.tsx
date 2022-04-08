import { Header } from "./Components/Header/Header"
import { SideBar } from "./Components/Sidebar/SideBar"
import { Routes, Route } from 'react-router-dom'
import { ProductCreator } from "./Routes/Sales/ProductCreator"

import './Sass/mySassStyles.sass'

function App() {
  return (
    <>
      <SideBar/>
      <Header/>
      <Routes>
        <Route path='/' element={<ProductCreator/>} />
      </Routes>
    </>
    

  )
}

export default App
