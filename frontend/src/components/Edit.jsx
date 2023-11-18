import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from '../axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const noteSchema = Yup.object().shape({
    title: Yup
        .string()
        .required("Title is required"),
    note: Yup
        .string("string")
        // .required("Note Should Not Be Empty!!")
})

export default function Edit() {

    const navigate = useNavigate();
    const {id} = useParams();

    const [note, setNote] = useState({
        title: "",
        body: ""
    });

    useEffect(()=>{
        const getNote = async () => {
            const token = localStorage.getItem('NoteToken');

            await Axios.get(`/api/notes/${id}`, {
                headers: { Authorization: token }
            })
                .then((res) => {
                    setNote({
                        title: res.data.title,
                        body: res.data.body,
                    });
                })
                .catch((err) => {
                })
        }
        getNote();
    },[id]);

    const handleCancel = () =>{
        const cancel = confirm("Do you want to cancel?");
        if(cancel == true){
            navigate("/");
        }
    }

    const handleUpdate = async (values) => {

        const token = localStorage.getItem('NoteToken');

        await Axios.put(`/api/notes/${id}`, values,{
            headers: {Authorization: token }
        })
            .then((res)=>{
                toast.success(res.data.msg);
                navigate("/");
            })
            .catch((err)=>{
            })
    }
    
    return (
        <div className="container mt-3">
        <Formik
            initialValues={note || {
                title: "",
                body: " "
            }}
            validationSchema={noteSchema}
            onSubmit={handleUpdate}
            enableReinitialize
            >
            {({errors, isValid, isSubmitting})=>(
                <Form>
                    <div>
                        <label htmlFor="title" className='fw-bold fs-4' >Title</label>
                        <Field id='title' name="title" type="text" className='form-control border border-secondary' />
                        {errors.title && <p className='text-danger'>{errors.title}</p> }
                    </div>

                    <div className="col bg-light mt-4 mb-5" style={{height:'60vh'}}>
                        <Field name="body" >
                            {({ field }) => <ReactQuill theme='snow' value={field.value} onChange={field.onChange(field.name)} style={{height:'100%'}} />}
                        </Field>
                        {errors.note && <p className='text-danger m-2'>{errors.note}</p> }
                    </div>
                    <button type="submit" className='btn btn-primary' disabled={!isValid || isSubmitting}>Save</button>
                    <button type="button" className='btn btn-danger ms-3' onClick={handleCancel}>Cancel</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}