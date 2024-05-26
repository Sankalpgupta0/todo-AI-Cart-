import express from 'express'
import taskManager from './taskManager.js'

const app = express();
const port = 3000;

app.use(express.json());

// GET /tasks: Retrieve all tasks
app.get('/api/tasks', (req, res) => {
    const tasks = taskManager.getAllTasks();
    res.json(tasks);
});

// GET /tasks/:id: Retrieve a single task by ID
app.get('/api/tasks/:id', (req, res) => {
    const task = taskManager.getTaskById(req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// POST /tasks: Create a new task
app.post('/api/tasks', (req, res) => {
    const { title, description, dueDate } = req.body;
    if (!title || !description || !dueDate) {
        res.status(400).send('Title, description, and due date are required');
        return;
    }
    const task = taskManager.createTask(title, description, dueDate);
    res.status(201).json(task);
});

// PUT /tasks/:id: Update an existing task by ID
app.put('/api/tasks/:id', (req, res) => {
    const updates = req.body;
    const updatedTask = taskManager.updateTask(req.params.id, updates);
    if (updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).send('Task not found');
    }
});

// DELETE /tasks/:id: Delete a task by ID
app.delete('/api/tasks/:id', (req, res) => {
    const success = taskManager.deleteTask(req.params.id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(port, () => {
    console.log(`Task Manager API running at http://localhost:${port}`);
});
