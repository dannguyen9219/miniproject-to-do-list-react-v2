import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function App() {
    const [tasks, setTasks] = useState({});
    const [buttonPressed, setButtonPressed] = useState(false);
    const entry = useRef();
    const status = useRef();
    
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tasks/table/`)
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

    const handleSubmit = async (evt) => {
        try {
            console.log("Hello")
            const response = await axios.post(`http://localhost:3000/tasks`, {
                entry: entry.current.value, status: "TO-DO"
            })
        }   catch (err) {
            console.log(err)
        }
    };

    // const handleSubmit = (item) => {
    //     setTasks([{ entry: item}, ...tasks])
    // };

    // const handleDelete = async (id) => {
    //     try {
    //         const response = await axios.delete(`https://localhost:3000/tasks/${id}`, {})
    //         if (response.status === 200) {
    //             setButtonPressed(!buttonPressed)
    //         }   else {
    //             console.log("Something went wrong with handleDelete")
    //         }
    //     }   catch (err) {
    //         console.log(err)
    //     }
    // };
    const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`https://localhost:3000/tasks/${id}`, {
          })
          if (response.status === 200) {
            setButtonPressed(!buttonPressed)
          } else {
            console.log('Something went wrong')
          }
        } catch (err) {
          console.log(err)
        }
      }

    
    return (
        <>
            <div className="App">
                <div className='container'>
                    <div>
                        <p className='new-item'>Add New To-Do</p>
                        <form onSubmit={handleSubmit}>
                            <input placeholder='Enter new to-do...' type="text" ref={entry}></input>
                        </form>
                    </div>
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
                                                <button onClick={() => {handleDelete(item._id)}} className="button">Delete</button>
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
                                                <button onClick={() => {handleDelete(item._id)}} className="button">Delete</button>
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
                                                <button onClick={() => {handleDelete(item._id)}} className="button">Delete</button>
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