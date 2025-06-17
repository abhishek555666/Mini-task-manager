const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.json());

let tasks = [
  { id: 1, title: 'Sample Task', status: 'pending', createdAt: new Date().toISOString() },
];

app.get('/tasks', (req, res) => res.json(tasks));

const newTask = {
  id: Date.now(),
  title: req.body.title,
  status: 'pending',
  createdAt: new Date().toISOString()
};

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: Date.now(), title, status: 'pending', createdAt: new Date().toISOString() };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  task ? res.json(task) : res.status(404).json({ error: 'Task not found' });
});

app.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index !== -1) {
    const { title, status } = req.body;
    tasks[index] = { ...tasks[index], title, status };
    res.json(tasks[index]);
  } else res.status(404).json({ error: 'Task not found' });
});

app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index !== -1) {
    const deleted = tasks.splice(index, 1);
    res.json(deleted[0]);
  } else res.status(404).json({ error: 'Task not found' });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

