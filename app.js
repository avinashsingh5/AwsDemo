const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory data store for tasks
let tasks = [
    { id: 1, title: 'Learn Node.js', completed: true },
    { id: 2, title: 'Build a demo application', completed: false }
];

// --- ROUTES ---

// 1. GET: Welcome Route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Task Manager API Demo!",
        endpoints: {
            getAllTasks: "GET /api/tasks",
            getSingleTask: "GET /api/tasks/:id",
            createTask: "POST /api/tasks",
            updateTask: "PUT /api/tasks/:id",
            deleteTask: "DELETE /api/tasks/:id"
        }
    });
});

// 2. GET: Retrieve all tasks
app.get('/api/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// 3. GET: Retrieve a single task by ID
app.get('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: `Task with ID ${taskId} not found.` });
    }
    res.status(200).json(task);
});

// 4. POST: Create a new task
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Task title is required." });
    }

    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: title,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json({ message: "Task created successfully!", task: newTask });
});

// 5. PUT: Update an existing task
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: `Task with ID ${taskId} not found.` });
    }

    const { title, completed } = req.body;

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.status(200).json({ message: "Task updated successfully!", task });
});

// 6. DELETE: Remove a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: `Task with ID ${taskId} not found.` });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.status(200).json({ message: "Task deleted successfully!", task: deletedTask[0] });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is successfully running on http://localhost:${PORT}`);
});