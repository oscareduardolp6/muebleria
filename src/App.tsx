import { Header } from "./Components/Header"
import { SideBar } from "./Components/Sidebar/SideBar"
import { Routes, Route } from 'react-router-dom'
import { CreateProduct } from "./Routes/CreateProduct"

import './Sass/mySassStyles.sass'
import { ProductTable } from "./Components/ProductTable"

function App() {
  return (
    <>
      <SideBar/>
      <Header/>
      <Routes>
        {/* <Route path='/' element={<CreateProduct />} /> */}
        <Route path='/' element={<ProductTable /> } />
      </Routes>
    </>
  )
}

export default App
