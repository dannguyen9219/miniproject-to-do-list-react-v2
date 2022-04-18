import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'


export default function Show() {
    const { id } = useParams()
    const [show, setShow] = useState({})
    const navigate = useNavigate()
    
    useEffect(() => {
        ( async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tasks/${id}`)
                setShow(response.data)
            }   catch (err) {
                console.log(err)
            }
        })()
    }, []);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${id}`)
        }   catch (err) {
            console.log(err)
        }   finally {
            navigate(-1)
        }
    };

    return (
        <>
            <div className="showPage">
                <Link to="/"><button className='button'>Home</button></Link>
                <div className="taskContainer">
                    <h1>Entry: {show.entry}</h1>
                    <p>Status: {show.status}</p>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </>
    )
};