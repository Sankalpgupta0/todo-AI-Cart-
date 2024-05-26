// src/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    const deleteTask = (id) => {
        fetch(`/api/tasks/${id}`, { method: 'DELETE' })
            .then(() => setTasks(tasks.filter(task => task.id !== id)));
    };

    return (
        <div className='bg-black/90 flex justify-center px-10 flex-col text-white'>
            <h1 className='text-center text-3xl font-semibold'>Task List</h1>
            <button 
            onClick={() => navigate('/task/new')}
            className='px-5 py-2 rounded-xl '
            >Create New Task
            </button>
            <table className='my-5'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='my-2'>
                    {tasks.map(task => (
                        <>
                        <tr key={task.id}>
                            <td className='text-center'>{task.title}</td>
                            <td className='text-center max-w-[400px]'>{task.description}</td>
                            <td className='text-center'>{task.status}</td>
                            <td className='text-center'>{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td className='text-center'>
                                <button 
                                onClick={() => navigate(`/task/${task.id}`)}
                                className='mx-2'
                                >Edit
                                </button>
                                <button 
                                onClick={() => deleteTask(task.id)}
                                className='mx-2'
                                >Delete
                                </button>
                            </td>
                        </tr>
                        <hr className='my-2'/>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
