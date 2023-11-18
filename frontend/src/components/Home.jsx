import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import Axios from '../axios';
import { toast } from 'react-toastify';
import Loader from './Loader';

export default function Home() {

    const navigate = useNavigate();
    const { user, isLoading, setIsLoading } = useAuth();

    const [notes, setNotes] = useState([])

    const getNotes = async (token) => {
        setIsLoading(true);

        await Axios.get("/api/notes/", {
            headers: { Authorization: token }
        })
            .then((res) => {
                setNotes(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                navigate("/error");
            })
    }

    useEffect(() => {
        const token = localStorage.getItem('NoteToken');
        getNotes(token);
    }, []);

    const handleDelete = async (id) => {
        setIsLoading(true);
        const token = localStorage.getItem('NoteToken');

        await Axios.delete(`/api/notes/${id}`, {
            headers: { Authorization: token }
        })
            .then((res) => {
                getNotes(token);
                setIsLoading(false);
                navigate("/")
                toast.success(res.data.msg);
            })
            .catch((err) => {
                setIsLoading(false);
                navigate("/error");
            })
    }

    return (
        isLoading ?
        <Loader/>
        :
        <div className='container'>
            <h1 className='mt-3 fw-medium'>Welcome, {user} !!!</h1>
            <div className="row m-4">
                {
                    notes.map(note => (
                        <div key={note._id} className="col-3 m-3 p-4 border rounded border-info bg-light position-relative" style={{ height: '100%' }}>
                            <h6 className='fw-medium'>{note.title}</h6>
                            <div className='d-flex justify-content-between'>
                                <Link className='btn btn-sm btn-secondary' to={`edit/${note._id}`}>Edit</Link>
                                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(note._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>  
        </div >
    )
}