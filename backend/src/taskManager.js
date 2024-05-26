import Task from "./model.js";

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    createTask(title, description, dueDate) {
        const newTask = new Task(
            this.generateId(),
            title,
            description,
            'pending',
            new Date(dueDate)
        );
        this.tasks.push(newTask);
        return newTask;
    }

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }

    updateTask(id, updates) {
        const task = this.getTaskById(id);
        if (task) {
            Object.assign(task, updates);
        }
        return task;
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

export default new TaskManager();
