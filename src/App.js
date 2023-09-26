
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'

import {UserContextProvider} from './Component/Project/ContextProvider'
import  Main  from './Component/Main'
import { Detail } from './Component/Detail'

function App() {
  

  return (
    <UserContextProvider>
      <BrowserRouter>
      <Routes>
        <Route index element={<Main/>} />
        <Route path='detail' element={<Detail/>} />
      </Routes>
      
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App