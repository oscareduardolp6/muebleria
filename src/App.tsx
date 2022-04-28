import { Header } from "./Components/Header"
import { SideBar } from "./Components/Sidebar/SideBar"
import { Routes, Route } from 'react-router-dom'
import { CreateProduct } from "./Routes/CreateProduct"

import './Sass/mySassStyles.sass'

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
