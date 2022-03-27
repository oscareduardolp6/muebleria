import { Header } from "./Components/Header/Header"
import { SideBar } from "./Components/Sidebar/SideBar"
import { Routes, Route } from 'react-router-dom'
import { Sales } from "./Routes/Sales"

import './Sass/mySassStyles.sass'

function App() {
  return (
    <>
      <SideBar/>
      <Header/>
      <Routes>
        <Route path='/' element={<Sales/>} />
      </Routes>
    </>
    

  )
}

export default App
