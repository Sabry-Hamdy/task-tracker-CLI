const fs = require('fs');
const commands = require('./commands');

if (!fs.existsSync(`${__dirname}/data`)) {
  fs.mkdirSync(`${__dirname}/data`);
}

if (!fs.existsSync(`${__dirname}/data/data.json`)) {
  fs.writeFileSync(
    `${__dirname}/data/data.json`,
    '[]',
    'utf-8',
  );
}

const command = process.argv[2];
if (command in commands) {
  commands[command](process.argv.slice(3));
} else {
  return console.log('Error: Unknown command!');
}
