import React from 'react';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {Container, Form, Button} from 'react-bootstrap';

const FormSchema = Yup.object().shape({
    email: Yup
        .string()
        .email("Invalid Email")
        .required("Required!"),
    pass: Yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit and one special character."),
})

const Login = () =>{
    const handleFormSubmit = (values) => {
        alert(JSON.stringify(values, null, 2));
    }

    return (
        <Container className='d-flex justify-content-center'>
            <Formik
                initialValues={{
                    email:"",
                    pass:""
                }}
                validationSchema={FormSchema}
                onSubmit={handleFormSubmit}>
                {({errors, values, handleChange, handleSubmit})=>(
                    <Form className='col-5' onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' name='email' value={values.email} onChange={handleChange}/>
                            {/* <Field type='email' name='email' /> */}
                            {errors.email && <Form.Text className='text-danger'>{errors.email}</Form.Text>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='pass' value={values.pass} onChange={handleChange}/>
                            {errors.pass && <Form.Text className='text-danger' muted>{errors.pass}</Form.Text>}
                        </Form.Group>
                        <Button type='submit'>Submit</Button>
                    </Form>
                )}
                
            </Formik>
        </Container>
    )
}

export default Login;