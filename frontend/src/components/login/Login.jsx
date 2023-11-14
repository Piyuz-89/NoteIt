import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import {Container} from 'react-bootstrap';
import { useAuth } from '../auth/Auth';
import axios from 'axios';
import {toast} from 'react-toastify';
import Loader from '../Loader';


const FormSchema = Yup.object().shape({
    email: Yup
        .string()
        .email("Invalid Email")
        .required("Required!"),
    pass: Yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit and one special character.")
            .required("Required!"),
})

const Login = () =>{

    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useAuth();
    const navigate = useNavigate();

    const handleFormSubmit = async (values) => {
        setIsLoading(true);

        await axios.post("api/user/login", values)
            .then(res=>{
                localStorage.setItem("NoteToken", res.data.token);
                setUser(res.data.uname);
                setIsLoading(false);
                navigate("/");
                toast.success("Login Successfull!")
            })
            .catch(err=>{
                setIsLoading(false);
                navigate("/login");
                toast.error(err.response.data.msg);
            })
    }

    return (
        isLoading ? 
        <Loader /> 
            :
        <Container className='d-flex justify-content-center'>

            <Formik
                initialValues={{
                    email:"",
                    pass:""
                }}

                validationSchema={FormSchema}
                onSubmit={handleFormSubmit}
            >
                {({errors})=>(
                    <Form className='col-5 mt-5 bg-light rounded p-5 fw-semibold' style={{boxShadow : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}>
                        <h1 className='text-center fw-bold text-success '>Login </h1>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email ID</label>
                            <Field type="email" id="email" name='email' className="form-control" />
                            {errors.email && <p className="form-text text-danger">{errors.email}</p> }
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field type='password' id='password' name='pass' className="form-control" />
                            {errors.pass && <p className="form-text text-danger">{errors.pass}</p> }
                        </div>
                        <div>
                            <p>Don't have an account? <Link to="/register" style={{textDecoration:'none'}}>Register</Link></p>
                        </div>

                        <button type='submit' className='btn btn-success mt-2'>Login</button>
                        
                    </Form>
                )}
                
            </Formik>
        </Container>
    )
}

export default Login;