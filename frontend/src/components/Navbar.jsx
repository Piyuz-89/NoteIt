import React from "react";
import {useNavigate} from 'react-router-dom'
import { Container, Navbar, Nav } from "react-bootstrap";
import { useAuth } from "./auth/Auth";

function Navigation(){
    const navigate = useNavigate();
    const {user, logout} = useAuth();

    const handleClick = () =>{
        if(user){
            logout();
            navigate("/login");
        }else{
            navigate("/login");
        }
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href="/" className="fw-bold fs-4 text-warning">Note-It</Navbar.Brand>
            <Nav className="me-auto">
                {user && <Nav.Link href="/create">Create</Nav.Link>}
            </Nav>
            <Nav>
            <Nav.Link onClick={handleClick} className="fw-semibold text-light">{user ? "Logout" : "Login"}</Nav.Link>
          </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation;