import React from "react";
import {useNavigate} from 'react-router-dom'
import { Container, Navbar, Nav } from "react-bootstrap";
import { useAuth } from "./auth/Auth";

function Navigation(){
    const navigate = useNavigate();
    const {user} = useAuth;

    const handleClick = () =>{
        if(user){
            alert("Logout");
        }else{
            alert("Login");
            navigate("/login");
        }
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href="/">Note-It</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/edit">Create</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link onClick={handleClick}>{user ? "Logout" : "Login"}</Nav.Link>
          </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation;