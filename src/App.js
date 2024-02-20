import React from 'react'
import {Routes,Route,Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { BrowserRouter } from 'react-router-dom'

import AddReview from './components/add-review';
import MoviesList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';

function App() {
  const [user,setUser] = React.useState(null)

  async function login (user=null){
    setUser(user)
  }
  async function logout(){
    setUser(null)
  }

  return (
    <BrowserRouter className='App'>
      <Navbar bg="light" expand="sm">
        <Navbar.Brand>
          <Link to="/movies" style={{color:'inherit',textDecoration:'inherit'}}>
          Movie Reviews
          </Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls = "basic-navbar-nav"/>
        <Navbar.Collapse id = "basic-navbar-nav">
          <Nav className='mr-auto'>
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
               {user?(<a onClick={logout}>Logout User</a>):(<Link to={"/login"}>Login</Link>)}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/movies" element={<MoviesList/>}></Route>
        <Route path="/movies/:id/review" element={<AddReview user={user}/>}></Route>
        <Route path="/movies/:id/" element={<Movie user={user}/>}></Route>
        <Route path="/login" element={<Login login={login}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
