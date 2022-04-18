import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function App() {
    const [tasks, setTasks] = useState({});
    const [buttonPressed, setButtonPressed] = useState(false);
    
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tasks/table`)
                setTasks(response.data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [buttonPressed]);

    const handleClick = async (statusChange, id) => {
        try {
            const response = await axios.put(`http://localhost:3000/tasks/${id}`, {
                status: statusChange
            })
            if (response.status === 200) {
                setButtonPressed(!buttonPressed)
            } else {
                console.log(`Something went wrong in handleClick`)
            }
        } catch (err) {
          console.log(err)
        }
    };
    
    return (
        <>
            <div className="App">
                <div className='container'>
                    <div id="to-do" className='section'>
                        <h2>To-Do</h2>
                        <div className='list'>
                            {
                                tasks["TO-DO"] ?
                                tasks["TO-DO"].map((item, idx) => {
                                    return (
                                        <div className='task' key={idx}>
                                            <Link to={`/${item._id}`}>{item.entry}</Link>
                                            <div>
                                                <button onClick={() => {handleClick("PENDING", item._id)}} className="button">Pending</button>
                                                <button onClick={() => {handleClick("COMPLETED", item._id)}} className="button">Completed</button>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                ""
                            }
                        </div>
                    </div>
                    <div id="pending" className='section'>
                        <h2>Pending</h2>
                        <div className='list'>
                            {
                                tasks["PENDING"] ?
                                tasks["PENDING"].map((item, idx) => {
                                    return (
                                        <div className='task' key={idx}>
                                            <Link to={`/${item._id}`}>{item.entry}</Link>
                                            <div>
                                                <button onClick={() => {handleClick("TO-DO", item._id)}} className="button">To-Do</button>
                                                <button onClick={() => {handleClick("COMPLETED", item._id)}} className="button">Completed</button>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                ""
                            }
                        </div>
                    </div>
                    <div id="completed" className='section'>
                        <h2>Completed</h2>
                        <div className='list'>
                            {
                                tasks["COMPLETED"] ?
                                tasks["COMPLETED"].map((item, idx) => {
                                    return (
                                        <div className='task' key={idx}>
                                            <Link to={`/${item._id}`}>{item.entry}</Link>
                                            <div>
                                                <button onClick={() => {handleClick("TO-DO", item._id)}} className="button">To-Do</button>
                                                <button onClick={() => {handleClick("PENDING", item._id)}} className="button">Pending</button>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};