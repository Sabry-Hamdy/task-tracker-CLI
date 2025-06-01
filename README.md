# CLI Task Tracker

A simple command-line tool for tracking tasks, built with Node.js.

## Features

- Add, update, delete tasks
- Mark tasks as done or in progress
- List all, done, or in-progress tasks
- Tasks are persisted in a local JSON file

## Usage

First, install dependencies (if any):

```sh
npm install
```

Run the CLI:

```sh
node task-cli <command> [arguments]
```

### Commands

- `add <task name>`  
  Add a new task.

- `list`  
  List all tasks.

- `list done`  
  List only completed tasks.

- `list in-progress`  
  List only in-progress tasks.

- `update <id> <new name>`  
  Update the name of a task.

- `delete <id>`  
  Delete a task.

- `mark-done <id>`  
  Mark a task as done.

- `mark-in-progress <id>`  
  Mark a task as in progress.

## Data Storage

Tasks are stored in [`data/data.json`](data/data.json).

## Project Structure

- [`task-cli.js`](task-cli.js): Entry point for the CLI.
- [`commands/`](commands/index.js): Command implementations.
- [`constants.js`](constants.js): Path constants.
- [`data/data.json`](data/data.json): Task data storage.

## License

ISC
