import React from 'react'
import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap';
import {clearLoginStatus} from "../slices/userSlices";
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import Contactus from './Contact'
import { useDispatch } from 'react-redux';
import { Route, Routes,NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDashboard from './UserDashboard';
function Header() {
    let {userObj,isError, isSuccess} = useSelector(
        state => state.user
    );
    //get dispatc function
    let Dispatch = useDispatch()

    //get navigate  function
    let navigate = useNavigate()


    //log out
    const userLoginout = () => {
        localStorage.clear()
        Dispatch(clearLoginStatus())
        navigate('/login')
    }

  return (
      <div>
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
            {isSuccess  !== true ?(
                <>
          <NavLink className='nav-link'  to="/">Home</NavLink>
          <NavLink className='nav-link' to="/signup" >signup</NavLink>
          <NavLink className='nav-link' to="/Login" >login</NavLink>
          <NavLink className='nav-link' to="/contactus" >contactus</NavLink>
          </>
          ):(

            <>
            <NavDropdown title={userObj.username} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">change password</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" onClick={userLoginout}>Logout</NavDropdown.Item>

        </NavDropdown>

            </>
          
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/contactus" element={<Contactus/>}/>
  <Route path='/userdashboard' element={<UserDashboard/>}/>
  </Routes>
  </div>
  )
}

export default Header