import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Contactus from './components/Contact'
import { Route, Routes,NavLink } from 'react-router-dom';
function App() {
  return (
    <div>

<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="m-auto">
        <NavLink className='nav-link'  to="/">Home</NavLink>
        <NavLink className='nav-link' to="/signup" >signup</NavLink>
        <NavLink className='nav-link' to="/Login" >login</NavLink>
        <NavLink className='nav-link' to="/contactus" >contactus</NavLink>
        
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/contactus" element={<Contactus/>}/>
</Routes>
    </div>
  )
}

export default App