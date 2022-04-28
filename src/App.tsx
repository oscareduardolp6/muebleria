import { Header } from "./Components/Header/Header"
import { SideBar } from "./Components/Sidebar/SideBar"
import { Routes, Route } from 'react-router-dom'
import { ProductCreator } from "./Routes/ProductCreator"

import './Sass/mySassStyles.sass'
import { CreateProduct } from "./Routes/CreateProduct"

function App() {
  return (
    <>
      <SideBar/>
      <Header/>
      <Routes>
        {/* <Route path='/' element={<ProductCreator />} /> */}
        <Route path='/' element={<CreateProduct />} />
      </Routes>
    </>
    

  )
}

export default App
