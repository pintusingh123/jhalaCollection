import 'remixicon/fonts/remixicon.css'
import {
  BrowserRouter ,
  Routes,
  Route,
 } from 'react-router-dom'
 
import Product from './components/Admin/Product'

import NotFound from './components/NotFound'
import Order from './components/Admin/Order'
function App() {

  return (
    <BrowserRouter>
      <Routes>
         <Route path='/admin' >
           <Route  path='product' element={ <Product/>}/>
           <Route path='order' element={<Order/>} />

         </Route>
         <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
