import React,{useContext} from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
    Navigate
  } from "react-router-dom";
import { Container } from 'semantic-ui-react'

import Register from '../Pages/Register'
import Login from '../Pages/Login'
import Home from '../Pages/Home'
import MenuItems from './Menu'
import { AuthContext } from '../Context/Auth';

function ReactRoutes() {
    const {user} = useContext(AuthContext)
  return (
    <Container>
     <Router>
      <MenuItems />
       <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/login' element={user?<Navigate to="/" />: <Login />} />
       <Route path='/register' element={user?<Navigate to="/" />:<Register />} />
      </Routes>
     </Router>
    </Container>
  )
}

export default ReactRoutes