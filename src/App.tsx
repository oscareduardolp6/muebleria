import { Header } from "./Components/Header"
import { SideBar } from "./Components/Sidebar/SideBar"
import { Routes, Route } from 'react-router-dom'
import { Sales } from "./Routes/Sales"

import { CreateProduct } from "./Routes/CreateProduct"
import ClientsManager from "./Routes/ClientsManager/"
import Transactions from "./Routes/Transactions/"

import './Sass/mySassStyles.sass'
import { SitesMovements } from "./Routes/SitesMovements/SitesMovements"
import Purchases from "./Routes/Purchases"
import ProductManager from "./Routes/ProductManager"
import SalesManager from "./Routes/SalesManager"

function App() {
  return (
    <>
      <SideBar/>
      <Header/>
      <Routes>
        <Route path='/productManager' element={<CreateProduct />} />
        <Route path='/sales' element={<Sales />} />
        <Route path='/clientsManager' element={<ClientsManager />} />
        <Route path='/transactions' element={<Transactions/>} />
        <Route path='/siteMovs' element={<SitesMovements />}/>
        <Route path='/purchases' element={<Purchases />} />
        <Route path='/products' element={<ProductManager />} />
        <Route path='/salesManager' element={ <SalesManager /> } />
        <Route path='/' element={<Transactions />} />
      </Routes>
  </>
  )
}

export default App
