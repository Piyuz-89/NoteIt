import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from './auth/Auth';
 
const Home = () => {
    const {user} = useAuth();

    return (
        <div className="container">
            <h1 className='mt-3 fw-medium '>Welcome, {user.charAt(0).toUpperCase() + user.slice(1)} !!!</h1>

            <div className="row m-4">
                <div className="col-3 m-3 p-4 border rounded border-info bg-light position-relative" style={{height:'100%'}}>
                    <h6 className='fw-medium'>Heading lorem10</h6>
                    <div className='d-flex justify-content-between'>
                            <Link className='btn btn-sm btn-secondary' to='/edit/122345'>Edit</Link>
                            <button className='btn btn-sm btn-danger'>Delete</button>
                    </div>  
                </div>
                 
            </div>
        </div>
    )
}

export default Home;