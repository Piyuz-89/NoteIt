import React, { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

const noteSchema = Yup.object().shape({
    title: Yup
        .string()
        .required("Title is required"),
    note: Yup
        .string("string")
        .required("Note Should Not Be Empty!!")
})


const EditNote = () =>{

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        axios.get("/api/notes/id", {header:{Authorization: token}})
            .then(res=>{
                const {title, body} = res.data;
            })
            .catch(err=>{
                console.log(err);
            })
    },[])

    const handleSave = (values) => {
        alert("ehllo")
        console.log(values);
    }

    const handleCancel = () =>{
        const cancel = confirm("Discard Changes?");
        if(cancel == true){
            navigate("/");
        }
    }


    return (
        <div className="container mt-3">
        <Formik
            initialValues={{
                title: title,
                note: body
            }}
            validationSchema={noteSchema}
            onSubmit={handleSave}
            >
            {({errors})=>(
                <Form>
                    <div>
                        <label htmlFor="title" className='fw-bold fs-4' >Title</label>
                        <Field id='title' name="title" type="text" className='form-control border border-secondary' />
                        {errors.title && <p className='text-danger'>{errors.title}</p> }
                    </div>

                    <div className="col bg-light mt-4 mb-5" style={{height:'60vh'}}>
                        <Field name="note" >
                            {({ field }) => <ReactQuill theme='snow' value={field.value} onChange={field.onChange(field.name)} style={{height:'100%'}} />}
                        </Field>
                        {errors.note && <p className='text-danger m-2'>{errors.note}</p> }
                    </div>
                    

                    <button type="submit" className='btn btn-primary'>Save</button>
                    <button type="button" className='btn btn-danger' onClick={handleCancel}>Cancel</button>
               
                </Form>
            )}
            
            </Formik>
        
        </div>
    )
}

export default EditNote;