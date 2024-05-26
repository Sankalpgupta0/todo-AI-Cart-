// src/components/TaskForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'pending',
        dueDate: ''
    });

    useEffect(() => {
        if (id) {
            fetch(`/api/tasks/${id}`)
                .then(response => response.json())
                .then(data => setTask({
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    dueDate: data.dueDate.split('T')[0]
                }));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/tasks/${id}` : '/api/tasks';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }).then(() => navigate('/'));
    };

    return (
        <div className='flex text-white justify-center items-center bg-black/90 flex-col'>
            <h1 className='my-5 text-3xl'>{id ? 'Edit Task' : 'Create Task'}</h1>
            <form onSubmit={handleSubmit} className=''>
                <div className='my-2'>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        className='text-black'
                        required
                    />
                </div>
                <div className='my-2'>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        className='text-black'
                        required
                    ></textarea>
                </div>
                <div className='my-2'>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        className='text-black'
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className='my-2'>
                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                        className='text-black'
                        required
                    />
                </div>
                <button type="submit">Save Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
