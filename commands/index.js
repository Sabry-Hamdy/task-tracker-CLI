const fs = require('fs');
const PATHS = require('../constants');

// Utility functions
function readTasks() {
  return JSON.parse(
    fs.readFileSync(PATHS.DATAPATH, 'utf-8'),
  );
}

function writeTasks(tasks) {
  fs.writeFileSync(
    PATHS.DATAPATH,
    JSON.stringify(tasks, null, 2),
    'utf-8',
  );
}

function findTaskById(tasks, id) {
  return tasks.find((t) => t.id === Number(id));
}

function filterDeleted(tasks) {
  return tasks.filter((t) => !t.deleted);
}

function printTask(t) {
  console.log(
    `[${t.id}] ${t.name} | Done: ${t.done ? '✔' : ' '} | In Progress: ${t.inProgress ? '⏳' : ' '} | Created: ${new Date(Number(t.createdAt)).toLocaleString()}`,
  );
}

module.exports = {
  list: (args) => {
    const tasks = filterDeleted(readTasks());

    if (tasks.length === 0) {
      return console.log('No tasks found!');
    }

    let displayTasks = tasks;
    if (args[0] === 'done') {
      displayTasks = tasks.filter((t) => t.done);
    } else if (args[0] === 'in-progress') {
      displayTasks = tasks.filter((t) => t.inProgress);
    }

    if (displayTasks.length === 0) {
      return console.log(
        'No tasks found for the specified filter!',
      );
    }

    displayTasks.forEach(printTask);
  },

  add: (args) => {
    const input = args[0];
    if (!input) {
      return console.log(
        `Error: expected a task name after the command 'add'!`,
      );
    }

    const tasks = readTasks();
    if (tasks.some((t) => t.name === input && !t.deleted)) {
      return console.log('Error: Duplicated Task!');
    }

    const newTask = {
      id: tasks.length,
      name: input,
      done: false,
      inProgress: false,
      createdAt: Date.now().toString(),
    };

    tasks.push(newTask);
    writeTasks(tasks);
    console.log('Task added successfully.');
  },

  update: (args) => {
    const id = args[0];
    const updateVal = args[1];
    if (!updateVal) {
      return console.log(
        'Error: Please specify an update value!',
      );
    }

    const tasks = readTasks();
    const task = findTaskById(tasks, id);
    if (!task || task.deleted) {
      return console.log('Error: Invalid ID!');
    }

    const newTasks = tasks.map((t) =>
      t.id === Number(id)
        ? {
            ...t,
            name: updateVal,
            updatedAt: Date.now().toString(),
          }
        : t,
    );

    writeTasks(newTasks);
    console.log('Task updated successfully.');
  },

  delete: (args) => {
    const id = args[0];
    const tasks = readTasks();
    const task = findTaskById(tasks, id);
    if (!task || task.deleted) {
      return console.log('Error: Invalid ID!');
    }

    const newTasks = tasks.map((t) =>
      t.id === Number(id)
        ? {
            ...t,
            deleted: true,
            message: 'This task has been deleted.',
          }
        : t,
    );

    writeTasks(newTasks);
    console.log('Task deleted successfully.');
  },

  'mark-done': (args) => {
    const id = args[0];
    const tasks = readTasks();
    const task = findTaskById(tasks, id);
    if (!task || task.deleted) {
      return console.log('Error: Invalid ID!');
    }

    const newTasks = tasks.map((t) =>
      t.id === Number(id)
        ? { ...t, done: true, inProgress: false }
        : t,
    );

    writeTasks(newTasks);
    console.log('Task marked as done.');
  },

  'mark-in-progress': (args) => {
    const id = args[0];
    const tasks = readTasks();
    const task = findTaskById(tasks, id);
    if (!task || task.deleted) {
      return console.log('Error: Invalid ID!');
    }

    const newTasks = tasks.map((t) =>
      t.id === Number(id)
        ? { ...t, inProgress: true, done: false }
        : t,
    );

    writeTasks(newTasks);
    console.log('Task marked as in progress.');
  },
};
