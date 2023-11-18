import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import error404 from './assets/error404.svg';

export default function Error() {
    return (
        <Navigate to="/" />
        // <Container className="mt-5">
        //     <Row className="justify-content-center">
        //         <Col md={8} className="text-center">
        //             {/* <h1 className="display-4">404 - Not Found</h1> */}
        //             <p className="lead">Sorry, the page you are looking for might be in another castle.</p>
        //             <img src={error404} alt="" />
        //         </Col>
        //     </Row>
        // </Container>
    )
}