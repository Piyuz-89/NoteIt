import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import {Container} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../Loader';


const FormSchema = Yup.object().shape({
    email: Yup
        .string()
        .email("Invalid Email")
        .required("Required!"),
    uname: Yup
        .string()
        .required("Required"),
    pass: Yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit and one special character.")
        .required("Required!"),
    cpass: Yup
        .string()
        .required("Required!")
        .oneOf([Yup.ref('pass'), null], 'Passwords must match'),
})

const Register = () =>{
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleFormSubmit = async (values) => {

        setIsLoading(true);
        
        axios.post("/api/user/register", values)
            .then(res=>{
                setIsLoading(false);
                navigate("/login");
                toast.success(res.data.msg);
            })
            .catch(err=>{
                setIsLoading(false);
                navigate("/register");
                toast.error(err.response.data.msg);
            }); 
    }

    return (
        isLoading ? 
        <Loader/> 
                :
        <Container className='d-flex justify-content-center'>
            <Formik
                initialValues={{
                    email:"",
                    uname:"",
                    pass:"",
                    cpass:""
                }}
                validationSchema={FormSchema}
                onSubmit={handleFormSubmit}>

                {({errors})=>(
                    
                    <Form className='col-5 mt-5 bg-light rounded p-5 fw-semibold' style={{boxShadow : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}>
                        <h1 className='text-center fw-bold text-success '>Register </h1>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email ID</label>
                            <Field type="email" id="email" name='email' className="form-control" />
                            {errors.email && <p className="form-text text-danger">{errors.email}</p> }
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="uname" className="form-label">Username</label>
                            <Field type='text' id='uname' name='uname' className="form-control" />
                            {errors.uname && <p className="form-text text-danger">{errors.uname}</p> }
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field type='password' id='password' name='pass' className="form-control" />
                            {errors.pass && <p className="form-text text-danger">{errors.pass}</p> }
                        </div>

                        <div className="form-label">
                            <label htmlFor="cpass" className="form-label">Confirm Password</label>
                            <Field type="password" id="cpass" name='cpass' className="form-control"  />
                            {errors.cpass && <p className="form-text text-danger">{errors.cpass}</p> }
                        </div>

                        <button type='submit' className='btn btn-success mt-2'>Register</button>
                        
                    </Form>
                )}
                
            </Formik>
        </Container>
    )
}

export default Register;